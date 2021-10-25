const mongoose = require('mongoose');
const empty = require('is-empty');

const { ObjectId } = mongoose.Types;
//
const isObjectId = (a) => ObjectId.isValid(a) && typeof a !== 'number';
const isNumberNotNaN = (value) => !Number.isNaN(+value);
const isEmail = (value) => {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return !!filter.test(value);
};
const isNumberBankAccount = (value) => /^[a-zA-Z0-9]{8,16}$/.test(value);
const isValidSex = (value) => isNumberNotNaN(value) && (value==1 || value ==0)
const isEmpty = (value) => empty(value);

//
const validateObjectId = (field, required = false) => ({
    [field]: {
        [required ? 'notEmpty' : 'optional']: true,
        custom: {
            options: (value) => isObjectId(value) || (value == null),
            errorMessage: `${field} must is ObjectId or null`,
        },
        errorMessage: `${field} is required`,
    },
});

const validateObjectIds = (field, required = false) => {
    const obj = {
        [field]: {
            [required ? 'notEmpty' : 'optional']: true,
            custom: {
                options: (value) => {
                    if (!required) {
                        return isArrayObjectId(value) || isEmpty(value);
                    }
                    return isArrayObjectId(value);
                },
                errorMessage: `${field} must be an array ObjectId`,
            },
            errorMessage: `${field} must be an array ObjectId`,
        },
    };
    return obj;
};

const validateNumber = (field, required = false) => ({
    [field]: {
        [required ? 'notEmpty' : 'optional']: true,
        custom: {
            options: (value) => isNumberNotNaN(value),
            errorMessage: `${field} must is number`,
        },
        errorMessage: `${field} is required`,
    },
});

const validateBankAccount = (field, required = false) => ({
    [field]: {
        [required ? 'notEmpty' : 'optional']: true,
        custom: {
            options: (value) => isNumberBankAccount(value),
            errorMessage: `${field} must is number bank account`,
        },
        errorMessage: `${field} is required`,
    },
});

//validate sex
const validateSex = (field, required = false) => ({
    [field]: {
        [required ? 'notEmpty' : 'optional']: true,
        custom: {
            options: (value) => isValidSex(value),
            errorMessage: `${field} must is 1(male) or 0(female) `,
        },
        errorMessage: `${field} is required`,
    },
}); 

module.exports={
    validateSex,
    validateObjectId,
    validateObjectIds,
    validateNumber,
    validateBankAccount,
}