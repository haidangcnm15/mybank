
const {
    validateObjectId, validateNumber,validateBankAccount
} = require('../utils');

const isUserObjId = validateObjectId('userObjId', true);
const isTransactionObjId = validateObjectId('transactionObjId', true);
const isSendedAccountObjId = validateObjectId('sendedAccountObjId', true);
const isReceivedAccountObjId = validateObjectId('receivedAccountObjId', true);
const isDifferentBalance = validateNumber('diffBalance', true);

const createValidator = {
    ...isSendedAccountObjId,
    ...isUserObjId,
    ...isReceivedAccountObjId,
    ...isDifferentBalance,
};

const updateValidator = {
    ...isTransactionObjId
};

const deleteValidator ={
    ...isTransactionObjId,
}
module.exports = {
    createValidator,
    updateValidator,
    deleteValidator,
};
