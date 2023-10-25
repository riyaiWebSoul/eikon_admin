import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function BackContact({setModalState}) {
  const [responseData, setResponseData] = useState(null);
  const [data, setData] = useState({})
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [drTeamList, setDrTeamList] = useState([]);
  const[descriptionSub1,setDescriptionSub1]=useState('')
  const[descriptionSub2,setDescriptionSub2]=useState('')
  const[descriptionSub3,setDescriptionSub3]=useState('')

  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/contact/65320d3e25939ccdd3bed486`); // Include the ID in the URL
      const data = response.data;
      setData(responseData)
      setResponseData(data);
      setTitle(data.title); // Set the title in the input field
      setDescription(data.description)
      setDescriptionSub1(data.descriptionSub1)
      setDescriptionSub2(data.descriptionSub2)
      setDescriptionSub3(data.descriptionSub3); // Set the description in the input field
      ; // Set the description in the input field
      setDrTeamList(data.DrTeamList); // Set the DrTeamList
     
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };


  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`https://eikon-api.onrender.com/contact/65320d3e25939ccdd3bed486`, {
        title: title,
        description: description,
        DrTeamList: drTeamList, // Include any other fields you want to update
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
  const openConfirmationModal = async () => {
    setModalState(prevState => ({
      ...prevState,
      showModal: true,
      handleUpdate
    }))
  }
useEffect(()=>{handleGet()},[])
  return (
    <div className='container'>
      {responseData && (
        <div>
          <h3>Edit Data:</h3>
          <div>
            <label>Title:</label>
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
        </div>
      )}
        <div className="row justify-content-end">
          <button className="btn btn-primary m-1 " onClick={handleGet}>Get</button>
          <button className="btn btn-success m-1" onClick={openConfirmationModal}>Update</button>
        </div>
     
    </div>
  );
}

export default BackContact;
