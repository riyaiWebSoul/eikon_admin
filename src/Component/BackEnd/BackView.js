import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BackView({ setModalState }) {
  const [responseData, setResponseData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    handleGet();
  }, []);

  const openConfirmationModal = (index) => {
    setDeleteIndex(index);
    setShowConfirmationModal(true);
  };

  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/enquiry`);
      const data = response.data;
      setResponseData(data);
    } catch (error) {
      console.error('Error making GET request:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = [...responseData];
      const checkId = updatedData[deleteIndex]._id;
      const checkIdString = checkId.toString();

      const response = await axios.delete(`https://eikon-api.onrender.com/enquiry/${checkIdString}`);
      if (response.status === 200) {
        updatedData.splice(deleteIndex, 1);
        setResponseData(updatedData);
      }
      handleGet();
    } catch (error) {
      console.error('Error making DELETE request:', error);
    }
  };

  return (
    <div className="container mt-5">
      
      {responseData.length > 0 ? ( // Check if there is data
        <div>
          <table className="table mt-5">
            <thead>
              <tr>
                <th className="text-center">Serial Number</th>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Phone</th>
                <th className="text-center">Comments</th>
                <th className="text-center">Delete</th>

              </tr>
            </thead>
            <tbody>
              {responseData.map((entry, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{entry.name}</td>
                  <td className="text-center">{entry.email}</td>
                  <td className="text-center">{entry.phone}</td>
                  <td className="text-center">{entry.subject}</td>

                  <td className="text-center">
                    <button className="btn btn-danger text-center" onClick={() => openConfirmationModal(index)}>
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
        <div className="text-center mt-5">No Enquiry Yet</div>
      )}
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
                handleUpdate();
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
  );
}

export default BackView;
