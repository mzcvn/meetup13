terraform {
  required_version = " ~> 1.4.5"
  backend "s3" {
    bucket         = "dev-codecatalyst-tf-state"
    key            = "tfstate/terraform.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "dev-codecatalyst-tf-locks"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.52.0"
    }
  }
}