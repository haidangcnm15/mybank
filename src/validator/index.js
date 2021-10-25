const validateBankAccount = require('./validateBankAccount');
const validateTransactionHistory = require('./validateTransactionHistory');
const validateUser = require('./validateUser');

module.exports={
    validateUser,
    validateBankAccount,
    validateTransactionHistory
}