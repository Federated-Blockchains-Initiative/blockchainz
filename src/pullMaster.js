let path = require('path');
let namesPath = path.join(__dirname, 'storage', 'users.json');
let nodesPath = path.join(__dirname, 'storage', 'nodes.json');
let fs = require('fs');
let User = require('./models/user.model');
let Node = require('./models/node.model');
let http = require('http');
let publicIp = require('public-ip');


let myIp;
let myPort = parseInt(process.env.PORT);
publicIp.v4().then(ip => {
    myIp = ip;
});

let minPort = 8000;
let maxPort = 8999;

let pullMaster = {
    start: function() {

        // waits 3 seconds and then starts pulling down node list every 6 seconds.
        setTimeout(function () {
            setInterval(function () {
                pullNodes();
            }, 6000);
        }, 3000);

        // pulls down name lists every 6 seconds.
        setInterval(function () {
            pullNames();
        }, 6000);

    //  this.pullNodes();
    }
};

module.exports = pullMaster;

function pullNames() {
    console.log("pull name lists");

    fs.readFile(nodesPath, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        let obj = JSON.parse(data);
        let ip;
        let port;
        for (let i = 0, len = obj.nodes.length; i < len; i++) {
            //console.log(obj.nodes[i]);
            ip = obj.nodes[i].ip;
            port = obj.nodes[i].port;
     // if we go back to ports
    //        for (let port = 0; port < ports.length; port++)
    //        {
            if (ip != myIp || port != myPort) {
                doGetUsersRequest(ip, port);
            }
        }
    });
}

function pullNodes() {
    console.log("pull node lists");

    fs.readFile(nodesPath, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        let obj = JSON.parse(data);
        let ip;
        for (let i = 0, len = obj.nodes.length; i < len; i++) {
            ip = obj.nodes[i].ip;
            portScan(ip);
        }
    });
}

function doGetUsersRequest(ip, port) {
    let optionsget = {
        host : ip,
        port : port,
        path : '/list',
        // path : '/api/users',
        method : 'GET'
    };
    let reqGET = http.get(optionsget, function(res) {
       // console.log("statusCode: ", res.statusCode);
       // console.log("headers: ", res.headers);

        if (res.statusCode === 200) {
      //      console.log(res.statusCode === 200);
            res.on('data', function (users) {
                //     console.info('GET result:\n');
                //process.stdout.write(users);
                //console.log("");
                users = users.toString();
                User.CheckAndAdd(users);
                //   console.info('\n\nCall completed');
            });
        }
    });
    reqGET.end();

    reqGET.on('error', function(e) {
        //  Will get a lot of errors due to servers/nodes going down.
        //  console.error(e);
    });

}

/**
 * Scans a range of ports of a spesific IP to look after similar systems. If found it will pull down the adress.
 */
function portScan(ip) {

    let port = minPort;
    while(port <= maxPort) {
        if(ip != myIp || port != myPort) {
            let optionsget = {
                host : ip,
                port : port,
                path : '/nodes',
                // path : '/api/nodes',
                method : 'GET'
            };

            let reqGET = http.get(optionsget, function(res) {
                //console.log("statusCode: ", res.statusCode);
                //console.log("headers: ", res.headers);
                if (res.statusCode === 200) {
                    res.on('data', function(nodes) {
                        //     console.info('GET result:\n');
                        //process.stdout.write(nodes);
                        //console.log('');
                        Node.CheckAndMerge(nodes);
                        //   console.info('\n\nCall completed');
                    });
                }
            });
            reqGET.end();

            reqGET.on('error', function(e) {
                //  Will get a lot of errors due to servers/nodes going down.
                //  console.error(e);
            });

        }
        port++;
    }
}
