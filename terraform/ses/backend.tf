provider "aws" {
  region     = var.region
}

terraform {
  backend "s3" {
    bucket = "terraform-state-ramit21"
    key    = "state/ses"
    region = "us-east-1"
    encrypt = true
    dynamodb_table = "dynamodb-terraform-state-lock" 
  }
}

