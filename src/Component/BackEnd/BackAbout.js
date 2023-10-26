import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BackAbout({ setModalState }) {
  const [data, setData] = useState({});
  const [mapdata, setMapData] = useState([]);
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  const handleGet = async () => {
    try {
      const response = await axios.get('https://eikon-api.onrender.com/about/65167a7585c32c09813f3561');
      setData(response.data);
      setMapData(response.data.mainContant);
     
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };

  const openConfirmationModal = async () => {
    setModalState((prevState) => ({
      ...prevState,
      showModal: true,
      handleUpdate,
    }));
  };

  const fetchImageNames = () => {
    axios
      .get('https://eikon-api.onrender.com/api/imageNames')
      .then((response) => {
        setImageNames(response.data);
        setImages(
          response.data.map((imageName) => `https://eikon-api.onrender.com/imageUploads/${imageName}`)
        );
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleUpdate = async () => {
    try {
     

      await axios.patch('https://eikon-api.onrender.com/about/65167a7585c32c09813f3561', 
        {
          title: data.title,
          description: data.description,
          mainContant:mapdata, // Updated to use the mapdata state directly
        }
      );

      setModalState((prevState) => ({
        ...prevState,
        showModal: false,
      }));
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors here.
    }
  };

  const addNewData = () => {
    const newData = {
      SubTile: '',
      descriptionSub0: '',
      descriptionSub1: '',
      descriptionSub2: '',
      descriptionSub3: '',
      Image: '',
    };
    setMapData([...mapdata, newData]);
  };

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    handleGet()
  }, []);
console.log(mapdata)
  return (
    <div className="container mt-2">
      <div style={{ display: 'block', zIndex: 1 }}>
      <div>
        <label className="mt-5">Title:</label>
        <input
          className="form-control"
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          className="form-control"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>
        <div className="mt-5">
          {mapdata.map((item, index) => {
            const handleDescriptionSubChange = (e) => {
              const updatedMapData = [...mapdata];
              updatedMapData[index].SubTile = e.target.value;
              setMapData(updatedMapData);
            };

            const handleDescriptionSub0Change = (e) => {
              const updatedMapData = [...mapdata];
              updatedMapData[index].descriptionSub0 = e.target.value;
              setMapData(updatedMapData);
            };

            const handleDescriptionSub1Change = (e) => {
              const updatedMapData = [...mapdata];
              updatedMapData[index].descriptionSub1 = e.target.value;
              setMapData(updatedMapData);
            };

            const handleDescriptionSub2Change = (e) => {
              const updatedMapData = [...mapdata];
              updatedMapData[index].descriptionSub2 = e.target.value;
              setMapData(updatedMapData);
            };

            const handleDescriptionSub3Change = (e) => {
              const updatedMapData = [...mapdata];
              updatedMapData[index].descriptionSub3 = e.target.value;
              setMapData(updatedMapData);
            };

            const handleImageChange = (e) => {
              const updatedMapData = [...mapdata];
              updatedMapData[index].Image = e.target.value;
              setMapData(updatedMapData);
            };

            const deleteData = (indexToDelete) => {
              const updatedMapData = [...mapdata];
              updatedMapData.splice(indexToDelete, 1);
              setMapData(updatedMapData);
            };

            return (
              <div className="row" key={index}>
                <div className="col-md-6 mt-5">
                  <img className="" src={`https://eikon-api.onrender.com/imageUploads/${item.Image}`} height="300px" />
                  <div>
                    <label>Image name:</label>
                    <textarea
                      className="form-control"
                      value={item.Image}
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="d-flex justify-content-start">
                    <button className="btn btn-info m-1" onClick={fetchImageNames}>
                      Select the Image
                    </button>
                    {mapdata.length > 1 && (
                      <button className="btn btn-danger m-1" onClick={() => deleteData(index)}>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-md-6 mt-5">
                  <div className="form-group">
                    <label>SubTitle:</label>
                    <textarea
                      className="form-control"
                      value={item.SubTile}
                      onChange={handleDescriptionSubChange}
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      className="form-control"
                      value={item.descriptionSub0}
                      onChange={handleDescriptionSub0Change}
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      className="form-control"
                      value={item.descriptionSub1}
                      onChange={handleDescriptionSub1Change}
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      className="form-control"
                      value={item.descriptionSub2}
                      onChange={handleDescriptionSub2Change}
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      className="form-control"
                      value={item.descriptionSub3}
                      onChange={handleDescriptionSub3Change}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="row justify-content-end">
          <button className="btn btn-primary m-1" onClick={handleGet}>
            Get back
          </button>
          <button className="btn btn-primary m-1" onClick={addNewData}>
            Add New Data
          </button>
          <button className="btn btn-success m-1" onClick={openConfirmationModal}>
            Update
          </button>
        </div>
      </div>
      <div className="row mt-5">
        {imageNames.map((imageName, index) => (
          <div key={index} className="col-md-3 my-2">
            <div className="card">
              <img
                src={images[index]}
                alt={`Image ${index + 1}`}
                className="card-img-top img-fluid"
              />
              <div className="card-body">
                <h5 className="card-title">Image {index + 1}</h5>
                <p className="card-text">{imageName}</p>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BackAbout;
