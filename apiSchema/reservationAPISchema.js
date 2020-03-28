const Joi = require('@hapi/joi');
//const cJoi = Joi.extend(require('joi-phone-number'));// Custom Joi


module.exports.createReservationSchema = Joi.object({
    partySize: Joi.number().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string(),
    durationInMinutes: Joi.number(),
    reservationStatus: Joi.string(),
    underName: Joi.string().required(),
    bookingTime: Joi.string(),
    broker: Joi.string(),
    priceCurrency: Joi.number(),
    reservationFor: Joi.string(),
    description: Joi.string(),
    restaurant: Joi.string().required()
}); //.or('endTime', 'durationInMinutes');

module.exports.updateReservationSchema = Joi.object({
    partySize: Joi.number(),
    startTime: Joi.string(),
    endTime: Joi.string(),
    durationInMinutes: Joi.number(),
    reservationStatus: Joi.string(),
    underName: Joi.string(),
    bookingTime: Joi.string(),
    broker: Joi.string(),
    priceCurrency: Joi.number(),
    reservationFor: Joi.string(),
    description: Joi.string(),
    restaurant: Joi.string().required()
});

module.exports.getAllReservationsSchema = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
});

