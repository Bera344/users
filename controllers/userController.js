const { listenerCount } = require("./../models/userModel")
const User = require("./../models/userModel")



//GETTING ALL USERS
exports.getAllUsers = async (req, res) => {
    
    try {


        //BUILD THE QUERY
        
        const queryObj = {...req.query} 
        
        const excludedFields = ["birthDate", "financialStatus"]
        
        excludedFields.forEach(el => delete queryObj[el])





        //CONVERT QUERY TO STRING
        let queryString = JSON.stringify(queryObj)

        
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryString))



        console.log("req.quary:", req.query, "req.queryObj:" , queryObj)


        const query = User.find(JSON.parse(queryString))
        const users = await query


        res.json({
            status: "success",
            results: users.length,
            data: {users}
        })
    }

    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }

}
//END GETTING USERS




//CREATE USER
exports.createUsers = async (req, res) => {
 
    try {
        
        const newUser = await User.create(req.body)

        res.json({
            status: "success",
            data: {
                user: newUser
            }
        })
    }

    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }
}
//END CREATE



//GET A USER
exports.getUser = async (req, res) => {
    
const user = await User.findById(req.params.id)
    try{
        res.json({
        status: "success",
        data: {user}
        })
    }


    catch (err) {
        res.json({
        status: "fail",
        message: err
        })
    }
}
//END GET USER




//UPDATE USER
exports.updateUser = async (req, res) => {

    
    try{                                        
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            
        
        res.json({
            status: "success",
            data: {user}
        })
    
    }

    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }
    
}
//END UPDATE




//DELETE USER
exports.deleteUser = async (req, res) => {

    
    try{
    
        const user = await User.findByIdAndDelete(req.params.id)
        res.json({
            status: "success",
            data: null
        })
    }
   
    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }
}
//END DELETE USER