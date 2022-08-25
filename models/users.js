var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const optionalSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    }
},{ timestamps: true});

const userSchema = new Schema({
    userName:{
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    info:optionalSchema
},{
    timestamps: true
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;

