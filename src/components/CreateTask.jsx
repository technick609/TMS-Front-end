import React, { useCallback, useState } from 'react'
import UserIcon from '../assets/user-icon.png';
import TitleImg from '../assets/title-placeholder-img.svg';
import Memo from '../assets/memo.svg';
import Calendar from '../assets/calendar.svg';
import InputField from './UI/InputField';
import clsx from 'clsx';
import createTaskAPI from './API/createTask';

const CreateTask = ({task, fetchAllTasks, showTaskListScreen, showNoTaskScreen}) => {

  // Store the values entered by the user
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState();
  const [loading, setLoading] = useState(false);

  // Event handling using handlers
  const handleTitleChange = (event)=> {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionChange = (event)=> {
    setTaskDescription(event.target.value);
  };

  const handleDateChange = (date)=> {
    setTaskDueDate(date);
  };

  // Validate the user entered fields

  const validate = useCallback((values)=> {
    const {taskTitle, taskDescription} = values;
    if(taskTitle && taskDescription){
      return true;
    }
    else{
      console.error("Please fill out title and description")
      alert("Please fill out title and description");
      return false;
    }

  }, []);


  const handleResponse = useCallback((responseData) => {
    if (responseData.status === "Created"){
     fetchAllTasks(); 
    }
  }, [fetchAllTasks]);
 
  const handleError = useCallback((errorMessage) => {
    alert(errorMessage);
    console.error(errorMessage);
  }, []);


   // Submit the task
   const createNewTask = useCallback((values)=>{
    createTaskAPI(setLoading, handleError, handleResponse, values);
  }, [handleError, handleResponse]);

  // Adding task

  const handleTask = useCallback(()=>{
    const values = {
      taskTitle,
      taskDescription,
      taskDueDate,
    };
    const isValid = validate(values);
    if(isValid){
      createNewTask(values);
      showTaskListScreen()
    }
  }, [createNewTask, taskTitle, taskDescription, taskDueDate, validate])

  return (
    <div className='content-section create-task-section'>
        <div className="create-task-card">
            <img src={UserIcon} width={263} alt="" />
            <h1 className='create-task-title-task'>Create New Task</h1>
            <InputField name='new-task-title' value={taskTitle} label="Title" type="text" inputImg={TitleImg} onChange={handleTitleChange} placeholder={task.title} />
            <InputField name="new-task-description" value={taskDescription} label="Description" type="textarea" inputImg={Memo} onChange={handleDescriptionChange} placeholder={task.description} className="input-margin" />
            <InputField name="new-task-due-date" value={taskDueDate} label="Due Date" type="date" inputImg={Calendar} onChange={handleDateChange} placeholder={task.due_date} className="input-margin" />
            <div className='add-edit-task-btns'>
            <button className={clsx("btn", "add-task-btn", loading ? "disabled-add-task-btn" : "cursor-pointer")} disabled={loading} onClick={handleTask} >{loading ? "Adding Task" : "Add Task"}</button>
            <button className='btn cancel-btn cursor-pointer' onClick={task.length ? showTaskListScreen : showNoTaskScreen}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default CreateTask