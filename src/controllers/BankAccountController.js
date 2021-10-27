const { BankAccountServices,UserServices} = require('../services');
const {
    validateBankAccount,
} = require('../validator');
const {
    responseError,
    responseSuccess,
    trimValue,isEmpty,
} = require('../utils');

const {createValidator,updateValidator,deleteValidator} = validateBankAccount;

async function createAccount(request, response, next) {
    try {
        request.checkBody(createValidator);
        const errors = request.validationErrors();
        if (errors) {
            return response.json(responseError(9009, errors));
        }
        const {body} = request;
        const isExistUN = await UserServices.findById(body?.userObjId)
        if(!isExistUN){
            return response.json(responseError(2002, null));
        }
        const params = {
            accountNumber:body?.accountNumber,
            cardNumber:body?.cardNumber,
            userObjId:body?.userObjId,
            balance:body?.balance,
            validThru:body?.validThru,
            brachAddress:body?.brachAddress,
            bankName: body?.bankName,
            bankCode: body?.bankCode,
            swiftCode:body?.swiftCode
        }
        const result = await BankAccountServices.create(params);
        if (!isEmpty(result)) {
            return response.json(responseSuccess(1100, result));
        }
        return response.json(responseError(9001, null));
    } catch (error) {
        return response.json(responseError(9000, null));
    }
};

module.exports={
    createAccount,
}