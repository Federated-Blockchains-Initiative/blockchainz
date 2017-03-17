let express = require('express');
let router = express.Router();
let User = require('../models/user.model');

router.get('/', function(req, res) {
    User.getUsers( (err, result) => {// (err, users) =>{
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
