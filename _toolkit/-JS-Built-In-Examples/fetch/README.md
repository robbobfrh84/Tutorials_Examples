# Fetch

The JavaScript Fetch API is now a living standard for out-of-the-box JavaScript.

Here are two main struggles I had when first experimenting with fetch.

... Getting the data available to front-end Javascript

... Handing cors exceptions

... handling content-types

The two example folders address simple solutions to these problems. It is required to serve your `index.html`, otherwise you may face an "CORS" error. If you do want to allow posts from other origins, you may do so by allowing cross-origin requests. See code in `fetch-examples-with-cors` for solutions.

# Resources / Attributions

MDN Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
MDN Fetch Uses: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Google Devs: https://developers.google.com/web/updates/2015/03/introduction-to-fetch

Specs: https://fetch.spec.whatwg.org/
