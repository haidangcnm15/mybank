const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const userBase = {
    fullName: { type: String, trim: true, required: true },
    dob: {type: String, required: true, trim: true },
    sex: {  type: Number, required: true, default:1},
    phoneNumber: {type: String, trim: true,required:true },
    address:{ type: String, trim: true,required:true},
    idCard: { type: String, trim: true,required:true },
    createdAt:{ type: String, required: true, default: null },
    updatedAt:{ type: String, required: true, default: null },
    isDeleted: { type: Boolean, default:false },
    note: {type: String, default: null},
    userName:{type: String, trim:true,required:true,unique:true},
    password:{type: String, trim:true,required:true}
};
const userSchema = new Schema(userBase, {versionKey: false});
userSchema.index({
   isDeleted: 1,
    }, {
    unique: true,
    partialFilterExpression: {
        isDeleted: { $eq: false },
    },
});
const userModels = mongoose.model('users', userSchema);
module.exports = userModels;
