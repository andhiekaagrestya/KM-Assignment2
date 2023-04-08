const fs = require("fs")
const express = require("express")
const jwt = require("jsonwebtoken")
const app =express()
const authMiddleware = require("./auth.middleware")
require("dotenv").config()


const PORT = process.env.PORT || 5000

//Read data
const dataUser = fs.readFileSync('./users.json', "utf-8")
const dataTeacher = fs.readFileSync('./teachers.json', "utf-8")
const dataJson = JSON.parse(dataUser)[0]
const dataTeacherJson = JSON.parse(dataTeacher)


app.use(express.json())


app.post("/login" , (req,res) => {
    const {username,password} =req.body

    if(username === dataJson.username && password === dataJson.password) {

        const token = jwt.sign({username, id:dataJson.id}, process.env.SECRET_KEY)

        res.status(200).send({
            status:"success",
            message:"test",
            token
        })
    }else {
        res.status(404).send({
            status:"failed",
            message:"Username or password is invalid"
        })
    }


})


app.get("/data" , authMiddleware ,(req,res) => {
    res.status(200).send({
        status:"success",
        data: {
            dataTeacherJson
        }
    })
})






app.listen(PORT , () => {
    console.log(`Server is listening to the port ${PORT}`)
})