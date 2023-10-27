import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Portfolio({ setModalState }) {
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState('');

  const handleGet = async () => {
    try {
      const response = await axios.get('https://eikon-api.onrender.com/portfolio/653b54e7e507da41183ec74d');
      setVideos(response.data.videos);
      setImages(response.data.images);
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch('https://eikon-api.onrender.com/portfolio/653b54e7e507da41183ec74d', {
        images: images,
        videos: videos
      });

      setModalState((prevState) => ({
        ...prevState,
        showModal: false,
      }));
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors here.
    }
  };

  const addImage = () => {
    if (newImage) {
      setImages([...images, newImage]);
      setNewImage('');
    }
  };

  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="container mt-2">
         <div className='row justify-content-end '>
            <div className='col-lg-3'>
            <input
          type="text" className='form-control'
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          placeholder="Enter a new image URL"
        />
            </div>
      
        <div className='d-flex '>
  <button className='btn bg-info  mx-2 ' onClick={addImage}>Add Image</button>
        <button  className='btn bg-success text-light' onClick={handleUpdate}>Save Changes</button>
        </div>
      
      </div>
      <div className='row text-center'>
        {images.map((item, index) => (
          <div className='' key={index}>
            <img className="m-2" src={`https://eikon-api.onrender.com/imageUploads/${item}`} height="150px" />
            <p className='text-center'>{item}</p>
            <button className='btn bg-danger  text-light' onClick={() => deleteImage(index)}>Delete</button>
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default Portfolio;
