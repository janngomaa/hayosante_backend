const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    birthDate: String,
    age: Number,
    email: {
        type: String, 
        lowercase: true,
        required: function() {
            return this.phoneNumber == null ; 
        } 
    },
    phoneNumber: String, // :{type: String, required = fonction() { return this.phoneNumber == null ; } }
    address: {
        streetNumber: String,
        addressLine1: String,
        addressLine2: String,
        zipCode: String,
        city: String,
        state: String,
        country:String
    },
    password: String
}, {
    timestamps:true,
    toObject:{//To transform the returned result. But this doesn't change the DB
        transform : function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
            
        }
    }
});

module.exports = mongoose.model('User', userSchema);