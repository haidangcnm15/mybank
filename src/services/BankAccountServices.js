const {
  bankAccountModels
} = require('../models');
const { generatorTime, promiseResolve,
    promiseReject,convertToObjectId,
} = require('../utils/index');

const create = async (data) => {
    try {
        let set = data
        // set.validThru=
        set.status="ACTIVE"
        set.created = generatorTime();
        set.updated = generatorTime();
        set.isDeleted=false
        const result = await bankAccountModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

const update = async (data) => {
    try {
        const set = data;
        set.updatedAt = generatorTime();
        const conditions = {
            _id: convertToObjectId(data.bankAccountObjId),
            isDeleted: false,
        };
        const result = await bankAccountModels.findOneAndUpdate(conditions, set, {new: true});
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

const updateBalance = async (dataBulkWrite) => {
    try {
        const result = await bankAccountModels.bulkWrite(dataBulkWrite);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

const hidden = async (data) => {
    try {
        set.updatedAt = generatorTime();
        set.isDeleted= true
        const conditions = {
            _id: convertToObjectId(data.bankAccountObjId),
            isDeleted: false,
        };
        const result = await bankAccountModels.findOneAndUpdate(conditions, set, {new: true});
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

const findById = async (bankAccountObjId) => {
    try {
        const conditions = {
            _id:convertToObjectId(bankAccountObjId),
            isDeleted:false
        };
        const fields = {
            accountNumber: 1,
            userObjId: 1,
            isDelete:1
        };
        const result = await bankAccountModels.findOne(conditions, fields);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const findBankAccountByNumber = async (accountNumber)=>{
    try {
        const conditions = {
            isDeleted:false,
            accountNumber:accountNumber
        };
        const fields = {
            accountNumber: 1,
            userObjId: 1,
            isDelete:1,
        };
        const result = await bankAccountModels.findOne(conditions, fields);
        return promiseResolve(result);
    } catch (error) {
        return promiseReject(err);
    }
};

const findBankAccountForUser = async (userObjId,bankAccountObjId)=>{
    try {
        const conditions = {
            _id:convertToObjectId(bankAccountObjId),
            userObjId:convertToObjectId(userObjId),
            isDeleted:false,
        };
       .log({conditions})
        const fields = {
            accountNumber: 1,
            userObjId: 1,
            isDelete:1,
            balance:1,
            bankName:1,
            bankCode:1
        };
        const result = await bankAccountModels.findOne(conditions, fields);
        return promiseResolve(result);
    } catch (error) {
        return promiseReject(err);
    }
};

const findInfoById = async (data) => {
    try {
        const conditions = {};
        conditions._id = convertToObjectId(data.bankAccountObjId);
        conditions.isDeleted = false;
        const fields = {
            accountNumber: 1,
            userObjId: 1,
            accountBalance: 1,
            validThru:1,
            brachAddress:1,
            createdAt:1,
            updatedAt:1,
        };
        const result = await bankAccountModels.findOne(conditions, fields);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

const listBankAccountByUser = async ({userObjId})=>{
    try {
        const conditions = {};
        conditions._id = convertToObjectId(userObjId);
        conditions.isDeleted = false;
        const fields = {
            accountNumber: 1,
            userObjId: 1,
            accountBalance: 1,
            validThru:1,
            brachAddress:1,
            createdAt:1,
            updatedAt:1,
        };
        const result = await bankAccountModels.find(conditions, fields);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}

// const updateBalance = async (data) => {
//     try {
//         const set = {};
//         set.balance=data?.balance
//         set.updatedAt = generatorTime();
//         const conditions = {
//             _id: convertToObjectId(data.bankAccountObjId),
//             isDeleted: false,
//         };
//         const result = await bankAccountModels.findOneAndUpdate(conditions, set, {new: true});
//         return promiseResolve(result);
//     } catch (err) {
//         return promiseReject(err);
//     }
// };
 
module.exports = {
    create,
    update,
    hidden,
    findById,
    findInfoById,
    updateBalance,
    findBankAccountByNumber,
    findBankAccountForUser,
    listBankAccountByUser
};
