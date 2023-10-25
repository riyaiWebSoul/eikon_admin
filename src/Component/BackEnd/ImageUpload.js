import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [imageNames, setImageNames] = useState([]);
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const fetchImageNames = () => {
    axios.get('https://eikon-api.onrender.com/api/imageNames')
      .then(response => {
        setImageNames(response.data);
        setImages('https://eikon-api.onrender.com/imageUploads/')
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

    axios.post('https://eikon-api.onrender.com/imageUploads', formData)
      .then(response => {
        // Handle success, e.g., show a success message and update the image list
        fetchImageNames();
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  }

  const handleImageDelete = (selectedImage) => {
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
    <div>
      <h1>Image Names</h1>
      <input type="file" onChange={e => setNewImage(e.target.files[0])} />
      <button onClick={handleImageUpload}>Upload Image</button>
      <div className="row">
        {imageNames.map((imageName, index) => (
          <div key={index} className="col-md-3 my-2">
            <div className="card">
              <img
                src={images + imageName}
                alt={`Image ${index + 1}`}
                className="card-img-top img-fluid"
              />
              <div className="card-body">
                <h5 className="card-title">Image {index + 1}</h5>
                <p className="card-text">{imageName}</p>
                <button onClick={() => handleImageDelete(imageName)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showOptionsModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog" style={{ margin: 'auto' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Image Options</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowOptionsModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{selectedImage}</p>
                <button onClick={handleImageDelete} className="btn btn-danger">Delete Image</button>
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
