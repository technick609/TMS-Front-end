import React, { useCallback } from 'react'
import AddTask from '../assets/folder-white.svg'
import TaskCard from './TaskCard'


const TaskList = ({tasks, setActiveTask, showViewTaskScreen, showCreateTaskScreen, showEditTaskScreen, delTask}) => {

const viewTask = useCallback((task)=>{
    setActiveTask(task); // store the selected task in state
    showViewTaskScreen();
}, [setActiveTask, showViewTaskScreen]);


  return (
    <div className='task-list-screen content-section'>
        <div className="content-section-container">
            <div className="task-list-header-main">
                <p className="task-heading">{"\u{1F525}"}Task</p>
                <button onClick={showCreateTaskScreen} className='add-task-btn cursor-pointer'><img src={AddTask} alt="Add task icon" />Add Task</button>
            </div>
            <div className="task-list-container">
                {tasks.map((t) => (
                    <TaskCard key={`${t._id}-task-card`} taskT={t} onClick={() => viewTask(t)} onEdit={()=> showEditTaskScreen(t)} onDelete={() => delTask(t._id)} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default TaskList