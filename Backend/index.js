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

    const app = express();
    app.use(express.json(), express.urlencoded({extended: true}), cors());

app.post("/task", async(req, res) =>{
    const {title, description, due_date} = req.body;
    if(!title || !description){
        return res.status(400).json({message: "fields req."});
    }
    try {
        const task = await new TaskModel({title, description, due_date}).save();
        res.status(201).json({status: "Created", task});
    } catch (error) {
        res.status(500).json({success: true, message: error.message});
    }
});


app.get("/tasks", async(req, res) =>{
    try{
        const tasks = await TaskModel.find();
        res.status(200).json({success: true, data: tasks});
    }catch(error){
        res.status(500).json({success: false, message: "Error occured", error: error.message});
    }
})


// app.put("/task/:id", async(req, res) =>{
//     const {id} = req.params;
//     const {title, description, due_date} = req.body;
//     try {
//         const task = await TaskModel.findById(id);
//         if(!task){
//             return res.status(404).json({message: "Task not found"});
//         }
//         Object.assign(task, {title, description, due_date}),;
//         const updateTask = await task.save();
//         res.status(200).json({message: "Task updated successfully", task: updateTask});
//     } catch (error) {
//         res.status(500).json({success: false, error: error.message});
//     }
// })



app.put("/task/:id", async(req, res)=>{
    try {
        const taskID = req.params.id;
        const updateTask = await TaskModel.findByIdAndUpdate(
            taskID,{
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
            },
            {new: true}
        );
        if(!updateTask){
           return res.status(400).json({success: false, message: "Book not found"});
        }
        res.status(201).json({success: true, message: "Book found", data: updateTask});
    } catch (error) {
        res.status(500).json({success: false, message: "Error while updating: ", error: error.message});
    }
});


app.delete("/task/:id", async(req, res) =>{
    try{
    const taskID = req.params.id;
    const deleteTask = await TaskModel.findByIdAndDelete(
        taskID
    );
    if(!deleteTask){
        return res.status(404).json({success: false, message: "Task not found"});
    }
    res.status(200).json({success: true, message: "Task deleted successfully..."});
} catch (error) {
    res.status(500).json({success: true, message: "Error while deleting: ", error: error.message});

}});


const startTime = Date.now();
http.createServer(app).listen(port, ()=>{
    const endTime = Date.now() 
    console.log(`Server is running on http://localhost:${port}, Time taken: ${endTime - startTime}ms`);
})