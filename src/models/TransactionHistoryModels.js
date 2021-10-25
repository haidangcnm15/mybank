const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const transactionsHistoryBase = {
    sendedAccountObjId: { type: ObjectId, trim: true, required: true, ref:'bankAccounts' },
    receivedAccountObjId: { type: ObjectId, trim: true, required: true, ref:'bankAccounts' },
    userObjId: {type: ObjectId, required: true, trim: true , ref:'users'},
    accountBalance: { type: Number, required: true,trim: true , default:0},
    oldBalance: { type: Number, required: true,trim: true , default:0},
    diffBalance:{ type: Number, required: true,trim: true , default:0},
    contentTransaction: { type: String, required: true, default: null },
    timeTransaction:{type: String, required: true, default: null},
    status:{type: String, required: true, default: null},
    createdAt:{ type: String, required: true, default: null },
    updatedAt:{ type: String, required: true, default: null },
    isDeleted: { type: Boolean, default:false },
};
const transactionsHistorySchema = new Schema(transactionsHistoryBase, {versionKey: false});
transactionsHistorySchema.index({
   isDeleted: 1,
    }, {
    unique: true,
    partialFilterExpression: {
        isDeleted: { $eq: false },
    },
});
const transactionHistoryModels = mongoose.model('transactionHistory', transactionsHistorySchema);
module.exports = transactionHistoryModels;
