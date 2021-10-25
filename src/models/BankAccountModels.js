const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const bankAccountBase = {
    accountNumber: { type: Number, trim: true, required: true },
    userObjId: {type: ObjectId, required: true, trim: true },
    accountBalance: {  type: Number, required: true,trim: true , default:0},
    validThru: {type: String, trim: true,required:true },
    brachAddress:{ type: String, trim: true,required:true},
    createdAt:{ type: String, required: true, default: null },
    updatedAt:{ type: String, required: true, default: null },
    isDeleted: { type: Boolean, default:false },
};
const bankAccountSchema = new Schema(bankAccountBase, {versionKey: false});
bankAccountSchema.index({
   isDeleted: 1,
    }, {
    unique: true,
    partialFilterExpression: {
        isDeleted: { $eq: false },
    },
});
const bankAccountModels = mongoose.model('bankAccounts', bankAccountSchema);
module.exports = bankAccountModels;
