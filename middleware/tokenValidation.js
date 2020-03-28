const constants = require('../constants');
const jwt = require('jsonwebtoken');
const logger = require('../logging/expressWinston');


module.exports.validateToken = (req, res, next) => {
  let response = { ...constants.defaultServerResponse };
  try {
    if (!req.headers.authorization){
      throw new Error (constants.validationMessage.TOKEN_MISSING);
       }
      
      const token = req.headers.authorization.trim();
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY || 'default_secret_key');
      logger.info("Token validated ", {layer:'middleware/validation', requestId: req.id, token: decoded})
      return next();

  } catch (error) {
    logger.error(error.message, {'layer': "middleware/validation", requestId: req.id});
    response.message = error.message ;
    response.status = constants.serverStatus.SERVER_UNAUTORIZED_ACCESS;
  }
  return res.status(response.status).send(response);
}