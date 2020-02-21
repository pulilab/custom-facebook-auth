# Custom Facebook auth
Custom integration with facebook's oauth dialog for websites

This JS module opens facebook's custom dialog for [manual login flow](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/) 
for greater customization options than the official Js library.
 
With this module the browser can obtain the single use auth code and instead of the access token.
This code can be used on the backend server to be exchanged for an access token.

## How to use

Import the library

`import authFacebook from 'custom-facebook-auth'`

Call `authFacebook (urlOptionsParams, windowOptionsParams = {}, ver = 'v3.2', callback)`
* urlOptionsParams is required and must contain a `client_id`. The default `scope` is `email,public_profile`.
* windowOptionsParams is optional and overrides the popup window parameters.
* ver is optional.
* callback(error, response) is optional.

The function returns a Promise if the callback parameter is not set.

## How to test

* Get [ngrok](https://ngrok.com/) and python
* Run `python -m SimpleHTTPServer 9000` to get a static web server
* Run `ngrok http -bind-tls=true 9000` and go to the url provided by ngrok 
* This url must be added to your [facebook app](https://developers.facebook.com/apps)!
* Open the url and set your public client id inside the input box and click the button

### MIT License

Copyright (c) 2020 Pulilab Studio Kft.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.