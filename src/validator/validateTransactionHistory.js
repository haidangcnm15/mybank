
const {
    validateObjectId, validateNumber,validateBankAccount
} = require('../utils');

const isUserSObjId = validateObjectId('sendUserObjId', true);
const isUserRObjId = validateObjectId('receiveUserObjId', true);
const isTransactionObjId = validateObjectId('transactionObjId', true);
const isSendedAccountObjId = validateObjectId('sendedAccountObjId', true);
const isReceivedAccountObjId = validateObjectId('receivedAccountObjId', true);
const isAmount = validateNumber('amount', true);

const createValidator = {
    ...isSendedAccountObjId,
    ...isUserSObjId,
    ...isUserRObjId,
    ...isReceivedAccountObjId,
    ...isAmount,
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
