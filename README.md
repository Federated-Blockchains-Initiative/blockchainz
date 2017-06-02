# [Blockchain Example](http://158.37.63.52:8009/)

For ICA02 in the course IS-213, Open Source Software.

A task on Distributed Systems.

[Docker Image](https://hub.docker.com/r/mortea15/blockchainz/)

## About this project
On server start, the IP and port of the server is sent to the nodes already in the list of nodes.
Once every 6 seconds the names from other nodes are pulled, compared with the existing list, and adds any new names
It does a port scan on the port range 8000-8999 on all nodes in the list, in order to discover new potential nodes on the same IP address.

## How to get started

_You'll need Node.js if you haven't got it yet._


```sh
npm install
```

#### To Dockerize the server:

```sh
docker build -t mortea15/blockchainz .
docker run -d --name blockchainz -e PORT=8009 -p 8009:8009 blockchainz-img:latest
```
The PORT variable is an environmental variable inside the Node application, which controls what port the server will run on.

#### To start the server without Docker:
```sh
NODE_ENV=dev nodejs --use_strict src/server.js
```
If you'd like to specify a port to use:
```sh
NODE_ENV=dev PORT=8020 nodejs --use_strict src/server.js
```

## API
Endpoint | Description
------------ | -------------
/list | GET // A list of all names
/list | POST // Adds a new name to the list
/nodes | GET // A list of all nodes
/nodes | POST // Adds a new node to the list

### GET Names
Returns the name list in JSON
- *URL*
/list
- *Method*
`GET`
- *Headers*
  - *Content Type* application/json
- *URL Parameters*
None
- *Data Parameters*
None
- *Success Response*
  - *Code:* 200
  *Content:* {"users": [{"name":"Name"},{...}]}
  - *Code:* 304
  *Content:* {"users": [{"name":"Name"},{...}]}
- *Error Response*
  - *Code:* 500
  *Content:* {Message: "error message"}
- *Sample Call*
      $.ajax({
        url: "/list",
        dataType: "json",
        type: "GET",
        success: function(r) {
            console.log(r);
        }
      });

### POST (Register) Name
Registers a name, and adds it to the list of names
- *URL*
/list
- *Method*
`POST`
- *Headers*
  - *Content Type* application/json
- *URL Parameters*
None
- *Data Parameters*
`{"name":"CoolName"}
- *Success Response*
  - *Code:* 200
  *Content:* {"Message":"Name CoolName added"}
- *Error Response*
  - *Code:* 500
  *Content:* {Message: "error message"}
- *Sample Call*
      $.ajax({
        url: "/list",
        dataType: "json",
        type: "POST",
        success: function(r) {
            console.log(r);
        }
      });

### GET Nodes
Returns the node list in JSON
- *URL*
/nodes
- *Method*
`GET`
- *Headers*
  - *Content Type* application/json
- *URL Parameters*
None
- *Data Parameters*
None
- *Success Response*
  - *Code:* 200
  *Content:* {"nodes": [{"ip":"192.168.0.1","port":8009},{...}]}
  - *Code:* 304
  *Content:* {"nodes": [{"ip":"192.168.0.1","port":8009},{...}]}
- *Error Response*
  - *Code:* 500
  *Content:* {Message: "error message"}
- *Sample Call*
      $.ajax({
        url: "/nodes",
        dataType: "json",
        type: "GET",
        success: function(r) {
            console.log(r);
        }
      });

### POST (Register) Node
Registers a node, and adds it to the list of nodes
- *URL*
/nodes
- *Method*
`POST`
- *Headers*
  - *Content Type* application/json
- *URL Parameters*
None
- *Data Parameters*
`{"ip":"192.168.0.1",port":8009"}
- *Success Response*
  - *Code:* 200
  *Content:* {"Status":"New node added"} / {"Status":"Node already exists"}
- *Error Response*
  - *Code:* 403
  *Content:* {Message: "Reason for why it was forbidden"}
  - *Code:* 500
  *Content:* {Message: "error message"}
- *Sample Call*
      $.ajax({
        url: "/nodes",
        dataType: "json",
        type: "POST",
        Data: '{"ip":"192.168.0.1","port":8009}',
        success: function(r) {
            console.log(r);
        }
      });
