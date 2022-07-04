const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    weight: Number,
    img: String
})

module.exports = mongoose.model('articles', articlesSchema)