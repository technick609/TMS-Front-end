import React from 'react';
import BlueCheck from '../assets/blue-checked.svg';
import CrossIcon from '../assets/cross-icon.svg';
import Clock from '../assets/alarm-clock.svg';
import moment from 'moment';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import Modal from './UI/Modal';


const ViewTask = ({task, showTaskListScreen, showEditTaskScreen, onDel}) => {
  return (
    <>
    <Modal isOpen={true} onClose={showTaskListScreen}>
    <div className='flex justify-between view-task-header'>
        <div className="flex">
            <span className="task-icon-wrapper">
                <img src={BlueCheck} alt="Task icon" className='task-icon' />
            </span>
            <h2 className='view-task-title'>{task.title}</h2>
        </div>
        <div className="close-modal-btn" onClick={showTaskListScreen}>
            <img src={CrossIcon} alt="Close popup icon" />
        </div>
    </div>
    <div className="flex">
        <pre className="view-task-description">{task.description}</pre>
        <div className="view-task-right-section">
            {task.due_date && (
                <div className='view-task-info-box'>
                    <p className="label-14">Due Date</p>
                    <div className="flex date-container">
                    <img src={Clock} alt="clock icon" />
                    <p className='date-text'>{moment(task.due_date).format("DD MMM YYYY")}</p>
                    </div>
                </div>
            )}
            <div className="view-task-info-box flex cursor-pointer" onClick={(e) => {e.stopPropagation(); showEditTaskScreen(task)}}>
                <img src={EditIcon} width={16} height={16} alt="Edit task icon" />
                <p className="label-12">Edit Task</p>
            </div>
            <div className="view-task-info-box flex cursor-pointer" onClick={(e) => {e.stopPropagation(); onDel(task._id)}}>
                <img src={DeleteIcon} width={16} height={16} alt="Delete task icon" />
                <p className="label-12">Delete Task</p>
            </div>
        </div>
    </div>
    </Modal>
    </>
  )
}

export default ViewTask