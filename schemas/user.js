let mongoose = require('mongoose');

let userschema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 15
    },
    password: {
        type: String, 
        required: true,
    },
    name: String //add regex matching
});

module.exports = mongoose.model('User', userschema);