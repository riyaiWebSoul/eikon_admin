import React, { useState ,useEffect} from 'react';
import axios from 'axios';



function BackServiceMapingEcommerce({setModalState}) {

  const [responseData, setResponseData] = useState(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle,setSubTitle]=useState('');
  const [description, setDescription] = useState('');
  const[descriptionSub1,setDescriptionSub1]=useState('')
  const[descriptionSub2,setDescriptionSub2]=useState('')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);


  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/mapingEcommerce/650d7d0f12bb6287eb8740b1`); // Include the ID in the URL
      const data = response.data;
      setResponseData(data);
      setTitle(data.MapingEcommerce.title); // Set the title in the input field
      setDescription(data.MapingEcommerce.description)
      setSubTitle(data.MapingEcommerce.section1.title)
      setDescriptionSub1(data.MapingEcommerce.section2.description1)
      setDescriptionSub2(data.MapingEcommerce.section2.description2)   
    } catch (error) {
      console.error('Error making GET request:', error)
    }
  };
  const openConfirmationModal = async () => {
    setModalState(prevState => ({
      ...prevState,
      showModal: true,
      handleUpdate
    }))
  }
  
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`https://eikon-api.onrender.com/mapingEcommerce/650d7d0f12bb6287eb8740b1`, {
        MapingEcommerce: {
          title:title,
          description:description,
          section1: {
            title:subTitle
          },
          section2:{
          description1: descriptionSub1,
          description2:descriptionSub2 
          }
        }
       
      });
      setResponseData(response.data);
      setModalState(prevState => ({
        ...prevState,
        showModal: false,
      }))
    } catch (error) {
      console.error('Error making PATCH request:', error);
   
    }
  };
useEffect(()=>{
  handleGet()
},[])
  return (
    <div className='container'>
          <div className="mt-5" >
            <label >Title:</label>
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
          <div className="form-group">
            <label>descriptionSub1:</label>
            <textarea className="form-control"
              value={descriptionSub1}
              onChange={(e) => setDescriptionSub1(e.target.value)}
            />
          </div>
          <div>
            <label>descriptionSub2:</label>
            <textarea className="form-control"
              value={descriptionSub2}
              onChange={(e) => setDescriptionSub2(e.target.value)}
            />
          </div>
        
      <div className="row justify-content-end">
          <button className="btn btn-primary m-1 " onClick={handleGet}>Get</button>
          <button className="btn btn-success m-1" onClick={openConfirmationModal}>Update</button>
        </div>
        </div>
  
   
  );
}

export default BackServiceMapingEcommerce;
