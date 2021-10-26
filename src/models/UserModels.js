const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const userBase = {
    name: { type: String, trim: true, required: true },
    dob: {type: String, required: true, trim: true },
    sex: {  type: Number, required: true, default:1},
    phone: {type: String, trim: true,required:true },
    address:{ type: String, trim: true,required:true},
    idCard: { type: String, trim: true,required:true },
    note: {type: String, default: ''},
    username:{type: String, trim:true,required:true,unique:true},
    password:{type: String, trim:true,required:true},
    created:{ type: String, required: true, default: '' },
    updated:{ type: String, required: true, default: '' },
    isDeleted: { type: Boolean, default:false },
};
const userSchema = new Schema(userBase, {versionKey: false});

const userModels = mongoose.model('users', userSchema);
module.exports = userModels;
