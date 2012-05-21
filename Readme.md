# NodeAlive - a keepAliveTimouter using Node.js

NodeAlive is a tool that sends a predefined http-call to your website when a user does't keep his timer alive. 

## What it is
Users go offline without notifying you. Maybe they lost their connection or they closed their browsers tab. Sometimes its ery useful to get an event when this happens. So, every X seconds, the client sends a little http keepalive-request to nodealive that prevents nodealive from sending a timeout notification to your website. This call maybe done in javascript or we can also use it with curl: 

    curl 'http://nodealives_hostname/sites/SITENAME/users/UUID/ping'

As long as the user sends these keepalive requests to node with his given SITENAME and (the users) UUID within a specified timeout time, nothing happens. But when the users misses to send this request, nodealive will notify your application about that with the predefined call:

    http://your_applications_hostname/your_timeout_noitification_path/your_secret_api_token/UUID

Within your application, you can now handle this event. 

## Setup
To get the required packages, run 

    npm install

To create a site, provide a name and a callbackUrl. The callbackurl should contain ":userId" wich will be replaced by the the users UUID when he didn't send his keepalive request. 

    var palabea = sites.createSite({
          id:          "palabea", 
          callbackUrl: "http://your_applications_hostname/timeout/your_secret_api_token/:userId"
        });

To start the server, run

    node index.js

## Usage
Just run the server and fire keepalives. E.g. with curl:

    curl 'http://your_applications_hostname/your_timeout_noitification_path/your_secret_api_token/UUID'

As long as you repeat that within the keepalive timeout period, nothing happens. When there is no call for that specific user and that specific site, the corresponding callbackUrl is called from the node-app. The default timeout is 20 seconds. 

## Authors
* Roman Lehnert (roman.lehnert@googlemail.com)
