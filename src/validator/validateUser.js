
const {
    validateObjectId, validateNumber,validateSex
} = require('../utils');

const isUserObjId = validateObjectId('userObjId', true);
const isSex = validateSex('sex',true)
const createValidator = {
    ...isSex,
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
