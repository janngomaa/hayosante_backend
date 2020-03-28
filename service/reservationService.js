const path = require('path');
const Reservation = require('../database/models/reservationModel');
const Restaurant = require('../database/models/restaurantModel');
const {formatMongoDBData, checkObjecId} = require('../helper/dbHelper');
const constants = require('../constants');
const logger = require('../logging/expressWinston');

const layer = path.dirname(__filename).split(path.sep).pop();

module.exports.createReservation = async (reservationData, requestId) => {
    try{
        checkObjecId(reservationData.restaurant)
    } catch(error) {
        throw new Error(constants.reservationMessage.INVALID_RESTAURAN);
    }

    try{
        const newReservation = new Reservation(reservationData);
        let result = await newReservation.save();
        logger.info(constants.reservationMessage.RESERVATION_CREATED, {layer, requestId, userId: result._id})
        return formatMongoDBData(result);
    } catch(error) {
        logger.error(error, {layer, requestId});

        throw new Error(error);

    }
}

module.exports.updateReservation = async ({reservationId, updateInfo, requestId}) => {
    try{
        checkObjecId(id);
        let reservation = await Reservation.findOneAndUpdate(
            { _id: reservationId}, updateInfo, {new: true}
        );

        if(!reservation){
            throw new Error(constants.reservationMessage.RESERVATION_NOT_FOUND);
        }
        logger.info(constants.reservationMessage.RESERVATION_UPDATED, {layer, requestId, reservationId})

        return formatMongoDBData(reservation);
    } catch(error) {
        logger.error(error, {layer, requestId, reservationId});
        throw new Error(error);

    }
}


module.exports.getReservationById = async ({ id }, requestId) => {
    try{
        checkObjecId(id);
        let reservation = await Reservation.findById(id).populate('restaurant');
        if(!reservation){
            throw new Error(constants.reservationMessage.RESERVATION_NOT_FOUND);
        }
        logger.info(constants.reservationMessage.RESERVATION_FOUND, {layer, requestId, reservationId: id})
        return formatMongoDBData(reservation);

    } catch(error) {
        logger.error(error, {layer, requestId, reservationId: id});
        throw new Error(error);

    }
}

module.exports.getAllReservations = async ({skip=0, limit=10}, requestId) => {
    try{
        let reservations = await Reservation.find({})
                .populate('restaurant')
                .skip(parseInt(skip))
                .limit(parseInt(limit));
        logger.info(constants.reservationMessage.RESERVATION_FOUND, 
                    {layer, requestId, nbReservations: reservations.length})
        return formatMongoDBData(reservations);

    } catch(error) {
        logger.error(error, {layer, requestId});
        throw new Error(error);

    }
}

module.exports.deletReservation = async ({ id }, requestId) => {
    try{
        checkObjecId(id);
        let reservation = await Reservation.findByIdAndDelete(id);
        if(!reservation){
            throw new Error(constants.reservationMessage.RESERVATION_NOT_FOUND);
        }
        logger.info(constants.reservationMessage.RESERVATION_DELETED, {layer, requestId, reservationId: id})
        return formatMongoDBData(reservation);

    } catch(error) {
        logger.error(error, {layer, requestId, reservationId: id});
        throw new Error(error);

    }
}