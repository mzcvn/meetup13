data "aws_iam_policy_document" "allow_access_from_cloudfront" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions = [
      "s3:GetObject",
      "s3:PutObject",
    ]
    resources = [
      "arn:aws:s3:::${var.bucket_name}/*",
      "arn:aws:s3:::${var.bucket_name}"
    ]
    condition {
        test        = "StringEquals"
        variable    = "AWS:SourceArn"
        values      = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
}
resource "aws_s3_bucket_ownership_controls" "bucket_ownership" {
  bucket = aws_s3_bucket.this.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_policy" "allow_access_from_cloud_front" {
  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
}

//Configure CORS rules
resource "aws_s3_bucket_cors_configuration" "cors_rules" {
  bucket = aws_s3_bucket.this.id
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}

##Configure CloudFront
locals {
    s3_origin_id = "prod-s3-origin"
}

resource "aws_cloudfront_origin_access_control" "this" {
  name                              = local.s3_origin_id
  description                       = "This is Origin Access Control for S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
    origin {
        domain_name = aws_s3_bucket.this.bucket_regional_domain_name
        origin_access_control_id = aws_cloudfront_origin_access_control.this.id
        origin_id = local.s3_origin_id
    }
    retain_on_delete = true
    enabled             = true
    default_root_object = "index.html"
    custom_error_response {
        error_caching_min_ttl = 10
        error_code            = 403
        response_code         = 403
        response_page_path    = "/index.html"
    }
    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = local.s3_origin_id

        forwarded_values {
        query_string = false
        cookies {
            forward = "none"
        }
        }

        viewer_protocol_policy = "allow-all"
        min_ttl                = 0
        default_ttl            = 3600
        max_ttl                = 86400
    }

    restrictions {
        geo_restriction {
        restriction_type = "none"
        }
    }

    tags = {
        Environment = "production"
    }

    viewer_certificate {
        cloudfront_default_certificate = true
    }
    lifecycle {
        create_before_destroy = true
    }
}

resource "aws_ssm_parameter" "s3_bucket_uri" {
  name  = "/dev/s3_bucket_uri"
  type  = "String"
  value = "s3://${aws_s3_bucket.this.id}"
}

resource "aws_ssm_parameter" "cloudfront_distrbution_id" {
  name  = "/dev/cloudfront_distrbution_id"
  type  = "String"
  value = aws_cloudfront_distribution.s3_distribution.id
}
   