require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const TaskModel = require('./model/task-model');
const mongoose = require('mongoose');


const port = process.env.PORT || 7001;
const mongodbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/defaultDB";


mongoose.connect(mongodbUrl)
.then(()=> console.log("Connected to MongoDB"))
.catch((error) => console.error("Error while connecting to database: ", error));


// The second way to connect
// mongoose.connect(mongodbUrl);
// mongoose.connection.on("error", (error) =>{
//     console.log("Unable to connect to database");
//     console.error(error.message);
// })

const app = express();
// Setting up the server
const startHttpServer = async function() {


}


app.post("/task", async(req, res)=>{
    try{
        const tasks = new TaskModel({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        });
        const savedTask = await tasks.save();
        // 201 Create
        res.status(201).json({success: true, message: "Books Added", data: savedTask});
    }catch(error){
        res.status(500).json({success: false, message: "Error while adding book: ", error: error.message})
    }
});


http.createServer(app).listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})