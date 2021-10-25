const moment = require('moment-timezone');
const empty = require('is-empty');

//validate
const {MESSAGE_SUCCESS,MESSAGE_ERROR} = require('../constants/index');
const {validateObjectId ,validateBankAccount,validateNumber,validateSex} = require('./validate');
//
const promiseResolve = (data) => Promise.resolve(data);
const promiseReject = (err) => Promise.reject(err);

//response

const responseError = (statusCode, errors = {}) => {
    const response = {};
    response.success = false;
    response.statusCode = statusCode;
    response.message = MESSAGE_ERROR[statusCode];
    let message = '';
    if (!empty(errors)) {
        message = errors[0] && errors[0].msg ? errors[0].msg : CODES_ERROR[statusCode];
        message = errors.message ? errors.message : CODES_ERROR[statusCode];
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


module.exports={
    trimValue,
    validateSex,
    promiseReject,
    generatorTime,
    promiseResolve,
    validateNumber,
    responseError,
    responseSuccess,
    validateObjectId,
    convertToObjectId,
    validateBankAccount,
}