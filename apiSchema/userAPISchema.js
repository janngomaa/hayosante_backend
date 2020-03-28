const Joi = require('@hapi/joi');
const cJoi = Joi.extend(require('joi-phone-number'));// Custom Joi

const addressSchema = cJoi.object({
    streetNumber: cJoi.string(),
    addressLine1: cJoi.string(),
    addressLine2: cJoi.string(),
    zipCode: cJoi.string(),
    city: cJoi.string(),
    state: cJoi.string(),
    country: cJoi.string()
});

module.exports.signupSchema = cJoi.object({
    username: cJoi.string(),
    firstName: cJoi.string(),
    lastName: cJoi.string(),
    birthDate: cJoi.string(),//.date().options({ convert: true }),
    age: cJoi.number(),
    email: cJoi.string().email(),
    phoneNumber: cJoi.string().phoneNumber({ 
        defaultCountry: 'CA',
        strict: true ,
        format: 'international' 
    }),
    address: addressSchema,
    password: cJoi.string().min(6).max(72).required()
}).or('email', 'phoneNumber');

module.exports.logiSchema = cJoi.object({
    emailOrPhone: cJoi.string().required(),
    password: cJoi.string().required()
});