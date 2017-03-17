let express = require('express');
let router = express.Router();
let User = require('../models/user.model');

router.post('/', function(req, res) {
    User.addUser(req.body, (err, result) => {
        if (err) {
            res.status(500).send({
                Message: err
            });
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;
