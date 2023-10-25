import React, { useState, useEffect } from "react";
import axios from "axios";

function BackPatientReviews({ setModalState }) {
  const [responseData, setResponseData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [userReview, setUserReview] = useState({
    testimonial: {
      title: "",
      description: "",
    },
    userReview: [
      {
        Name: "",
        Patient: "",
        description: "",
        image: "",
      },
    ],
  });

  const [editingIndex, setEditingIndex] = useState(null); // Track currently edited patient index

  const [newPatient, setNewPatient] = useState({
    Name: "",
    Patient: "",
    description: "",
    image: "",
  });

  // Function to fetch data from the API
  const handleGet = async () => {
    try {
      const response = await axios.get(
        "https://eikon-api.onrender.com/patientreview/65127ff99ff116e15901d5ff"
      );
      const data = response.data;
      setResponseData(data);
      setTitle(data.testimonial.title);
      setDescription(data.testimonial.description);
      setUserReview(data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const openConfirmationModal = async () => {
    setModalState((prevState) => ({
      ...prevState,
      showModal: true,
      handleUpdate,
    }));
  };

  // Function to update patient data
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        "https://eikon-api.onrender.com/patientreview/65127ff99ff116e15901d5ff",
        {
          testimonial: {
            title: title,
            description: description,
          },
          userReview: [...userReview.userReview],
        }
      );

      setResponseData(response.data);
      setModalState((prevState) => ({
        ...prevState,
        showModal: false,
      }));
    } catch (error) {
      console.error("Error making PATCH request:", error);
    }
  };

  // Function to add a new patient to the user review array
  const handleAddPatient = () => {
    // Create a copy of the existing user review array and add the new patient
    const updatedUserReview = [...userReview.userReview, newPatient];

    // Update the state with the new user review array
    setUserReview((prevUserReview) => ({
      ...prevUserReview,
      userReview: updatedUserReview,
    }));

    setNewPatient({
      Name: "",
      Patient: "",
      description: "",
      image: "",
    });
  };

  // Function to edit a patient's details
  const handleEditPatient = (index) => {
    // Set the editing index and populate the form with the patient's data
    setEditingIndex(index);
    const editedPatient = userReview.userReview[index];

    setNewPatient({ ...editedPatient });
  };

  // Function to save edited patient details
  const handleSavePatient = () => {
    // Copy the userReview array
    const updatedUserReview = [...userReview.userReview];

    // Update the patient's details at the editing index
    updatedUserReview[editingIndex] = { ...newPatient };

    // Update the state
    setUserReview((prevUserReview) => ({
      ...prevUserReview,
      userReview: updatedUserReview,
    }));

    // Clear the form and reset editing index
    setNewPatient({
      Name: "",
      Patient: "",
      description: "",
      image: "",
    });
    setEditingIndex(null);
  };

  // Function to delete an existing patient by index
  const handleDeletePatient = (index) => {
    // Copy the userReview array
    const updatedUserReview = [...userReview.userReview];

    // Remove the patient at the specified index
    updatedUserReview.splice(index, 1);

    // Update the state
    setUserReview((prevUserReview) => ({
      ...prevUserReview,
      userReview: updatedUserReview,
    }));
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("https://eikon-api.onrender.com/imageUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., show an error message
      });
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <div className="container">
      
      <div className="d-flex justify-content-end">
        <div className="col-sm-6 mt-5 d-flex justify-content-end">
          <div className="btn-group ">
            <button className="btn btn-primary m-1 " onClick={handleGet}>
              GET
            </button>
            <button
              className="btn btn-success m-1"
              onClick={openConfirmationModal}
            >
              UPDATE
            </button>
            <button className="btn btn-success m-1" onClick={handleAddPatient}>
              New
            </button>
          </div>
        </div>
      </div>
      <div className="col-sm-6 mt-lg-5">
        <input
          type="text"
          className="form-control m-1"
          placeholder="Enter on Get Button to get API"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="form-control m-1"
          placeholder="Enter on Get Button"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <h3>Existing Patients:</h3>
        {userReview.userReview.map((patient, index) => (
          <div key={index}>
            {editingIndex === index ? (
              // Render input fields for editing
              <div>
                <div>
                  <label>Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newPatient.Name}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, Name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Patient:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newPatient.Patient}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, Patient: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    value={newPatient.description}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        description: e.target.value,
                      })
                    }
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button onClick={handleUpload}>Upload Image</button>
                </div>
                <div>
                  <label>Image URL:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newPatient.image}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, image: e.target.value })
                    }
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSavePatient(index)}
                >
                  Save
                </button>
              </div>
            ) : (
              // Render patient details
              <div>
                <p>Name: {patient.Name}</p>
                <p>Patient: {patient.Patient}</p>
                <p>Description: {patient.description}</p>
                <p>Image URL: {patient.image}</p>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleEditPatient(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePatient(index)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default BackPatientReviews;
