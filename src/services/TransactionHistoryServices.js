const {
    transactionHistoryModels
  } = require('../models');
  const { generatorTime, promiseResolve,
      promiseReject,convertToObjectId,
  } = require('../utils/index');
  
  const create = async (data) => {
      try {
          let set = data
          // set.validThru=
          set.timeTransaction=generatorTime()
          set.created = generatorTime();
          set.updated = generatorTime();
          set.isDeleted=false
          const result = await transactionHistoryModels.create(set);
          return promiseResolve(result);
      } catch (err) {
          return promiseReject(err);
      }
  };
  
  const updateStatus = async (data) => {
      try {
          const set = {};
          set.status=data.statusTransaction
          set.updatedAt = generatorTime();
          const conditions = {
              _id: convertToObjectId(data.bankAccountObjId),
              isDeleted: false,
          };
          const result = await transactionHistoryModels.findOneAndUpdate(conditions, set, {new: true});
          return promiseResolve(result);
      } catch (err) {
          return promiseReject(err);
      }
  };
  
  const updateManyStatus = async (statusTransaction,listObjIds) => {
    try {
        const set = {};
        set.status=statusTransaction
        set.updatedAt = generatorTime();
        const conditions = {
            _id: {$in:listObjIds},
            isDeleted: false,
        };
        const result = await transactionHistoryModels.updateMany(conditions, {$set:{set}}, {new: true});
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

  const findById = async (data) => {
      try {
          const conditions = {};
          conditions._id = convertToObjectId(data.bankAccountObjId);
          conditions.isDeleted = false;
          const fields = {
              accountNumber: 1,
              userObjId: 1,
              isDelete:1
          };
          const result = await transactionHistoryModels.findOne(conditions, fields);
          return promiseResolve(result);
      } catch (err) {
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
          const result = await transactionHistoryModels.findOne(conditions, fields);
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
          const result = await transactionHistoryModels.find(conditions, fields);
          return promiseResolve(result);
      } catch (err) {
          return promiseReject(err);
      }
  }
  
  module.exports = {
      create,
      updateStatus,
      findById,
      findInfoById,
      updateManyStatus,
      listBankAccountByUser
  };
  