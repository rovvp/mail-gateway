# mail-gateway

A sample Mail API. The api allows a client to send a plain text message email message to one or more recipents.

## Hosted Demo

A demo of this gateway is hosted on Heroku. The app is not hosted in a production ready environment so be aware that the inital
requests may be slow to initialise. Subsiquent requests will become faster (while the APP remains "Warm" in its hosted environment)

Please use the following endpoint for demo purposes. Send requests to this endpoint detailed in the usage statemnents below.

https://mail-gateway.herokuapp.com/


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
NodeJS v12.14.1 or higher
A SengGrid account and API Key
A MailGun account and API Key
```

### Installing

Clone the repo

```
git clone https://github.com/rovvp/mail-gateway.git
```

Install all package dependancies with the command below

```
npm install
```

### Configuring

Edit config/default.json. Ensure the endPoint attribute matches that of the provider, for both SendGrid and MailGun.

Mailgun requires the domain entry placed in the endPoint to function successfully.

Please generate an API key and place in the 'key' field of the config as per below.

```
    "providers": {
       "sendgrid" : {
            "endPoint": "https://api.sendgrid.com/v3/mail/send",
            "key": "[ACCOUNT API KEY]"
        },
        "mailgun" : {
            "endPoint": "https://api.mailgun.net/v3/[DOMAIN]/messages",
            "key": "[ACCOUNT API KEY]"
      }
```

## Running the Application
To start the server run the following from the root of the project directory.

```
npm start
```


## Running the tests (limited)
Limited tests are available 

```
npm test
```

### Test Breakdown

Tests were limited in this example given the time constraints I have limited tests to the input validator only

See the Todo section below in regards to testing.

Simple unit test of validator module /tests/validator.spec.js

  Isolating Mailgun
    ✔ valid config with to credentials
    ✔ valid config with to,cc credentials
    ✔ valid config with to,cc,bcc credentials

  Isolating Sendgrid
    ✔ valid config with to credentials
    ✔ valid config with to,cc credentials
    ✔ valid config with to,cc,bcc credentials

  Isolating Validator
    ✔ addressField validator returns true when address is correct
    ✔ addressField validator throws error when null
    ✔ addressField validator throws error when addressTo blank
    ✔ addressField validator throws error when multiple emails are passed in but not valid
    ✔ addressField validator throws error when emails are passed in but not valid
    ✔ addressField validator throws error when multiple emails are passed in but not valid
    ✔ contentField validator returns true when valid input given
    ✔ contentField validator throws error when input less than 3 chars
    ✔ contentField validator throws error when input empty


  19 passing (3s)


Simple E2E test with POST to endpoint. Example outpshows the first service failing due to my test account limits but failover service (Mailgun) succeding

```
  Testing API Endpoint (POST /)
{"level":"info","message":"Validating user input"}
{"level":"info","message":"Setting up mail config ... "}
{"level":"info","message":"Attempting mail send using Sendgrid service."}
{"level":"info","message":"Mail error {\"Status\":401,\"Success\":false,\"Error\":{\"status\":401,\"text\":\"{\\\"errors\\\":[{\\\"message\\\":\\\"Maximum credits exceeded\\\",\\\"field\\\":null,\\\"help\\\":null}]}\",\"method\":\"POST\",\"path\":\"/v3/mail/send\"},\"Retries\":0}"}
{"level":"info,"message":"Attempting mail send using Mailgun service."}
{"level":"info","message":"Mail sent {\"Status\":200,\"Success\":true}"}
    ✔ Responds with 200 status and JSON (2519ms)
    ✔ Responds with 404 when trying to get
    ✔ Responds with 404 when trying to put
    ✔ Responds with 404 when trying to delete
```

## Using the API

Using the API requires no authentication. The application can be used as per the following commands.


### HTTP POST

Send a POST request. By default when running in development (on a local machine) the below URL will work. 


```
Local Developer Endpoint: http://localhost:3000/

```

```
Hosted (SAMPLE) Endpoint: https://mail-gateway.herokuapp.com/

```

```
Headers: application/json


Request Payload:

{
 "addressTo": address1@sample.com;address2@sample.com,
 "addressCc":  ... 
 "addressBcc": ...
 "content": "Plain text sample email body."
}

```
Constraints: 

* addressTo: is required and can contain one or multiple addresses. Seperate multiple addresses by semicolon. 
* addresCc / addressBcc: optional and can contain one or multiple addresses. Seperate multiple addresses by semicolon. 
* content: is required and must be more than 3 characters.

```
 Response: text/json

{
  "Status": 200,
  "Success": true
}

```


```
## To Do

* Implement security protocols to limit access to public endpoints
* Code compliance review


## Deployment

## Built With

* [ExpressJS](https://expressjs.com) - The web framework used

## Contributing

## Versioning

## Authors

Rowan Pronk

## License

## Acknowledgments
