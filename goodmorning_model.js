let mongoose = require ('mongoose')

//create new schema
let mongoSchema = mongoose.Schema

let goodmorningCollection = new mongoSchema({
    "message":String,
    "author":String,
    "like":Number
},{collection:"goodmorning"})

module.exports = mongoose.model("gmModel",goodmorningCollection)