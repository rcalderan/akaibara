const _COLLECTION_NAME = 'user'
const mongoose = require('mongoose')
const schemaOptions = {
    collection: _COLLECTION_NAME,
    versionKey: false
}

const _DEFAULTS = []

const userSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
    },
    cpf: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phones: {
        type: Array,
        default: []
    },
    info: {
        type: String,
        default: ''
    },
    defaultAddress: {
        type: Number,
        required: true
    },
    addresses:{
        type:Array
    }
}, schemaOptions);

userSchema.methods.collumns = function () {
    return { _id: 1, name: 1, cpf: 1, email: 1, email: 1, info: 1, phones: 1, defaultAddress: 1,addresses:1 }
}

userSchema.statics.GetDefaultValues = function () {
    return _DEFAULTS
}

userSchema.statics.GetCollecionName = function () {
    return _COLLECTION_NAME
}

module.exports = mongoose.model(_COLLECTION_NAME, userSchema)


