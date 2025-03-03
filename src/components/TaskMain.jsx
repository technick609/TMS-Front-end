import React, { useCallback, useEffect, useState } from 'react'
import CreateTask from './CreateTask'
import Loading from './UI/Loading'
import EditTask from './EditTask'
import NoTask from './NoTask'
import TaskList from './TaskList'
import ViewTask from './ViewTask'
import Header from './Header'
import Copyright from './Copyright'
import fetchTaskAPI from './API/fetchTask'
import deleteTaskAPI from './API/deleteTask'
import 'react-datepicker/dist/react-datepicker.css'


const TaskMain = () => {

const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(false);

// For SPA initialize the state
const [activeTask, setActiveTask] = useState(null);
const [currComponent, setCurrComponent] = useState("loading");

// Create function to change screen
const showNoTaskScreen = useCallback(()=>{
  setCurrComponent("noTask");
}, []);

const showCreateTaskScreen = useCallback(()=>{
  setCurrComponent("createTask");
}, []);

const showTaskListScreen = useCallback(()=>{
  setCurrComponent("taskList");
}, []);

const showEditTaskScreen = useCallback((task)=>{

  setActiveTask(task)
  setCurrComponent("editTask");
}, [setActiveTask, setCurrComponent]);

const showViewTaskScreen = useCallback(()=>{
  setCurrComponent("viewTask");
}, []);

// Create API fetch
const fetchAllTasks = useCallback(()=>{
  setLoading(true);
  fetchTaskAPI(setLoading, handleError, handleResponse);
}, []);

const handleResponse = useCallback((responseData)=> {
  console.log("API response Data:", responseData);
  const extractedTasks = responseData?.data || [];
  setTasks(extractedTasks);
  if(extractedTasks.length){
    showTaskListScreen();
  }
  else{
    showNoTaskScreen();
  };
  setLoading(false);
}, [setTasks, showTaskListScreen, showNoTaskScreen]);

const handleError = useCallback((errorMsg) =>{
  alert(errorMsg);
  console.log(errorMsg);
  setLoading(false);
}, []);

// Delete Tasks

const delTask = async (taskId) => {
  setLoading(true); 
  console.log("Deleting task with ID:", taskId); 

  const handleResponse = (responseData) => {
    console.log("Task deleted successfully:", responseData);
    fetchAllTasks(); 
  };

  const handleError = (errorMessage) => {
    console.error("Error deleting task:", errorMessage);
    alert("Failed to delete task: ", errorMessage);
  };

  try {
    await deleteTaskAPI(setLoading, handleError, handleResponse, taskId);
  } catch (error) {
    console.error("Delete task failed:", error);
  } finally {
    setLoading(false); 
  }
};


useEffect(()=>{
  fetchAllTasks(setLoading, handleError, handleResponse)
}, [fetchAllTasks])

  return (
    <>
      <Header />
      {currComponent === "loading" && <Loading /> }
      {currComponent === "noTask" && <NoTask showCreateTaskScreen={showCreateTaskScreen} />}
      {currComponent === "createTask" && <CreateTask task={tasks} fetchAllTasks={fetchAllTasks} showTaskListScreen={showTaskListScreen} showNoTaskScreen={showNoTaskScreen} />}
      {currComponent === "taskList" && <TaskList tasks={tasks} showViewTaskScreen={showViewTaskScreen} setActiveTask={setActiveTask} showCreateTaskScreen={showCreateTaskScreen} showEditTaskScreen={showEditTaskScreen} delTask={delTask} />}
      {currComponent === "editTask" && <EditTask task={activeTask} showEditTaskScreen={showEditTaskScreen} showTaskListScreen={showTaskListScreen} fetchAllTasks={fetchAllTasks} />}
      {currComponent === "viewTask" && <ViewTask task={activeTask} showTaskListScreen={showTaskListScreen} showEditTaskScreen={showEditTaskScreen} onDel={delTask} />}
      <Copyright />

      
    {/* {loading ?
      (<Loading />) :
      (<div id="container-div">
        <NoTask />
        <CreateTask task={tasks} />
        <EditTask task={staticTask}/>
        <TaskList tasks={tasks} />
        <ViewTask task={staticTask} />
      </div> )} */}
    </>
  )
}

export default TaskMain