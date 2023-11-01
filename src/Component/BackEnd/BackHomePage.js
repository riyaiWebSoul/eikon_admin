import React, { useState, useEffect } from "react";
import axios from "axios";

function BackHomePage({ setModalState }) {
  const [responseData, setResponseData] = useState(null);
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [imageNames, setImageNames] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);
 

  const handleGet = async () => {
    try {
      const response = await axios.get(
        "https://eikon-api.onrender.com/home/650d4595f2c62afdc75b54ba"
      );
      const data = response.data;

      setResponseData(data);
      setTitle(data.section.title);
      setDescription(data.section.description);
      setHeading(data.section.heading);
      setImageNames(data.section.imageSrc[0]);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };


  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('image', newImage, imageNames); // Use the current image name
  
    axios.patch(`https://eikon-api.onrender.com/imageUpdate/${imageNames}`, formData)
      .then(response => {
        setNewImage(response.data.formData); // Set the new image name to state
      })
      
      .catch(error => {
        console.error('Error uploading image:', error);
      });
      handleGet();
      return(alert('your image is changed'))
  }
  

  const openConfirmationModal = async () => {
    setModalState((prevState) => ({
      ...prevState,
      showModal: true,
      handleUpdate,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        "https://eikon-api.onrender.com/home/650d4595f2c62afdc75b54ba",
        {
          section: {
            imageSrc: imageNames,
            title: title,
            heading: heading,
            description: description,
          },
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

 

   

  
  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <div className="col-sm-6 mt-5 d-flex justify-content-end">
          <div className="btn-group">
            <button className="btn btn-primary m-1" onClick={handleGet}>
              GET
            </button>
            <button className="btn btn-success m-1" onClick={openConfirmationModal}>
              UPDATE
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="z-0" style={{ display: "block", zIndex: 1 }}>
       
        <div className="row mt-3">
        <div className=" col-md-6 ">
          <img src={`https://eikon-api.onrender.com/imageUploads/${imageNames}`} width={"100px"} />
          <label>Image Name:</label>
          <input
            className="form-control"
            value={imageNames}
            onChange={(e) => setImageNames(e.target.value)}
          />
            <input type="file" onChange={e => setNewImage(e.target.files[0])} />
          <button className="btn btn-success m-1" onClick={handleImageUpload}>
            Update Image
          </button>
        </div>
        <div className="col-md-6 ">
        <div>
          <label>Title:</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Heading:</label>
          <textarea
            className="form-control"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          </div>
        <div>
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
         
        </div>
        </div>
      

      
      </div>
    </div>
  );
}

export default BackHomePage;
