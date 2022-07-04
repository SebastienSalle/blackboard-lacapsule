const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    title: String,
    content: String,
    dateExp: Date,
    read: Boolean,
    sender: String,
})

const taskSchema = mongoose.Schema({
    name: String,
    category: String,
    owner: String,
    dateInsert: Date,
    dateDue: Date,
    dateCloture: Date,

})

const usersSchema = mongoose.Schema({
    messages: [messageSchema],
    tasks: [taskSchema],
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    status: String,
    gender: String,
    dateInsert: Date,
    pronoun1: String,
    pronoun2: String,
})

module.exports = mongoose.model('users', usersSchema)