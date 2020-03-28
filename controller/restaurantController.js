const restaurantService = require('../service/restaurantService');
const constants = require('../constants');
const logger = require('../logging/expressWinston');
const checkObjecId = require('../helper/dbHelper');
let response = {...constants.defaultServerResponse};
const {formatMongoDBData } = require('../helper/dbHelper');
/************************************* 
 * **** ADDING A RESTAURANT
*/
module.exports.createRestaurant = async(req, res) => { 
  try {
    responseFromService =  await restaurantService.createRestaurant(req.body);
    response.status = 200;
    response.message =constants.restaurantMessage.RESTAURANT_CREATED;
    response.body = responseFromService;

  } catch (error) {
    logger.error(error, {layer:'controller', requestId: req.id});
   response.message = error.message;
     
  }
  return res.status(response.status).send(response);
 }
/********************************************
 * Displaying All Restaurants
 */

 module.exports.getAllRestaurants = async(req, res) => { 
  try {
    responseFromService =  await restaurantService.getAllRestaurants(req.query);
    response.status = 200;
    response.message =constants.restaurantMessage.RESTAURANT_FETCHED;
    response.body = responseFromService;

  } catch (error) {
    logger.error(error, {layer:'controller', requestId: req.id});
   response.message = error.message;
     
  }
  return res.status(response.status).send(response);
 }
/*********************************************
 * Displaying a selected restaurant
 */
 module.exports.getRestaurantById = async(req, res) => { 
  try {
    //checkObjecId(id);
    requestFromService =  await restaurantService.getRestaurantById(req.params);
    response.status = 200;
    response.message =constants.restaurantMessage.RESTAURANT_FETCHED;
    response.body = requestFromService;

  } catch (error) {
   
  logger.error(error, {layer:'controller', requestId: req.id});
   response.message = error.message;
     
  }
  return res.status(response.status).send(response);
 }
 
 /************************************
  * Update a Restaurant info after changes 
  */

 module.exports.updateRestaurant = async(req, res) => { 
  try {
    responseFromService =  await restaurantService.updateRestaurant({
      id:req.params.id,
      updateinfo:req.body,
      resquestId: req.id
      });
    response.status = 200;
    response.message =constants.restaurantMessage.UPDATE_RESTAURANT;
    response.body = responseFromService;

  } catch (error) {
    logger.error(error, {layer:'controller', requestId: req.id});
   response.message = error.message;
     
  }
  return res.status(response.status).send(response);
 }
 /*************************************************
  * Delete a  restaurant
  */
 module.exports.deleteRestaurant = async(req, res) => { 
  try {
    responseFromService =  await restaurantService.deleteRestaurant(req.params, req.id);
    response.status = 200;
    response.message =constants.restaurantMessage.PRODUCT_DELETED;
    response.body = responseFromService;

  } catch (error) {
    logger.error(error, {layer:'controller', requestId: req.id});
   response.message = error.message;
     
  }
  return res.status(response.status).send(response);
 }


