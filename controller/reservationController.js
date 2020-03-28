const path = require('path');
const reservationService = require('../service/reservationService');
const constants = require('../constants'); 
const logger = require('../logging/expressWinston');

const restaurantService = require('../service/restaurantService');

const layer = path.dirname(__filename).split(path.sep).pop();

/*******************************************************/
/***     createReservation control      ***************/
/*****************************************************/
module.exports.createReservation = async (req, res) => {    
    let response = {...constants.defaultServerResponse};
    try{
        const serviceResponse = await reservationService.createReservation(req.body, req.id);
        response.status = constants.serverStatus.SERVER_SUCESS_STATUS;
        response.message = constants.reservationMessage.RESERVATION_CREATED;
        response.body = serviceResponse;
    } catch(error){
        response.status = constants.serverStatus.SERVER_ERROR_STATUS;
        response.message = error.message;
        response.body = {};
        logger.error(error, {layer, requestId: req.id});
    }
    return res.status(response.status).send(response);

};

/*******************************************************/
/***     updateReservation control      ***************/
/*****************************************************/
module.exports.updateReservation = async (req, res) => {    
    let response = {...constants.defaultServerResponse};
    try{
        const serviceResponse = await reservationService.updateReservation(
                {id: req.params.id, updateInfo: req.body, requestId: req.id}
         ); 

        response.status = constants.serverStatus.SERVER_SUCESS_STATUS;
        response.message = constants.reservationMessage.RESERVATION_UPDATED;
        response.body = serviceResponse;

    } catch(error){
        response.status = constants.serverStatus.SERVER_ERROR_STATUS;
        response.message = error.message;
        response.body = {};
        logger.error(error, {layer, requestId: req.id});
    }
    return res.status(response.status).send(response);

};

/************************************************/
/***     getReservationById control          ***/
/**********************************************/
module.exports.getReservationById = async (req, res) => {    
    let response = {...constants.defaultServerResponse};
    try{
        const serviceResponse = await reservationService.getReservationById(req.params, req.id);
        response.status = constants.serverStatus.SERVER_SUCESS_STATUS;
        response.message = constants.reservationMessage.RESERVATIONS_FETCHED;
        response.body = serviceResponse;

    } catch(error){
        response.status = constants.serverStatus.SERVER_ERROR_STATUS;
        response.message = error.message;
        response.body = {};
        logger.error(error, {layer, requestId: req.id});
    }
    return res.status(response.status).send(response);

};

/************************************************/
/***     getAllReservations control          ***/
/**********************************************/
module.exports.getAllReservations = async (req, res) => {    
    let response = {...constants.defaultServerResponse};
    try{
        const serviceResponse = await reservationService.getAllReservations(req.query, req.id);
        response.status = constants.serverStatus.SERVER_SUCESS_STATUS;
        response.message = constants.reservationMessage.RESERVATIONS_FETCHED;
        response.body = serviceResponse;

    } catch(error){
        response.status = constants.serverStatus.SERVER_ERROR_STATUS;
        response.message = error.message;
        response.body = {};
        logger.error(error, {layer, requestId: req.id});
    }
    return res.status(response.status).send(response);

};

/************************************************/
/***     deleteReservation control           ***/
/**********************************************/
module.exports.deleteReservation = async (req, res) => {    
    let response = {...constants.defaultServerResponse};
    try{
        const serviceResponse = await reservationService.deletReservation(req.params, req.id);
        response.status = constants.serverStatus.SERVER_SUCESS_STATUS;
        response.message = constants.reservationMessage.RESERVATION_DELETED;
        response.body = serviceResponse;

    } catch(error){
        response.status = constants.serverStatus.SERVER_ERROR_STATUS;
        response.message = error.message;
        response.body = {};
        logger.error(error, {layer, requestId: req.id});
    }
    return res.status(response.status).send(response);

};


