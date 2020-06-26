const _COLLECTION_NAME = 'product'
const mongoose = require('mongoose')
const schemaOptions = {
    collection: _COLLECTION_NAME,
    versionKey: false
}

const _DEFAULTS = []

const productSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default:""
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    soldout: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
}, schemaOptions);

productSchema.methods.collumns = function () {
    return { _id: 1, type: 1, name: 1, description: 1, img: 1, price: 1, date: 1, isActive: 1, soldout: 1, status: 1}
}

productSchema.statics.GetDefaultValues = function () {
    return _DEFAULTS
}

productSchema.statics.GetCollecionName = function () {
    return _COLLECTION_NAME
}

module.exports = mongoose.model(_COLLECTION_NAME, productSchema)


