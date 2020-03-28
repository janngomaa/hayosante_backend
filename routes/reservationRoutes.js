const express = require('express');
const router = express.Router();

const reservationController = require('../controller/reservationController');
const shemaValidationMiddleware = require('../middleware/schemaValidationMiddleware');
const reservationAPISchema = require('../apiSchema/reservationAPISchema');
const tokenValidation = require('../middleware/tokenValidation');

router.post('/',
        //tokenValidation.validateToken,
        shemaValidationMiddleware.validateBody(reservationAPISchema.createReservationSchema), 
        reservationController.createReservation
    );

router.put('/:id', 
    //tokenValidation.validateToken,
    shemaValidationMiddleware.validateBody(reservationAPISchema.updateReservationSchema),
    reservationController.updateReservation
);

router.get('/:id', 
    //tokenValidation.validateToken,
    reservationController.getReservationById
);

router.get('/',
    //tokenValidation.validateToken,
    shemaValidationMiddleware.validateRequestParams(reservationAPISchema.getAllReservationsSchema),
    reservationController.getAllReservations
);

router.delete('/:id', 
    tokenValidation.validateToken,
    reservationController.deleteReservation
);



module.exports = router;