# Is it cold enough to store beer outside?

This repository demonstrates two [Aerobatic](http://www.aerobatic.com) hosting features:

##  Deployment Management - Staging Branch Hosting

The staging branch has the working app. It uses the [Weather Underground](https://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1) api to geolocate your IP and find the temperature there.
 
Visit https://staging.coldout.beer
See: [Deploy Settings](https://bitbucket.org/ivanoats/cold-enough-for-beer/addon/aerobatic-bitbucket-addon/aerobatic-app-dashboard)

Documentation is available on hosting multiple branches: [Deployment Management](https://www.aerobatic.com/docs/deployment-management)

## Express Request Proxy

The Aerobatic hosting platform can remove the need for complex CORS configuration by proxying requests to any API service on the web Configuration details are in [package.json](./package.json). Secret keys can be secured in environment variables by clicking on
[Environment Variables](https://bitbucket.org/ivanoats/cold-enough-for-beer/addon/aerobatic-bitbucket-addon/aerobatic-app-dashboard).

Documentation is available on the [Express Request Proxy](https://www.aerobatic.com/docs/http-proxy).
