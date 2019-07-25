# API with JWT auth

## Description

This is a structured application that implements an Express server running on port 5000 with user registration, authentication and field validation.

## Routes

> **POST** to **/api/users** registers a user
>
> **POST** to **/api/auth** authenticates and log the user in
>
> **GET** to **/api/auth** gets logged in user information *needs token\*

## Usage

First, open dafault.json file located in the config folder. There, you need to change the ```mongoURI``` string to your instance URI.

Run ```yarn``` to install dependencies then ```yarn server``` to run the server.

### Register a user

Make a ```POST``` request to /api/users to register a user with a JSON object like this:

```json
{
  "email": "<your-email>",
  "name": "<your-name>",
  "password": "<your-password>"
}
```

This ```POST``` request is going to already return a JWT token to register a user and log him in at the same time.

You can add more fields if you need to.

### Log in an user

Make a ```POST``` request to /api/auth to log an user in with a JSON object like this:

```json
{
  "email": "<your-email>",
  "password": "<your-password>"
}
```

This ```POST``` request is going to return a JWT token.

### Get logged in user information

Make a ```GET``` request to /api/auth to get the logged in user information.

Here, you'll need to add an authentication header with the key ```x-auth-token``` and the token as a value.

This will return a JSON with the user information, but will not return his password, although it's hashed.
