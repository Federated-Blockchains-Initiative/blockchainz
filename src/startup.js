let publicIp = require('public-ip');
let Node = require('./models/node.model');

let startup = {
    checkIfRegister : function() {
        publicIp.v4().then(ip => {
            let node = {"ip": ip, "port" : parseInt(process.env.PORT)};
            Node.CheckAndAdd(node);
        });
    }
};

module.exports = startup;
