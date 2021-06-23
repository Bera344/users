const fs = require('fs')
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const user = require("../../models/userModel")
const User = require("../../models/userModel")


dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE.replace(
    "<password>", process.env.DATABASE_PASSWORD
)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB connection succesful"))

const users = JSON.parse(fs.readFileSync(`${__dirname}/users-sample.json`, "utf-8"))










//IMPORT DATA TO DATABASE

const importData = async () =>{
    try{
        await User.create(users)
        console.log("Data added")
    }

    catch (err) {
        console.log(err)
    }
}





if(process.argv[2] === "--import"){
    importData()
}
else if(process.argv[2] === "--delete"){
    deleteData()
}
console.log(process.argv)

module.exports = users