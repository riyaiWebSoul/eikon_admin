import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HealingTouch({ setModalState }) {
  const [data, setData] = useState({});
  const [healing, setHealing] = useState([]); // Initialize healing state with an empty array

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

        {healing && healing.map((item, index) => (
          <div className="form-group" key={index}>
            <label>{item.title}:</label>
            <textarea
              className="form-control"
              value={item.count}
              name={`descriptionSub${index}`}
              onChange={(e) => handleChange(e)}
            />
          </div>
        ))}
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
