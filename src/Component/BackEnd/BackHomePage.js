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
  const [imageNames,setImageNames]=useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const handleGet = async () => {
    try {
      const response = await axios.get(
        "https://eikon-api.onrender.com/home/650d4595f2c62afdc75b54ba"
      );
      const data = response.data;
      console.log(data);
      setResponseData(data);
      setTitle(data.section.title);
      setDescription(data.section.description);
      setHeading(data.section.heading);
      setImageNames(data.section.imageSrc[0])
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const handleGetImagesList = async () => {
    try {
      const imagesListResponse = await axios.get(
        "https://eikon-api.onrender.com/imageUpload"
      );
      const list = imagesListResponse.data;
      console.log(list);

      setImageList(list.images);
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

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        "https://eikon-api.onrender.com/home/650d4595f2c62afdc75b54ba",
        {
          section: {
            imageSrc: selectedImageName,
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
  const handleImageClick = (imageName) => {
    setSelectedImageName(imageName);
    if (selectedImage) {
      selectedImage.classList.remove("selected-image");
    }
    const newSelectedImage = document.querySelector(
      `[data-image-name="${imageName}"]`
    );
    if (newSelectedImage) {
      newSelectedImage.classList.add("selected-image");
      setSelectedImage(newSelectedImage);
    }
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="btn-group">
            <button className="btn btn-primary m-1" onClick={handleGet}>
              GET
            </button>
            <button
              className="btn btn-primary m-1"
              onClick={handleGetImagesList}
            >
              GET Images List
            </button>
            <button
              className="btn btn-success m-1"
              onClick={openConfirmationModal}
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="z-0" style={{ display: "block", zIndex: 1 }}>
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
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image Name:</label>
          <input
            className="form-control"
            value={selectedImageName || imageNames}
            onChange={(e) => setSelectedImageName(e.target.value)}
          />
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Image</button>
        </div>

        <div className="form-group">
          <label>Heading:</label>
          <textarea
            className="form-control"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Images:</label>
                <div className="row">
                  {/* Display the list of images */}
                  {imageList.map((item, index) => (
                    <div key={index} className="col-12 col-md-2 ">
                      <div
                        className="card mb-2 imageListStyle"
                        onClick={() => handleImageClick(item)}
                        data-image-name={item} // Add data-image-name attribute
                      >
                        <img
                          src={`https://eikon-api.onrender.com/imageUploads${item}`}
                          alt={`${index}`}
                          className="card-img-top "
                        />
                        <div className="card-body">
                          {/* Add your content here */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackHomePage;
