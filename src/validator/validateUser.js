
const {
    validateObjectId, validateNumber,validateSex
} = require('../utils');

const isUserObjId = validateObjectId('userObjId', true);
const isSex = validateSex('sex',true)

const sexValidate = {
    sex: {
        notEmpty: true,
        errorMessage: 'sex must be 1(male) or 0(female)',
    },
};

const createValidator = {
    ...isSex,
    ...sexValidate
};

const updateValidator = {
    ...isUserObjId,
    ...isSex,
};

const deleteValidator ={
    ...isUserObjId,
}
module.exports = {
    createValidator,
    updateValidator,
    deleteValidator,
};
