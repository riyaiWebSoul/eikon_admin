import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HealingTouch({ setModalState }) {
  const [data, setData] = useState({});
  const [healing, setHealing] = useState([]);

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `https://eikon-api.onrender.com/healingTouch/6512680bf1696448ae389b12`
      );
      setData(response.data);

      // Initialize healing state with the data from the API response
      setHealing(response.data.card);
    } catch (error) {
      console.error('Error making GET request:', error);
    }
  }

  const openConfirmationModal = () => {
    setModalState((prevState) => ({
      ...prevState,
      showModal: true,
      handleUpdate,
    }));
  }

  const handleUpdate = async () => {
    try {
      const updatedData = { ...data, card: healing };
      await axios.patch(
        `https://eikon-api.onrender.com/healingTouch/6512680bf1696448ae389b12`,
        updatedData
      );

      setModalState((prevState) => ({
        ...prevState,
        showModal: false,
      }));
    } catch (error) {
      console.error('Error making PATCH request:', error);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('descriptionSub')) {
      const index = parseInt(name.replace('descriptionSub', ''), 10);
      setHealing((prevHealing) => [
        ...prevHealing.slice(0, index),
        { ...prevHealing[index], count: value },
        ...prevHealing.slice(index + 1),
      ]);
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleChangeImage = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('descriptionImage')) {
      const index = parseInt(name.replace('descriptionImage', ''), 10);
      setHealing((prevHealing) => [
        ...prevHealing.slice(0, index),
        { ...prevHealing[index], image: value },
        ...prevHealing.slice(index + 1),
      ]);
    }
  };

  const handleImageUpload = (newImageName, file) => {
    const formData = new FormData();
    const index = healing.findIndex((item) => item.image === newImageName);
  
    if (index !== -1) {
      formData.append('image', file, newImageName); // Use the selected image and its name
      axios
        .patch(`https://eikon-api.onrender.com/imageUpdate/${newImageName}`, formData)
        .then((response) => {
          // Handle the response as needed
          console.log('Image updated successfully.');
            return(alert('your images was update'))
           // Refresh the data after updating the image
        })
        .catch((error) => { 
          console.error('Error uploading image:', error);
        });
    }
    handleGet();
  
  };

  return (
    <div className="container mt-2">
      <div className="" style={{ display: 'block', zIndex: 1 }}>
        <div>
          <label className="mt-5">Title:</label>
          <input
            className="form-control"
            type="text"
            value={data?.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />
        </div>

        {healing && healing.map((item, index) => {
          return (
            <div className="form-group" key={index}>
              <label>{item.title}:</label>
              <div className='d-flex justify-content-around'>
                <img src={`https://eikon-api.onrender.com/imageUploads/${item.image}`} width="100px" alt={item.title} />
                <div>
                  <label>Image Name:</label>
                  <input
                    className="form-control"
                    value={item.image}
                    name={`descriptionImage${index}`}
                    onChange={(e) => handleChangeImage(e)}
                  />
                  <input type="file"  onChange={(e) => handleImageUpload(item.image, e.target.files[0])} />
                  
                </div>
                <div>
                  <label>Count:</label>
                  <input
                    className="form-control"
                    value={item.count}
                    name={`descriptionSub${index}`}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <div className="row justify-content-end">
          <button className="btn btn-primary m-1" onClick={handleGet}>
            Get
          </button>
          <button className="btn btn-success m-1" onClick={openConfirmationModal}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default HealingTouch;
