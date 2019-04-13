let mongoose = require('mongoose');
const uniquearr = require('mongoose-unique-array');

let categoryschema = new  mongoose.Schema({
    name: {type: String,
        lowercase: true,
        unique: true
    },
    spent: {type: Number,
        min: 0
    }
});

let dayschema = new mongoose.Schema({
    date: {type: Date, 
        required: true, 
        unique: true
    },
    username: {type: String, 
        required: true
    },
    categories: [categoryschema]
});
dayschema.plugin(uniquearr);
module.exports = mongoose.model('Day', dayschema);