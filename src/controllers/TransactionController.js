const { BankAccountServices,UserServices, TransactionHistoryServices} = require('../services');
const {
    validateBankAccount,validateTransactionHistory
} = require('../validator');
const {
    responseError,
    responseSuccess,
    trimValue,isEmpty,generatorTime,
} = require('../utils');

const {createValidator,updateValidator,deleteValidator} = validateTransactionHistory;

async function createTransaction(request, response, next) {
    try {
        request.checkBody(createValidator);
        const errors = request.validationErrors();
        if (errors) {
            return response.json(responseError(9009, errors));
        }
        const {body} = request;
        const isExistUNSend = await UserServices.findById(body?.sendUserObjId)
        const isExistUNReceive = await UserServices.findById(body?.receiveUserObjId)
        const isExistBASend = await BankAccountServices.findBankAccountForUser(body?.sendUserObjId,body?.sendedAccountObjId)
        const isExistBAReceive = await BankAccountServices.findBankAccountForUser(body?.receiveUserObjId,body?.receivedAccountObjId)
        if(!isExistUNSend || !isExistUNReceive || !isExistBASend || !isExistBAReceive){
            return response.json(responseError(2002, null));
        }
        if(isExistBASend?.balance <= body?.amount){
            return response.json(responseError(2200, null));
        }
        const params ={
            sendUserObjId:isExistBASend?.userObjId,
            receiveUserObjId:isExistBAReceive?.userObjId,
            sendedAccountObjId:isExistBASend?._id,
            receivedAccountObjId:isExistBAReceive?._id,
            status:'PENDING',
            contentTransaction:body?.contentTransaction || ''
        }
        const paramsSend = {
            ...params,
            newBalance:isExistBASend?.balance - body?.amount,
            oldBalance:isExistBASend?.balance,
            diffBalance:body?.amount,
            type:'SEND'
        }
        const paramsReceived={
            ...params,
            newBalance:isExistBAReceive?.balance + body?.amount,
            oldBalance:isExistBAReceive?.balance,
            diffBalance:body?.amount,
            type:'RECEIVE'
        }
        const resultCreateSend = await TransactionHistoryServices.create(paramsSend);
        const resultCreateReceive = await TransactionHistoryServices.create(paramsReceived)
        if(resultCreateSend?._id && resultCreateReceive?._id){
            const dataBulkWrite= [{
                updateOne: {
                    filter: {
                        _id: params?.sendedAccountObjId,
                    },
                    update: {
                        $set: {
                            balance:paramsSend?.newBalance,
                            updated: generatorTime(),
                        }
                    },
                },
            },
            {
                updateOne: {
                    filter: {
                        _id: params?.receivedAccountObjId,
                    },
                    update: {
                        $set: {
                            balance:paramsReceived?.newBalance,
                            updated: generatorTime(),
                        }
                    },
                },
            }]
            const resultUpdateBalance = await BankAccountServices?.updateBalance(dataBulkWrite)
            const result = await TransactionHistoryServices?.updateManyStatus("SUCCESS",[resultCreateSend?._id,resultCreateSend?._id]) 
            return response.json(responseSuccess(1200, null));
        }
        return response.json(responseError(9001, null));
    } catch (error) {
        return response.json(responseError(9000, null));
    }
};

module.exports={
    createTransaction,
}