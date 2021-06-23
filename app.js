const mongoose = require("mongoose")
const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
dotenv.config({ path: "./config.env" })

const path = require("path")
const hbs = require("hbs")
// const formData = require("../dev-data/data/import-dev-data.js")
const { request } = require("https")

const userRouter = require('./routes/userRouter')
const users = require("./dev-data/data/import-dev-data")


const app = express()



//PATHS
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPaTh = path.join(__dirname, "../views")
//END PATHS

app.set("view engine", "hbs")
app.set("views", viewsPaTh)
// hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))



app.get("", (request, respond) => {
    // respond.render("home", {
    //     title: "Form",
    //     name: "Unknown"
    // })

    respond.render("home")
})



app.get('/form', (req, res) => {



    //.. /form?address=
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "You must enter address"
        })
    }


    users(address, (error, { names, surname, age, place, description } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(names, surname, age, place, description);
        res.send({
            names,
            surname,
            age,
            place,
            description
        })
    })
});


app.get("/form", (request, respond) => {

    const address = request.query.address

    users(address, (result) => {
        console.log(result)
    })
})









const DB = process.env.DATABASE.replace(
    "<password>", process.env.DATABASE_PASSWORD
)


//DB CONECTION
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB connection succesful"))



//HTML STATIC FILES
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}`))

app.use(morgan('dev'))


// app.use("/", (req, res)=>{
//     res.send("Route is working!")
// })



app.use('/api/v1/users', userRouter)

module.exports = app





//SERVER
app.listen(3000, () => {
    console.log("Server is listening!")
})