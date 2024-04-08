module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  bucket = "coldout-beer"
  acl    = "private"
  force_destroy = true
}