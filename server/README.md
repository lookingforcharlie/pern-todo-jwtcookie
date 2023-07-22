# PERN Stack backend

- Node.JS, Express.JS, TypeScript

## Overview for Authentication, Authorization, and JWT

- Authentication is the process of checking if you really are the person you claim to be.
  1. Are you really Charlie?, let me see your id.
- Authorization which come after authentication is the process of checking of depending on your status and credentials, what are you allowed to do.
  1. Hi Charlie, here is your JSON WEB TOKEN that stores all your information and our associated signature. With this JWT, you are able to do so on and so forth, the rest you can't do in our facility
- So JWT happens during the process of authorization after authentication is completed.

## JWT - Json Web Token

- JWT contains 3 parts: header, payload, and signature.
- JWT can be decrypted easily by atob() method in console, don't store your personal info inside JWT.
- The purpose of JWT is to make sure the person we interact with in the application is real, not to store secret info.
- JWT sent between server to client using HTTP headers. It can be stored in cookie or local storage, and it will be passed in every subsequent request.
- HTTP headers are key value pairs. The key for passing JWT is 'Authorization', value is 'Bearer JWT'.
- OAuth is a secure way to send JWT.
- When you are JWT, the server doesn't store any data whatsoever. All the related data and token are stored inside JWT.

## Difference between storing JWT in cookie and localStorage

- Cookies are sent automatically from browser to server on every request. Local storage doesn't do that automatically, I need to write JavaScript to make that happen.
- When I set cookies at httpOnly, client-side JavaScript cannot access the cookie. JavaScript has the full access to local storage.
- People tends to say JWT stored in cookie is more secure, because malicious software can easily gets your token by localStorage.getItem('yourTokenName').
- When I set the cookie as httpOnly, the trade-off is that it's no longer platform agnostic, you can only use it for Website development, can't be used for iOS or Android native App.

## Questions

- Why the corsOptions combined with fetch option make the cookie show up in Application Panel?
- Do I need to authorized user who wants to logout?
- When user tries to log in, do I need to confirm that browser got the cookie before let user in?
