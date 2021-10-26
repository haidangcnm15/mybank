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
        set.created = generatorTime();
        set.updated = generatorTime();
        set.isDeleted=false
        console.log({set})
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

const findById = async (userObjId) => {
    try {
        const conditions = {};
        conditions._id = convertToObjectId(userObjId);
        conditions.isDeleted = false;
        const fields = {
            name: 1,
            dob: 1,
            phone: 1,
        };
        const result = await userModels.findOne(conditions, fields);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

const findByUsername = async (username) => {
    try {
        const conditions = {
            username : username,
            isDeleted : false,
        };
        const fields = {
            name: 1,
            dob: 1,
            phone: 1,
            password:1,
            isDeleted:1
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
            name: 1,
            dob: 1,
            phone: 1,
            username:1,
            password:1,
            sex:1,
            idCard:1,
            created:1,
            updated:1,
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
    findByUsername,
};
