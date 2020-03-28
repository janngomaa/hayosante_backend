//const Joi = require('@hapi/joi');
const constants = require('../constants');
const logger = require('../logging/expressWinston');

const validateObjectSchema = (data, schema)=>{
    const result = schema.validate(data, {convert: false});
    if(result.error){
        const errorDetails = result.error.details[0];
        return {
            message: errorDetails.message,
            path: errorDetails.path
        }
    }

    return null;
}

/*
 * *** Validate data within request body 
*/
module.exports.validateBody = (schema)=>{
    return (req, res, next)=>{
        let response = {...constants.defaultServerResponse};
        const error = validateObjectSchema(req.body, schema);
        if(error){
            response.body = error.message;
            response.message = constants.validationMessage.BAD_REQUEST_MESSAGE;
            response.status = constants.serverStatus.SERVER_BAD_REQUEST_STATUS;
            logger.error(error.message, {'layer': "middleware/validation", requestId: req.id});
            return res.status(response.status).send(response);
        }

        return next();
    }
}

/*
 * *** Validate request params
*/
module.exports.validateRequestParams = (schema)=>{
    return (req, res, next)=>{
        let response = {...constants.defaultServerResponse};
        const error = validateObjectSchema(req.query, schema);
        if(error){
            response.body = error.message;
            response.message = constants.validationMessage.BAD_REQUEST_MESSAGE;
            response.status = constants.serverStatus.SERVER_BAD_REQUEST_STATUS;
            logger.error(error.message, {'layer': "middleware/validation", requestId: req.id});
            return res.status(response.status).send(response);
        }

        return next();
    }
}