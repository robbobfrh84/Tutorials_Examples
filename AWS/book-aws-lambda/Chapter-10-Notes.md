# Chapter 10: Adding more features to the authentication service

After getting the `/sampleAuth` to work for login with my email and a few others, I realized the code worked for...

10.1: Reporting lost passwords & 10.3: Loggin
- The code was set for this, just read what it did in the book. Tested and works.

10.2: Resetting passwords
- Here when attempting to change password, we got a notification that we were logged in, but that then `Password NOT changed`.
  - Logged the front-end javascript and it said it `exited before completion`.
  - discovered an error in the lambda code in aws that it was missing the `cryptoUtils.` prefix. added it and it worked (lines ~76 & ~83)
