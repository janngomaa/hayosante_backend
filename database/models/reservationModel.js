const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    partySize: Number,
    startTime: Date,
    endTime: Date,
    durationInMinutes: Number,
    bookingTime: Date,
    broker: String,
    priceCurrency: Number,
    reservationFor: String,
    reservationStatus: {
        type: String,
        enum: ['New', 'Approved', 'Cancelled']
    },
    underName: String,
    description: String,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    } 
}, {
    timestamps:true,
    toObject: {
        transform : function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;            
        }
    }
});

module.exports = mongoose.model('reservations', reservationSchema);