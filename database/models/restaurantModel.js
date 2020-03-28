const mongoose = require('mongoose');
const restaurantSchema = mongoose.Schema({
  // Need to be reviewed and discussed : how many fields are needed to register a restaurant 
  name :String,
  contact: String,
  phoneNumber: String,
  address: {
        streetNumber: String,
        addressLine1: String,
        addressLine2: String,
        zipCode: String,
        city: String,
        state: String,
        country:String
    }
   
  

},{
  timestamps:true,
  toObject: {
    transform: function(doc, ret, options){
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret ;
    }
  }
})

module.exports = mongoose.model('restaurant', restaurantSchema)