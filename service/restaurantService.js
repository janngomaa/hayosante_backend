const Restaurant = require('../database/models/restaurantModel');
const {formatMongoDBData, checkObjecId} = require ('../helper/dbHelper');
const constants = require('../constants');
const logger = require('../logging/expressWinston');

const mongoose = require('mongoose');

/************************************* 
 * **** ADDING A RESTAURANT
*/
module.exports.createRestaurant = async (serviceData) => {
  try {
    let restaurant = new Restaurant({ ...serviceData});
    let result = await restaurant.save(); 
  
    return  formatMongoDBData(result);
    
  } catch (error) {
    logger.error(error, {layer:'service', requestId: req.id});
     throw new Error(error);
  }
  }

       
 /************************************
  * Update a Restaurant info after changes 
  */

  module.exports.updateRestaurant = async (
    { id, updateinfo, requestId}) => {
  
    try {
      checkObjecId(id);
      let lineage = await Restaurant.findOneAndUpdate(
        {_id:id},
        updateinfo,
        {new: true}
      ); 
     
      if(!lineage) {
        throw new Error(constants.restaurantMessage.RESTAURANT_NOT_FOUND);
       
      }
    
      return formatMongoDBData(lineage); /* toObject can only be applied to a single document*/
      
    } catch (error) {
      logger.error(error, {layer:'service', requestId});
       throw new Error(error);
      
    }
    }
/********************************************
 * Displaying All Restaurants
 */

    module.exports.getAllRestaurants = async ({skip=0,limit=10, resquesId}) => {
      try {
        let result = await Restaurant.find({}).skip(parseInt(skip)).limit(parseInt(limit)); 
      
        return formatMongoDBData(result); /* toObject can only be applied to a single document*/
        
      } catch (error) {
        logger.error(error, {layer:'service', requestId});
         throw new Error(error);
      }
      }

    /*to select a known restaurant, if exist !*/

    module.exports.getRestaurantById = async ({ id }, resquesId) => {
    
      try {
  
        checkObjecId(id);
        let lineage = await Restaurant.findById(id); 
       
        if(!lineage) {
          throw new Error(constants.restaurantMessage.RESTAURANT_NOT_FOUND);
         
        }
      
        return formatMongoDBData(lineage); /* toObject can only be applied to a single document*/
        
      } catch (error) {
        logger.error(error, {layer:'service', requestId});
         throw new Error(error);
        
      }
      }

  /*********************************************************
  * DELETE A RESTAURANT 
  */
 module.exports.deleteRestaurant = async ({ id}, resquesId) => {
    
  try {

    checkObjecId(id);
    let lineage = await Restaurant.findByIdAndDelete(id) 
   
    if(!lineage) {
      throw new Error(constants.restaurantMessage.RESTAURANT_NOT_FOUND);
     
    }
  
    return formatMongoDBData(lineage); /* toObject can only be applied to a single document*/
    
  } catch (error) {
    logger.error(error, {layer:'service', requestId});
     throw new Error(error);
    
  }
  }