terraform {
  required_version = " ~> 1.4.5"

## Thay doi noi dung trong backend state
  backend "s3" {
    bucket         = "your S3 bucket"
    key            = "S3 prefix to terraform.tfstate file"
    region         = "ap-southeast-1"
    dynamodb_table = "your DynamoDB table name"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.52.0"
    }
  }
}