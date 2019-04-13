const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const checktoken = require('./middleware/checktoken');

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended: false}));
router.use(cookieparser());

// ADD STATUS CODES

//ADD CATEGORY LIMITS/ IN USER PROFILE SCHEMA
//ADD USER PROF SCHEMA
let dayModel = require('../schemas/day');

router.post('/adddate', checktoken, (req, res) => {
    var newday = new dayModel({
        date: req.body.date,
        username: req.cookies.decoded.username,
        categories: [...req.body.categories]
    });
    newday.save().then(day => {
        return res.send(day);
    }).catch(err => {
        if(err){
            console.log(err);
            return res.send(err);
        }
    });
});

router.post('/removedate', checktoken, (req, res) => {
    dayModel.findOneAndDelete({username: req.cookies.decoded.username, date: req.body.date}, (err, doc) => {
        if(err){res.send(err)}
        res.send(doc);
    });
    
});

/*
* Request body: 
* date: date in the form of YYYY-MM-DD
* name: category to update
* spent: new amount spent
*/
router.post('/updatecategory', checktoken, (req, res) => {
    var query = dayModel.findOne({
        username: req.cookies.decoded.username,
        date: req.body.date
    });
    query.update({categories: {$elemMatch: {name: req.body.name}}}, {'categories.$.spent': req.body.spent}); //Spent is for testing purpsoes
    query.exec((err, doc) => {
        if(err){return res.send(err)}
        res.send(doc);
    });
});

/*
* Request body:
* date: date in the form of YYYY-MM-DD where category will be added
* name: name of category to add
* spent: amount spent
*/
router.post('/addcategory', checktoken, (req, res) => { //Checks for dupes :))
    var newCategory = {name: req.body.name, spent: req.body.spent};
    dayModel.findOne({
        username: req.cookies.decoded.username,
        date: req.body.date
    }, (finderr, doc) => {
        if(finderr){return res.send(finderr)}
        var valid = doc.categories.reduce((valid, category)=>{
           if(category.name==req.body.name){
               valid = false;
           } 
           return valid;
        }, true);
        
        if(!valid){
            return res.send({errmsg: "Duplicate category"});
        }
        doc.categories.set(doc.categories.length, newCategory);
        doc.markModified('categories');
        doc.save((saveerr, savedoc) =>{
            if(saveerr){res.send(saveerr)}
            res.send(savedoc);
        });

    });
});

/*
* Request body:
* date: date in the form of YYYY-MM-DD where category will be removed
* name: name of category to remove
*/

router.post('/removecategory', checktoken, (req, res) => { 
    dayModel.findOneAndUpdate({
        username: req.cookies.decoded.username,
        date: req.body.date
    },{
        $pull: {categories: {name: req.body.name}}
    },(updateerr, doc) => {
        if(updateerr){return res.send(updateerr)}
        res.send(doc);
    });
});

//view dates
router.get('/timeseries', checktoken, (req,res) =>{ //Find unique categories on client side :-( //You forgot to check the username dummy boy
    var start = req.query.start, end = req.query.end;
    var query = {$gte: new Date(start), $lte: new Date(end)};
    if(!(start&&end)){
        query = {$eq: new Date(start||end)};
    }
    dayModel.find({username: req.cookies.decoded.username, date: query}, (err, docs) =>{
        if(err){res.status(400).send(err)}
        return res.status(200).send(docs);
        
    });
});

module.exports = router;