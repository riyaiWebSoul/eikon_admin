import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [imageNames, setImageNames] = useState([]);
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Added state for selected image
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const fetchImageNames = () => {
    axios.get('https://eikon-api.onrender.com/api/imageNames')
      .then(response => {
        setImageNames(response.data);
        // Set the images state correctly
        setImages(response.data.map(imageName => `https://eikon-api.onrender.com/imageUploads/${imageName}`));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchImageNames();
  }, []);

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('image', newImage);

    axios.post('https://eikon-api.onrender.com/imageUploads',formData)
      .then(response => {
        // Handle success, e.g., show a success message and update the image list
        fetchImageNames();
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  }

  const handleImageDelete = (imageName) => {
    setSelectedImage(imageName); // Set selectedImage before showing the modal

    setShowOptionsModal(true); // Show the modal
  }

  const   confirmDeleteImage = () => {
    if (selectedImage) {
      const deleteUrl = `https://eikon-api.onrender.com/api/deleteImage/${selectedImage}`;
      console.log('Delete URL:', deleteUrl);
  
      axios.delete(deleteUrl)
        .then(response => {
          console.log('Image deleted successfully:', selectedImage);
          // Handle success, e.g., show a success message and update the image list
          fetchImageNames();
          setShowOptionsModal(false); // Close the options modal after deletion
        })
        .catch(error => {
          console.error('Error deleting image:', error);
        });
    }
  }

  return (
    <div className='container'>
      <h4 className='my-5 text-center'>Image's on Server</h4>
      <div className='my-5  '>
     <div className='row justify-content-end'>
      <input type="file" onChange={e => setNewImage(e.target.files[0])} /></div> 
     <div className='row justify-content-end'>
      <button class="btn btn-success m-1  " onClick={handleImageUpload}>Upload Image</button></div>
      </div>
    
      <div className="">
        <div className="row">
        {imageNames.map((imageName, index) => (
          <div key={index} className="col-md-3 my-2">
            <div className="card" style={{"width": "12rem"}}>
              <img
                src={images[index]}  style={{"height": "10rem"}}
                alt={`Image ${index + 1}`}
                className="card-img-top img-fluid"
              />
              <div className="card-body text-center ">
                <h5 className="card-title">Image {index + 1}</h5>
                <p className="card-text">{imageName}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(imageName);
                    alert('Image name copied to clipboard');
                  }}
                  className="btn btn-primary my-2"
                >
                 Copy Name
                </button>
                <button  className="btn btn-danger mx-2" onClick={() => handleImageDelete(imageName)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        </div>
       
      </div>
      {showOptionsModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog" style={{ margin: 'auto' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you Sure to delete Image</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowOptionsModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Image Name     :-  {selectedImage}</p>
                <button onClick={confirmDeleteImage} className="btn btn-danger mx-2">Delete Image</button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedImage);
                    alert('Image name copied to clipboard');
                  }}
                  className="btn btn-primary"
                >
                  Copy Image Name
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
