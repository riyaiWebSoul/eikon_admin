import React, { useState ,useEffect} from 'react';
import axios from 'axios';



function BackServiceMedical({setModalState}) {

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
      const response = await axios.get(`https://eikon-api.onrender.com/medical/650d8a004a0a2ffd8152e4d3  `); // Include the ID in the URL
      const data = response.data;
      setResponseData(data);
      setTitle(data.MedicalPage.title); // Set the title in the input field
      setDescription(data.MedicalPage.description)
      setSubTitle(data.MedicalPage.section1.title)
      setDescriptionSub1(data.MedicalPage.section2.description)
      setDescriptionSub2(data.MedicalPage.section2.subDescription)
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

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`https://eikon-api.onrender.com/medical/650d8a004a0a2ffd8152e4d3`, {
        MedicalPage: {
          title:title,
          description:description,
          section1: {
            title:subTitle
          },
          section2: {
          description: descriptionSub1,
            subDescription:descriptionSub2 
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
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        
         
        </div>
        <div className="row justify-content-end">
          <button className="btn btn-primary m-1 " onClick={handleGet}>Get</button>
          <button className="btn btn-success m-1" onClick={openConfirmationModal}>Update</button>
        </div>
    </div>
  );
}

export default BackServiceMedical;
