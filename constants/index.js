module.exports = {
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },
    bookingMessage: {
    },
    userMessage: {
        SIGNUP_SUCCESS: 'Signup Success',
        DUPLICATE_USER: 'User already exist with given email/phone number.',
        LOGIN_SUCCESS: 'Login Success.',
        USER_NOT_FOUND: 'User Not Found.',
        INVALID_PASSWORD: 'Invalid password.'
    },
    reservationMessage: {
        RESERVATION_CREATED: 'Reservation Created Successfully',
        RESERVATIONS_FETCHED: 'Reservation(s) fetched Successfully',
        RESERVATION_FOUND: 'Reservation Found',
        RESERVATION_NOT_FOUND: 'Reservation Not Found',
        RESERVATION_UPDATED: 'Reservation updated Successfully',
        RESERVATION_DELETED: 'Reservation deleted Successfully',
        INVALID_RESTAURAN: 'Unknown restaurant ID.'
    },
    validationMessage: {
        BAD_REQUEST_MESSAGE: 'Bad request',
        TOKEN_MISSING: 'Invalid Header. Token Missing.'
    },
    serverStatus: {
        SERVER_SUCESS_STATUS: 200,
        SERVER_ERROR_STATUS: 400,
        SERVER_BAD_REQUEST_STATUS: 500,
        SERVER_UNAUTORIZED_ACCESS: 401
    },
    databaseMessage: {
        INVALID_ID: 'Invalid Id'
    },
    restaurantMessage:{
        RESTAURANT_CREATED : 'A new restaurant has been added successfully',
        RESTAURANT_FETCHED : 'Restaurant fetched successfully',
        RESTAURANT_NOT_FOUND :'Restaurant not found',
        UPDATE_RESTAURANT: 'Restaurant informations have been updated successfully',
        RESTAURAN_DELETED : 'Restaurant has been deleted succesfully'
    }
}