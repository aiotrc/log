# I1820-Log

## Getting started

For starting the dependencies of the project should be installed with npm:

`npm install`

## Message Passing Protocol

~~~json
{
  "action":"Name of the desired action",
  "request_token":"A token for making it every request unique",
  "body":{}
}
~~~

**Action** is the name of the desired action to be done. Supported actions are:

|Action Name|Description|
|:---:|:---:|
|`log`|Store a log to the database|
|`get`|Get a log from the database|

**RequestToken** is for making each message unique. It is needed for sending the response of the request. It is send back in the response of requests to show that the sent response is the response of the request with this token.

**Body** is the object of the parameter that should be sent. For example the data that should be logged.