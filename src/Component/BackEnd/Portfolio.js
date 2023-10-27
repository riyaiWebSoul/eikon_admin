import React, { useState, useEffect } from "react";
import axios from "axios";

function Portfolio({ setModalState }) {
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [logoImages, setLogoImages] = useState([]);
  const [otherImages, setOtherImages] = useState([]);
  const [iconImages, setIconImages] = useState();

  const [newImage, setNewImage] = useState("");

  const handleGet = async () => {
    try {
      const response = await axios.get(
        "https://eikon-api.onrender.com/portfolio/653b54e7e507da41183ec74d"
      );
      setVideos(response.data.videos);
      setImages(response.data.images);
      setLogoImages(response.data.logos[0].logoImages);
      setOtherImages(response.data.logos[0].otherImages);
      setIconImages(response.data.logos[0].iconImages);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        "https://eikon-api.onrender.com/portfolio/653b54e7e507da41183ec74d",
        {
          images: images,
          videos: videos,
          logos: [
            {
              logoImages: logoImages,
              otherImages: otherImages,
              iconImages: iconImages,
            },
          ],
        }
      );

      setModalState((prevState) => ({
        ...prevState,
        showModal: false,
      }));
      handleGet()
    } catch (error) {
      console.error("Error making PATCH request:", error);
      // Handle errors here.
    }
  };

const addImage = (arrayToUpdate) => {
  if (newImage) {
    switch (arrayToUpdate) {
      case "Home Page Portfolio Images":
        setImages([...images, newImage]);
        break;
      case "Logo Images":
        setLogoImages([...logoImages, newImage]);
        break;
      case "Other Images":
        setOtherImages([...otherImages, newImage]);
        break;
      case "Icon Images":
        setIconImages([...iconImages, newImage]);
        break;
      default:
        // Handle invalid arrayToUpdate value
        break;
    }
    setNewImage("");
  }
};


  const deleteImage = (arrayToUpdate, index) => {
    if (arrayToUpdate === "Home Page Portfolio Images") {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    } else if (arrayToUpdate === "Logo Images") {
      const updatedImages = [...logoImages];
      updatedImages.splice(index, 1);
      setLogoImages(updatedImages);
    } else if (arrayToUpdate === "Other Images") {
      const updatedImages = [...otherImages];
      updatedImages.splice(index, 1);
      setOtherImages(updatedImages);
    } else if (arrayToUpdate === "Icon Images") {
      const updatedImages = [...iconImages];
      updatedImages.splice(index, 1);
      setIconImages(updatedImages);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  const arrayData = [
    { title: "Home Page Portfolio Images", array: images },
    { title: "Logo Images", array: logoImages },
    { title: "Other Images", array: otherImages },
    { title: "Icon Images", array: iconImages },
    { title: "Videos", array: videos },
  ];

  return (
    <div className="container mt-2">
      {arrayData.map((data, index) => {
        return (
          <div className="border border-dark p-2 my-5" key={index}>
            <p className="text-center">{data.title}</p>
            <div className=" d-flex justify-content-end ">
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Enter a new image URL"
                />
              </div>
              <div className="d-flex">
              <button
  className="btn bg-info mx-2"
  onClick={() => addImage(data.title)}
>
  Add Image
</button>

                <button
                  className="btn bg-success text-light"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
            <div className="row  text-center">
              {data.array && data.array.map((item, itemIndex) => (
                <div key={itemIndex} className="">
                  <img
                    className="m-3 "
                    src={`https://eikon-api.onrender.com/imageUploads/${item}`}
                    alt={`Image ${itemIndex}`}
                    width="150px" height="150px"
                  />
                  <p className="text-center m-3 ">{item}</p>
                  <button
                    className="btn bg-danger text-light"
                    onClick={() => deleteImage(data.title, itemIndex)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Portfolio;
