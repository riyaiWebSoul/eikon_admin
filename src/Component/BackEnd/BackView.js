import React, { useState, useEffect } from 'react';
import axios from 'axios';


function BackView({setModalState}) {

  const [responseData, setResponseData] = useState([]);
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');


  const openConfirmationModal = async () => {
    setModalState(prevState => ({
      ...prevState,
      showModal: true,
      handleUpdate
    }))
  }
  useEffect(() => {
    handleGet();
  }, []);




  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/enquiry`);
      const data = response.data;
      setResponseData(data);
    } catch (error) {
      console.error('Error making GET request:', error);
    }
  };
  const handleUpdate = async (index) => {
    try {
       handleGet()
      const updatedData = [...responseData];
      const checkId = updatedData[index]._id;
      const checkIdString = checkId.toString();
     
      const response = await axios.delete(`https://eikon-api.onrender.com/enquiry/${checkIdString}`);
      if (response.status === 200) {
       
        updatedData.splice(index, 1);
        setResponseData(updatedData);
       
      }
      handleGet()
    } catch (error) {
      console.error('Error making DELETE request:', error);
    }
  };
 

  // const handleUpdate = async () => {
  //   try {
  //     const updatedData = [...responseData];
  //     const index = updatedData.findIndex((entry) => entry._id === id);

  //     if (index !== -1) {
  //       updatedData[index] = {
  //         _id: id,
  //         name: userName,
  //         email: email,
  //         phone: phone,
  //         comments: comments,
  //         time: time,
  //         date: date,
  //         gender: gender,
  //       };

  //       setResponseData(updatedData);
  //       handleGet()
  //     }
  //   } catch (error) {
  //     console.error('Error making PATCH request:', error);
  //   }
  // };

  return (
    <div className="container">

        <div>
      
          <table className="table mt-5">
            <thead>
              <tr>
                <th className='text-center'>Serial Number</th>
                <th className='text-center'>Name</th>
                <th className='text-center'>Email</th>
                <th className='text-center'>Phone</th>
            
                <th className='text-center'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((entry, index) => (
                <tr key={index}>
    
                  <td className='text-center'>{index + 1}</td>
                  <td className='text-center'>{entry.name}</td>
                  <td className='text-center'>{entry.email}</td>
                  <td className='text-center'>{entry.phone}</td>
             
                
                  <td className='text-center'>
                    <button className="btn btn-danger text-center" onClick={() => handleUpdate(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
    </div>
  );
}

export default BackView;
