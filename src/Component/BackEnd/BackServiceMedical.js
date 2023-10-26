import React, { useState ,useEffect} from 'react';
import axios from 'axios';



function BackServiceMedical({setModalState}) {
  const [title, setTitle] = useState('');
  const [mapdata, setMapData] = useState([]);
  const [subTitle,setSubTitle]=useState('');
  const [description, setDescription] = useState('');
 
  const [imageNames, setImageNames] = useState([]);
  const [images, setImages] = useState([]);

  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/medical/650d8a004a0a2ffd8152e4d3  `); // Include the ID in the URL
      const data = response.data;
      setMapData(data?.MedicalPage.section2);
      setTitle(data.MedicalPage.title); // Set the title in the input field
      setDescription(data.MedicalPage.description)
      setSubTitle(data.MedicalPage.section1.title)
      
      // Set the description in the input field
      
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };
  const openConfirmationModal = async () => {
    setModalState(prevState => ({
      ...prevState,
      showModal: true,
      handleUpdate
    }))
  }
  
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
  
  
  const addNewData = () => {
    const newData = {
      description1: "",
      description2: "",
      Image: ""
    };

    setMapData([...mapdata, newData]);
  };
  const handleUpdate = async () => {
    try {


      const updatedData = { title,
        description,
        section1: {
          title:subTitle
        },
        section2:mapdata
      };
      const response = await axios.patch(`https://eikon-api.onrender.com/medical/650d8a004a0a2ffd8152e4d3`, 
      { MedicalPage: updatedData}
       
      );
     
      setModalState(prevState => ({
        ...prevState,
        showModal: false,
      }))
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors here.
    }
  };
  useEffect(()=>{
    handleGet()
  },[])
 
  return (
    <div className='container'>
   
        <div>
         
          <div>
            <label className="mt-5">Title:</label>
            <input className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>SubTitle:</label>
            <textarea className="form-control"
              value={subTitle}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className=" mt-5">
        {mapdata.map((item, index) => {
          const handleDescriptionSub1Change = (e) => {
            const updatedMapData = [...mapdata];
            updatedMapData[index].description = e.target.value;
            setMapData(updatedMapData);
          };

          const handleDescriptionSub2Change = (e) => {
            const updatedMapData = [...mapdata];
            updatedMapData[index].subDescription = e.target.value;
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
              <div className="col-md-6">
                <img className=" " src={`https://eikon-api.onrender.com/imageUploads/${item.Image}`} height={"300px"} />
                <div className="d-flex justify-content-start ">
               
                  <button
                    class="btn btn-info m-1  "
                    onClick={fetchImageNames}
                  >
                   Select the Image
                  </button>

                  {mapdata.length > 1 && (
                    <button
                      className="btn btn-danger  m-1 "
                      onClick={() => deleteData(index)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>descriptionSub1:</label>
                  <textarea
                    className="form-control"
                    value={item.description}
                    onChange={handleDescriptionSub1Change}
                  />
                </div>
                <div>
                  <label>descriptionSub2:</label>
                  <textarea
                    className="form-control"
                    value={item.subDescription}
                    onChange={handleDescriptionSub2Change}
                  />
                </div>
                <div>
                  <label>Image name:</label>
                  <textarea
                    className="form-control"
                    value={item.Image}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
        
         
        </div>
        <div className="row justify-content-end">
          <button className="btn btn-primary m-1 " onClick={handleGet}>Get Back</button>
          <button className="btn btn-primary m-1" onClick={addNewData}>
          Add New Data
        </button>

          <button className="btn btn-success m-1" onClick={openConfirmationModal}>Update</button>
        </div>
        <div className="row">
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
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(imageName);
                    alert('Image name copied to clipboard');
                  }}
                  className="btn btn-primary"
                >
                 copy Name
                </button>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BackServiceMedical;
