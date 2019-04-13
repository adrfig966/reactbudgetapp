var jwt = require('jsonwebtoken');
const secret = require('../../privkey');


module.exports = function(req, res, next){
    if(!req.cookies.token){
        return res.status(403).send({errmsg: "Not token provided"});
    }
    jwt.verify(req.cookies.token, secret, function(err, decoded) {
        if(err){
            return res.status(403).send({errmsg: "Invalid token"});
        }
        req.cookies.decoded = decoded;
        return next();
    });
    
};