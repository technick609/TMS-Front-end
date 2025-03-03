import React, { useState } from 'react';
import BlueCheck from '../assets/blue-checked.svg';
import Clock from '../assets/alarm-clock.svg';
import Cross from "../assets/cross-icon.svg";
import Info from "../assets/info.svg";
import clsx from "clsx";
import moment from 'moment';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import Modal from './UI/Modal';

const TaskCard = ({ taskT, onClick, onEdit, onDelete,onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirmDelete = () => {
    onDelete(taskT._id); // Pass the task ID to delete
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <div className='task-tile-container cursor-pointer' onClick={onClick}>
        <span className='task-icon-wrapper'>
          <img src={BlueCheck} alt="Task icon" className='task-icon' />
        </span>
        <div className="task-text-wrapper">
          <p className="task-primary-text">{taskT.title}</p>
          <p className="task-secondary-text">{taskT.description}</p>
        </div>
        <div className="action-items-container">
          {taskT.due_date && (
            <div className="flex date-container">
              <img src={Clock} alt="clock icon" />
              <p className="date-text">
                {moment(taskT.due_date).format("DD MMM YYYY")}
              </p>
            </div>
          )}
          <div className="edit-container cursor-pointer" onClick={(e) => { e.stopPropagation(); onEdit(taskT); }}>
            <img src={EditIcon} alt="Edit task icon" />
          </div>
          <div className="delete-container cursor-pointer" onClick={handleDeleteClick}>
            <img src={DeleteIcon} alt="Delete task icon" />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="delete-task-container">
        <div className="text-right delete-task-header">
          <img src={Info} className="delete-popup-info-icon" alt="Info icon" />
          <div className="close-modal-btn" onClick={onClose}>
            <img src={Cross} alt="Close popup icon" />
          </div>
        </div>
        <div className="delete-popup-content">
          <p className="delete-task-text">
            Are You Sure You Want to delete <br />{" "}
            <span className="delete-task-title"> {taskT.title}? </span>{" "}
          </p>
          <div className="delete-action-btns">
            <button className="btn cancel-btn" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button
              className={clsx(
                "btn",
                "delete-btn",
                loading && "disabled-delete-btn"
              )}
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
      </div>
      </Modal>
    </>
  );
};

export default TaskCard;
