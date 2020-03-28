const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurantController');
const schemaValidationMiddleware = require('../middleware/schemaValidationMiddleware');
const restaurantSchema = require('../apiSchema/restaurantSchema');
const tokenValidation = require('../middleware/tokenValidation');
router.post('/', /*tokenValidation.validateToken,*/ restaurantController.createRestaurant);
router.post('/', /*tokenValidation.validateToken,*/ restaurantController.getRestaurantById);


router.get('/', schemaValidationMiddleware.validateRequestParams(restaurantSchema.getAllRestaurantsSchema),  restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);

router.put('/:id',/*tokenValidation.validateToken,*/schemaValidationMiddleware.validateBody(restaurantSchema.updateRestaurantSchema),
restaurantController.updateRestaurant
);

router.delete('/:id',/*tokenValidation.validationToken,*/ restaurantController.deleteRestaurant);


module.exports = router;