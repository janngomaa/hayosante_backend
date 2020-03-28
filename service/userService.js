const User = require('../database/models/userModel');
const {
    formatMongoDBData, 
    formatRequestData, 
    findUserByEmailOrPhone
} = require('../helper/dbHelper');
const constants = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../logging/expressWinston');

module.exports.signup = async (userData, requestId) => {
    try{
        const formattedData = formatRequestData(userData);
        const {email, phoneNumber} = formattedData;
        const user = await findUserByEmailOrPhone(User, email, phoneNumber);
        if(user){
            throw new Error(constants.userMessage.DUPLICATE_USER);
        }
        formattedData.password = await bcrypt.hash(formattedData.password, 12);
        const newUser = new User(formattedData);
        let result = await newUser.save();
        logger.info('User signedup successfully.', {layer:'service', requestId, userId: result._id})
        return formatMongoDBData(result);
    } catch(error) {
        logger.error(error, {layer:'service', requestId});
        throw new Error(error);

    }
}

module.exports.login = async ({emailOrPhone, password}, requestId) => {
    try{
        const user = await findUserByEmailOrPhone(User, emailOrPhone, emailOrPhone);
        if(!user){
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        const isValidPass = await bcrypt.compare(password, user.password); 
        if(!isValidPass){
            throw new  Error(constants.userMessage.INVALID_PASSWORD);
        } 
        const token = jwt.sign({id: user._id}, 
                                process.env.TOKEN_SECRET_KEY||'default_secret_key', 
                                {expiresIn:process.env.TOKEN_EXPIRE}
                        );
        logger.info('User logged successfully.', {layer:'service', requestId, token});
        return {token};

    } catch(error) {
        logger.error(error, {layer:'service', requestId});
        throw new Error(error);

    }
}