const moment = require('moment-timezone');
const empty = require('is-empty');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');

//
const ObjectId = mongoose.Types.ObjectId
//validate
const {MESSAGE_SUCCESS,MESSAGE_ERROR} = require('../constants/index');
const {validateObjectId ,validateBankAccount,validateNumber,validateSex} = require('./validate');
//
const promiseResolve = (data) => Promise.resolve(data);
const promiseReject = (err) => Promise.reject(err);

//response
const isEmpty = (value) => empty(value);
//
const responseError = (statusCode, errors = {}) => {
    const response = {};
    response.success = false;
    response.statusCode = statusCode;
    response.message = MESSAGE_ERROR[statusCode];
    let message = '';
    if (!empty(errors)) {
        message = errors[0] && errors[0].msg ? errors[0].msg : MESSAGE_ERROR[statusCode];
        message = errors.message ? errors.message : MESSAGE_ERROR[statusCode];
        response.message = message;
        response.errors = errors;
    }
    return response;
};
const responseSuccess = (statusCode, result = {}) => {
    const response = {
        success: true,
        statusCode: statusCode,
        message: MESSAGE_SUCCESS[statusCode],
    };
    if (result) {
        response.data = result;
    }
    return response;
};
//
const generatorTime = () => moment().format('YYYY-MM-DD HH:mm:ss');

const convertToObjectId = (value) => ObjectId(sanitizeFieldName(value));

const trimValue = (value) => String(value || '').trim();

const sanitizeFieldName = (fieldName) => { // Injection
    if (fieldName) {
        return sanitize(fieldName);
    }
    return '';
};

module.exports={
    isEmpty,
    trimValue,
    promiseReject,
    generatorTime,
    promiseResolve,
    responseError,
    responseSuccess,
    convertToObjectId,
}