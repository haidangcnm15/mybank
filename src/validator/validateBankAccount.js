
const {
    validateObjectId, validateNumber,validateBankAccount
} = require('../utils');

const isBankAccountObjId = validateObjectId('bankAccountObjId', true);
const isUserObjId = validateObjectId('userObjId', true);
const isBankAccountNumber = validateBankAccount('accountNumber', true);
const isAccountBalance = validateNumber('balance',true);

const createValidator = {
    ...isBankAccountNumber,
    ...isUserObjId,
    ...isAccountBalance,
};

const updateValidator = {
    ...isBankAccountObjId,
    ...isUserObjId
};

const deleteValidator ={
    ...isBankAccountObjId,
    ...isUserObjId
}
module.exports = {
    createValidator,
    updateValidator,
    deleteValidator,
};
