import React, { useState, useEffect } from 'react'
import EditLogo from '../assets/edit-task-logo.svg';
import TitleImg from '../assets/title-placeholder-img.svg';
import Memo from '../assets/memo.svg';
import Calendar from '../assets/calendar.svg';
import InputField from './UI/InputField';
import updateTaskAPI from './API/updateTask';
import CustomDatePicker from './UI/CustomDatePicker';

const EditTask = ({task, showEditTaskScreen, fetchAllTasks, showTaskListScreen}) => {

  const [taskTitle, setTaskTitle] = useState(task?.title || "");
  const [taskDescription, setTaskDescription] = useState(task?.description || "");
  const [taskDueDate, setTaskDueDate] = useState(task?.due_date || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task && task._id) {
      setTaskTitle(task.title || "");
      setTaskDescription(task.description || "");
      setTaskDueDate(task.due_date || "");
    }
  }, [task]);


  if (!task) {
    return <h2>Loading task details...</h2>;
  };

  const handleDateChange = (date) => {
    setTaskDueDate(date);
  };

  const handleSave = () => {
    if (!taskTitle || !taskDescription) {
      alert("Title and description are required!");
      return;
    }

    console.log("Task ID before update:", task?._id); 

    if (!task?._id) {
      alert("Error: Task ID is missing. Cannot update task.");
      return;
    }

    const updateTask = {
      ...task,
      title: taskTitle,
      description: taskDescription,
      due_date: taskDueDate,

    }

    
    updateTaskAPI(setLoading, handleError, handleResponse, updateTask, task._id)
  }

  const handleResponse = (responseData) => {
    console.log("Task Updated:", responseData);
    fetchAllTasks();
    showEditTaskScreen();
  };

  const handleError = (errorMessage) => {
    alert("Failed to update task: ", errorMessage);
    console.error(errorMessage);
  };


  return (
    <div className='content-section create-task-section'>
        <div className="create-task-card">
            <img src={EditLogo} width={263} alt="" />
            <h1 className='create-task-title-text'>Edit Task</h1>
            <InputField name='edit-task-title' value={taskTitle} label="Title" type="text" inputImg={TitleImg} onChange={(e) => setTaskTitle(e.target.value)} placeholder={task.title} />
            <InputField name="edit-task-description" value={taskDescription} label="Description" type="textarea" inputImg={Memo} onChange={(e) => setTaskDescription(e.target.value)} placeholder={task.description} className="input-margin" />
            <InputField name="edit-task-due-date" value={taskDueDate} label="Due Date" type="date" inputImg={Calendar} onChange={handleDateChange} placeholder={task.due_date} className="input-margin" />
            <div className='add-edit-task-btns'>
            <button className='btn add-task-btn cursor-pointer' onClick={handleSave} disabled={loading}>{loading ? "Saving Task" : "Save Task"}</button>
            <button className='btn cancel-btn cursor-pointer' onClick={showTaskListScreen}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default EditTask