import React, { useState,useEffect } from "react";
import axios from "axios";



function BackFooter({setModalState}) {

  const [responseData, setResponseData] = useState(null);

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `https://eikon-api.onrender.com/footer/6516a3de9043681689488233`
      ); // Include the ID in the URL
      const data = response.data;
      setResponseData(data);
      setTitle(data.rightSection.title);     
      setEmail(data.section.email);
      setNumber(data.section.phone);
      setAddress(data.section.Address);
    } catch (error) {
      console.error("Error making GET request:", error);
      
    }
  };

  const openConfirmationModal = async () => {
    setModalState(prevState => ({
      ...prevState,
      showModal: true,
      handleUpdate
    }))
  }
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `https://eikon-api.onrender.com/footer/6516a3de9043681689488233`,
        {
          rightSection: {
            title: title,
          },
          section: {
            email: email,
            phone: number,
            Address: address,
          },
       }
      );

      setResponseData(response.data);
      setModalState(prevState => ({
        ...prevState,
        showModal: false,
      }))
    } catch (error) {
      console.error("Error making PATCH request:", error);
    }
  };
  useEffect(()=>{
    handleGet()
  },[])
  return (
    <div className="container">
      
      <div className="z-0" style={{ display: "block", zIndex: 1 }}>
       
        <div>
          <label className="mt-5">Title :</label>
          <textarea
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Number</label>
          <textarea
            className="form-control"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email id ckeck:</label>
          <textarea
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="row justify-content-end">
          <button className="btn btn-primary m-1 " onClick={handleGet}>Get</button>
          <button className="btn btn-success m-1" onClick={openConfirmationModal}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default BackFooter;
