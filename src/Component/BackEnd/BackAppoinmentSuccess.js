import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BackAppointmentSuccess() {
  const [responseData, setResponseData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    handleGet();
  }, []);

  const openConfirmationModal = (index) => {
    setDeleteIndex(index); // Store the index to delete
    setShowConfirmationModal(true);
  };

  const handleDelete = async () => {
    try {
      if (deleteIndex !== null) {
        const entryToDelete = responseData[deleteIndex];
        const response = await axios.delete(`https://eikon-api.onrender.com/appointments/${entryToDelete._id}`);

        if (response.status === 200) {
          const updatedData = responseData.filter((entry, index) => index !== deleteIndex);
          setResponseData(updatedData);
        }

        setDeleteIndex(null); // Clear the delete index
        handleGet();
      }
    } catch (error) {
      console.error('Error making DELETE request:', error);
      // Handle errors here.
    }
  };

  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/appointments`);
      const data = response.data;
      setResponseData(data);
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };

  return (
    <div className="container mt-5">
       
      
      {responseData.length > 0 ? ( // Check if there is data
        <div className='text-center'>
       
          <table className="table">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Comments</th>
                <th>Time</th>
                <th>Date</th>
                <th>Gender</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.comments}</td>
                  <td>{entry.time}</td>
                  <td>{entry.date}</td>
                  <td>{entry.gender}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => openConfirmationModal(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // No data found, display a message
        <div className="text-center mt-5">No Appointment Yet</div>
      )}

      <div>
        {showConfirmationModal && (
          <div>
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog ">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Delete</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowConfirmationModal(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to delete this entry?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowConfirmationModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setShowConfirmationModal(false);
                        handleDelete();
                      }}
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BackAppointmentSuccess;
