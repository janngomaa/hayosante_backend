const Joi = require('@hapi/joi');
const cJoi = Joi.extend(require('joi-phone-number'));
const addressSchema = cJoi.object({
  streetNumber: cJoi.string(),
  addressLine1: cJoi.string(),
  addressLine2: cJoi.string(),
  zipCode: cJoi.string(),
  city: cJoi.string(),
  state: cJoi.string(),
  country: cJoi.string()
});
module.exports.restaurantSchema = cJoi.object({
  contact: cJoi.string(),
  name: cJoi.string(),
  phoneNumber: cJoi.string().phoneNumber({ 
      defaultCountry: 'CA',
      strict: true ,
      format: 'international' 
  }),
  address: addressSchema,
  password: cJoi.string().min(6).max(72).required()
});
/*Skip and limit :allows you to select the restaurants that you want to display*/
module.exports.getAllRestaurantsSchema = Joi.object().keys({

  skip : Joi.string(),
  limit: Joi.string()
  
  })

  /* updating a restaurant information */

module.exports.updateRestaurantSchema = cJoi.object().keys({
  contact: cJoi.string(),
  name: cJoi.string(),
  phoneNumber: cJoi.string().phoneNumber({ 
      defaultCountry: 'CA',
      strict: true ,
      format: 'international' 
  }),
  address: addressSchema,
 // password: cJoi.string().min(6).max(72).required()
});