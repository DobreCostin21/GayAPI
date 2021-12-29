const mongoose = require('mongoose');

const gayPersonSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    age: { type: Number, required: true},
    pronouns: { type: Array, required: true },
    sexuality: { type: String, required: true},
    personalId: String
})

module.exports = mongoose.model("GayPerson", gayPersonSchema, 'gaypeople')