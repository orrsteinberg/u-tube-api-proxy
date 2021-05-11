# ⤴️  U-Tube API Proxy

A very simple Express app that forwards requests from the [U-Tube client](https://www.github.com/orrsteinberg/u-tube) to the official YouTube Data API while hiding the API key.

Limits requests to 100 per 5 minutes.
Includes an error handler that unwraps and returns an appropriate error response from the server.

