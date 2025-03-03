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


// Setup the server

const startHttpServer = async function() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors());

app.post("/task", async(req, res) =>{
    try {
        const {title, description, due_date} = req.body;
        if(!title || !description){
            return res.status(400).json({message: "Title and description is required"});
        }

        const newTask = new TaskModel({
            title,
            description,
            due_date,
        });
        newTask.save()
        .then((saveDoc)=>{
            if(saveDoc){
                res.status(201).json({status: "created", task: saveDoc});
            }
            else{
                throw new Error("failed to save the document");
            }
        })
    } catch (error) {
        
    }
})

}