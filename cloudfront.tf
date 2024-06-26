module "cdn" {
  source  = "terraform-aws-modules/cloudfront/aws"
  comment = "Coldout beer"
  is_ipv6_enabled = true
  price_class = "PriceClass_200"
  wait_for_deployment = false
  create_origin_access_identity = true
  origin_access_identities = {    
    coldout_beer = "Coldout beer can access"
  }
  origin = {
    coldout_beer = {
      domain_name = module.s3_bucket.s3_bucket_bucket_regional_domain_name
      s3_origin_config = {
        origin_access_identity = "coldout_beer"
        # key in `origin_access_identities`
      }
    }
  }

  default_cache_behavior = {
    target_origin_id       = "coldout_beer" # key in `origin` above
    viewer_protocol_policy = "redirect-to-https"
    
    default_ttl = 5400
    min_ttl     = 3600
    max_ttl     = 7200
    
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    query_string    = false
    function_association = {
      viewer-request = {
        function_arn = aws_cloudfront_function.viewer_request.arn
      }
    }
  }

  default_root_object = "index.html"
  custom_error_response = {
    error403 = {
      error_code         = 403
      response_code      = 404
      response_page_path = "/404.html"
    }
    error404 = {
      error_code         = 404
      response_code      = 404
      response_page_path = "/404.html"
    }
  }
}