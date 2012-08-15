var rest = require('restler');

function pingNodeAlive(app,session,user) {
  console.log("pinging app: " + app + ", session: " + session + ", user: " + user);
  rest.get("http://localhost:5000/sites/" + app + "/sessions/" + session + "/users/" + user + "/ping", { data: {'action_type': 'end', 'api_key': "develop" } }).on('complete', function(data) { console.log(data); });
};

var loop = setInterval(function() {pingNodeAlive("palabea-develop","1","1")},1000);
var loop = setInterval(function() {pingNodeAlive("palabea-develop","1","2")},1000);
