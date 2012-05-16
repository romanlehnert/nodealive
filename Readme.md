# NodeAlive - a keepAliveTimouter using Node.js

## Setup
To get the required packages, run 
    npm install

To create a site (see index.json):
    var palabea = sites.createSite({id: "palabea", callbackUrl: "http://palabea.com/timeout/secretapitoken/:userId"});

To start the server, run
    node index.js

## Usage
Just run the server and fire keepalives. E.g. with curl:
    curl 'http://localhost:3000/sites/palabea/users/theusers-uuid/ping'

As long as you repeat that within the keepalive timeout period, nothing happens. When there is no call for that specific user and that specific site, the corresponding callbackUrl is called from the node-app. Use this to track your online users from the tehir clientside by pinging every x seconds (x should be smaller than the timeout). The default timeout is 20 seconds. 

## Authors
* Roman Lehnert (roman.lehnert@googlemail.com)
