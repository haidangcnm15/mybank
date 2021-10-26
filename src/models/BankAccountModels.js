const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const bankAccountBase = {
    accountNumber: { type: String, trim: true,unique: true, required: true },
    cardNumber: { type: String, trim: true,unique: true, required: true },
    userObjId: {type: ObjectId, required: true, trim: true },
    balance: {  type: Number, required: true,trim: true , default:0},
    validThru: {type: String, trim: true,required:true },
    brachAddress:{ type: String, trim: true,required:true},
    bankName: { type: String, trim: true, required: true },
    bankCode:{ type: String, trim: true, required: true },
    swiftCode:{ type: String, trim: true, required: true },
    status: {
        type: String,
        enum: ["ACTIVE", "UN-ACTIVE"],
    },
    created:{ type: String, required: true, default: null },
    updated:{ type: String, required: true, default: null },
    isDeleted: { type: Boolean, default:false },
};
const bankAccountSchema = new Schema(bankAccountBase, {versionKey: false});
bankAccountSchema.index({
    cardNumber: 1,
    accountNumber:1,
    }, {
    unique: true,
});
const bankAccountModels = mongoose.model('bankAccounts', bankAccountSchema);
module.exports = bankAccountModels;
