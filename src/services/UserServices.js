const moment = require('moment-timezone');
const {
  userModels
} = require('../models');
const { generatorTime, promiseResolve,
    promiseReject,convertToObjectId,
} = require('../utils/index');

const create = async (data) => {
    try {
        let set = data
        set.createdAt = generatorTime();
        set.updatedAt = generatorTime();
        set.isDeleted=false
        const result = await userModels.create(set);
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
            _id: convertToObjectId(data.userObjId),
            isDeleted: false,
        };
        const result = await userModels.findOneAndUpdate(conditions, set, {new: true});
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
            _id: convertToObjectId(data.userObjId),
            isDeleted: false,
        };
        const result = await userModels.findOneAndUpdate(conditions, set, {new: true});
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

const findById = async (data) => {
    try {
        const conditions = {};
        conditions._id = convertToObjectId(data.userObjId);
        conditions.isDeleted = false;
        const fields = {
            fullName: 1,
            dob: 1,
            phoneNumber: 1,
        };
        const result = await userModels.findOne(conditions, fields);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

const findInfoById = async (data) => {
    try {
        const conditions = {};
        conditions._id = convertToObjectId(data.userObjId);
        conditions.isDeleted = false;
        const fields = {
            fullName: 1,
            dob: 1,
            phoneNumber: 1,
            userName:1,
            password:1,
            sex:1,
            phoneNumber:1,
            idCard:1,
            createdAt:1,
            updatedAt:1,
        };
        const result = await userModels.findOne(conditions, fields);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

module.exports = {
    create,
    update,
    hidden,
    findById,
    findInfoById,
};
