const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const shemaValidationMiddleware = require('../middleware/schemaValidationMiddleware');
const userAPISchema = require('../apiSchema/userAPISchema');

router.post('/signup',
        shemaValidationMiddleware.validateBody(userAPISchema.signupSchema), 
        userController.signup
    );

router.post('/login',
        shemaValidationMiddleware.validateBody(userAPISchema.logiSchema),
        userController.login
        );

module.exports = router;