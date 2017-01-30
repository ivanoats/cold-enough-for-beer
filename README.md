# Is it cold enough to store beer outside?

This repository demonstrates the HTTP proxy [Aerobatic](http://www.aerobatic.com) hosting feature:

It uses the [Weather Underground](https://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1) api to geolocate your IP and find the temperature there.

Visit https://coldout.beer

## Express Request Proxy

The Aerobatic hosting platform can remove the need for complex CORS configuration by proxying requests to any API service on the web Configuration details are in [package.json](./package.json). Secret keys can be secured in environment variables set in the Aerobatic settings on Bitbucket.

Documentation is available on the [Express Request Proxy](https://www.aerobatic.com/docs/plugins/http-proxy/).
