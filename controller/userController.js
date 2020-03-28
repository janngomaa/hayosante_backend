const userService = require('../service/userService');
const constants = require('../constants'); 
const logger = require('../logging/expressWinston');
/**********************************************/
/***     signup control         ***************/
/**********************************************/
module.exports.signup = async (req, res) => {    
    let response = {...constants.defaultServerResponse};
    try{
        const serviceResponse = await userService.signup(req.body, req.id);
        response.status = constants.serverStatus.SERVER_SUCESS_STATUS;
        response.message = constants.userMessage.SIGNUP_SUCCESS;
        response.body = serviceResponse;
    } catch(error){
        response.status = constants.serverStatus.SERVER_ERROR_STATUS;
        response.message = error.message;
        response.body = {};
        logger.error(error, {layer:'controller', requestId: req.id});
    }
    return res.status(response.status).send(response);

};

/**********************************************/
/***     login control          ***************/
/**********************************************/
module.exports.login = async (req, res) => {    
    let response = {...constants.defaultServerResponse};
    try{
        const serviceResponse = await userService.login(req.body, req.id);
        response.status = constants.serverStatus.SERVER_SUCESS_STATUS;
        response.message = constants.userMessage.LOGIN_SUCCESS;
        response.body = serviceResponse;

    } catch(error){
        response.status = constants.serverStatus.SERVER_ERROR_STATUS;
        response.message = error.message;
        response.body = {};
        logger.error(error, {layer:'controller', requestId: req.id});
    }
    return res.status(response.status).send(response);

};