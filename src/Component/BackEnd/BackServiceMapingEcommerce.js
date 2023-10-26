import React, { useState, useEffect } from "react";
import axios from "axios";

function BackServiceMapingEcommerce({ setModalState }) {
  const [responseData, setResponseData] = useState(null);
  const [mapdata, setMapData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionSub1, setDescriptionSub1] = useState("");
  const [descriptionSub2, setDescriptionSub2] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [imageNames, setImageNames] = useState([]);
  const [images, setImages] = useState([]);

  const imgurlLink = `https://eikon-api.onrender.com/imageUploads/${imgurl}`;

  const fetchImageNames = () => {
    axios
      .get("https://eikon-api.onrender.com/api/imageNames")
      .then((response) => {
        setImageNames(response.data);
        setImages(
          response.data.map(
            (imageName) =>
              `https://eikon-api.onrender.com/imageUploads/${imageName}`
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `https://eikon-api.onrender.com/mapingEcommerce/650d7d0f12bb6287eb8740b1`
      );
      const data = response.data;
      setResponseData(data);
      setMapData(data?.MapingEcommerce.section2);
      setTitle(data.MapingEcommerce.title);
      setDescription(data.MapingEcommerce.description);
      setSubTitle(data.MapingEcommerce.section1.title);
      setDescriptionSub1(data.MapingEcommerce.section2[0].description1);
      setDescriptionSub2(data.MapingEcommerce.section2[0].description2);
      setImgurl(data.MapingEcommerce.section2[0].Image);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const openConfirmationModal = async () => {
    setModalState((prevState) => ({
      ...prevState,
      showModal: true,
      handleUpdate: handleUpdate, // Add this line
    }));
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        title,
        description,
        section1: {
          title: subTitle,
        },
        section2: mapdata,
      };

      const response = await axios.patch(
        `https://eikon-api.onrender.com/mapingEcommerce/650d7d0f12bb6287eb8740b1`,
        {
          MapingEcommerce: updatedData,
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

  // Function to add new data
  const addNewData = () => {
    const newData = {
      description1: "",
      description2: "",
      Image: "", // You can initialize with an empty string or a default image URL
    };

    setMapData([...mapdata, newData]);
  };

  // Function to delete data
  const deleteData = (indexToDelete) => {
    const updatedMapData = [...mapdata];
    updatedMapData.splice(indexToDelete, 1);
    setMapData(updatedMapData);
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="container">
      <div className="mt-5">
        <label>Title:</label>
        <input
          className="form-control"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <div>
        <label>SubTitle:</label>
        <textarea
          className="form-control"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </div>

      <div className=" mt-5">
        {mapdata.map((item, index) => {
          const handleDescriptionSub1Change = (e) => {
            const updatedMapData = [...mapdata];
            updatedMapData[index].description1 = e.target.value;
            setMapData(updatedMapData);
          };

          const handleDescriptionSub2Change = (e) => {
            const updatedMapData = [...mapdata];
            updatedMapData[index].description2 = e.target.value;
            setMapData(updatedMapData);
          };

          return (
            <div className="row" key={index}>
              <div className="">
                <img className=" " src={imgurlLink} height={"300px"} />
                <div className="d-flex justify-content-center  ">
                  <button
                    className="btn bg-success"
                    onClick={() => fetchImageNames(index)}
                  >
                    Change
                  </button>
                  {mapdata.length > 1 && (
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(index)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <div className="col-md-8">
                <div className="form-group">
                  <label>descriptionSub1:</label>
                  <textarea
                    className="form-control"
                    value={item.description1}
                    onChange={handleDescriptionSub1Change}
                  />
                </div>
                <div>
                  <label>descriptionSub2:</label>
                  <textarea
                    className="form-control"
                    value={item.description2}
                    onChange={handleDescriptionSub2Change}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row justify-content-end">
      <button className="btn btn-primary m-1" onClick={addNewData}>
          Add New Data
        </button>
      
        <button className="btn btn-success m-1" onClick={openConfirmationModal}>
          Update
        </button>
        
      </div>
    </div>
  );
}

export default BackServiceMapingEcommerce;
