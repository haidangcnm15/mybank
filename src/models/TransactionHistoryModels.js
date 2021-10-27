const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const transactionsHistoryBase = {
    sendedAccountObjId: { type: ObjectId, trim: true, required: true, ref:'bankAccounts' },
    receivedAccountObjId: { type: ObjectId, trim: true, required: true, ref:'bankAccounts' },
    sendUserObjId: {type: ObjectId, required: true, trim: true , ref:'users'},
    receiveUserObjId: {type: ObjectId, required: true, trim: true , ref:'users'},
    newBalance: { type: Number, required: true,trim: true , default:0},
    oldBalance: { type: Number, required: true,trim: true , default:0},
    diffBalance:{ type: Number, required: true,trim: true , default:0},
    contentTransaction: { type: String, required: true, default: null },
    timeTransaction:{type: String, required: true, default: null},
    type:{type: String, required: true,enum: ["SEND", "RECEIVE"]},
    status:{type: String, required: true, default: null},
    created:{ type: String, required: true, default: null },
    updated:{ type: String, required: true, default: null },
    isDeleted: { type: Boolean, default:false },
};
const transactionsHistorySchema = new Schema(transactionsHistoryBase, {versionKey: false});
const transactionHistoryModels = mongoose.model('transactionHistory', transactionsHistorySchema);
module.exports = transactionHistoryModels;
