const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended: false}));
router.use(cookieparser());

const secret = require('../privkey');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltrounds = 3;

let userModel = require('../schemas/user');

router.post('/registeruser', (req,res) => {
    if(req.body.password==''){
        return res.send({errmsg: "No password."});
    }
    
    bcrypt.hash( req.body.password, saltrounds, (err, hash) => {
        if (err) {
            res.send(err);
        }
        var newuser = new userModel({
            username: req.body.username,
            password: hash,
            name: req.body.name
        });
        newuser.save().then(user =>{
            var token = jwt.sign({ username: user.username }, secret);
            res.status(200).cookie('token', token).send({msg: "User registered"});
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
    });

    
});

router.post('/login', (req, res) => {
    var pw = req.body.password;
    var usr = req.body.username;
    
    userModel.findOne({username: usr}, (err, docs) => { 
        if(!docs){
            return res.status(500).send({errmsg: "User not found."});
        }
        bcrypt.compare(pw, docs.password, (err, chk) => {
            if(err){
                console.log(err);
            }
            if(chk == true){
                var token = jwt.sign({username: usr}, secret);
                return res.status(200).cookie('token', token).send({msg: "User authenticated"});
            }
            return res.status(403).send({errmsg: 'Incorrect login info'});
        });
    });
    
});

module.exports = router;