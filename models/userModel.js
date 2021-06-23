const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must provide a name"],
        unique: true,
        trim: true
    },

    surname: {
        type: String,
        required: [true, " You must provide a surname"],
        unique: true,
        trim: true
    },

    age: {
        type: Number,
    },

    place: {
        type: String,
        required: [true, " You must provide a place"],
    },    

    description:{
        type: String,
        trim: true
    },

    createdAt:{
        type: Date,
        default: Date.now()
    },

    startDates : [Date]
})

const User = mongoose.model("User", userSchema)

module.exports = User