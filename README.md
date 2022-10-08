# Timestamp Microservice
-----------------------

[![Lint](https://github.com/THEANTsMAN/Timestamp-Microservice/actions/workflows/lint.yml/badge.svg)](https://github.com/THEANTsMAN/Timestamp-Microservice/actions/workflows/lint.yml)


-----------------------

Runs an micro service that takes in either a unix time, or natural time (of format Month day, year)
and returns a json object with both the unix time and natural time.

-----------------------

This is built to be used with glitch and an example of the microservice can be found [Here](https://foamy-straw.glitch.me/)

-----------------------

### Running the Microservice

The microservice consists of a single file called server.js.

To setup the microservice the repository can be cloned, and then run

```
npm install
```
This will install the required dependencies for the microservice.

The microservice can then be run using either of the following commands:

```javascript
PORT=XXXX npm start
```

OR

```javascript
PORT=XXXX ts-node src/server.ts
```

Where __XXXX__ is the port number you want it to run on.

### Usage

To use the microservice either a natural time, or a unix time stamp can be passed to it as a parameter, for example:

```url
https://time-stamp-microservice.com/December%2015,%202015
https://time-stamp-microservice.com/1450137600
```

And in return you should get a JSON object back as follows:

```json
{ "unix": 1450137600, "natural": "December 15, 2015" }
```

### Note

When passing a natural time i.e ```December 15, 2015``` the unix time you get back will be for midnight at that date.

On the flip side, any unix time within the 24 hours for that day will result in the natural time for that day.
