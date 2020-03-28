const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const cJoi = Joi.extend(require('joi-phone-number'));
const constants = require('../constants');

module.exports.formatMongoDBData = (data) =>{
    /*
    * *** Formats MongoDB object to rename/remove technical field
    * *** such as _id. Those changes are not saved to the DB, but 
    * *** made only to better user experience. 
    */
    if(Array.isArray(data)){/** If list format each elt */
        let newDataList = [];
        for(value of data){
            newDataList.push(value.toObject());
        }
        return newDataList;

    }
    return data.toObject();
}

module.exports.formatRequestData = (data) =>{
    /*
    * *** Formats Data Coming from User Request 
    */
    if(data.hasOwnProperty('phoneNumber')){/** Format Phone Number */
        const formattedPhoneNumber = cJoi.string().phoneNumber({
            defaultCountry: 'CA',
            strict: true ,
            format: 'international'
        }).validate(data.phoneNumber).value;

        const newData = {...data, phoneNumber: formattedPhoneNumber};

        return newData;

    }
    return data;
}

module.exports.checkObjecId = (id) => {
    /*
    * *** Checks if an Id is valid within the DB
    */
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error(constants.databaseMessage.INVALID_ID);
    }

}

module.exports.findUserByEmailOrPhone = async (userObject, email, phoneNumber) => {
    formattedNumber = (phoneNumber.length < 18) ?
    this.formatRequestData({phoneNumber}).phoneNumber: phoneNumber;
    return await userObject.findOne({$or: [{email}, {phoneNumber: formattedNumber}]});
}