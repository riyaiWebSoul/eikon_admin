import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile({ setModalState }) {
  const [mapdata, setMapData] = useState([]);
  const [email, setEmail] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [password, setPassword] = useState("");
const[newImageName,setNewImageName]=useState('')
  const [profilePic, setProfilePic] = useState([]);

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `https://eikon-api.onrender.com/loginId/651bcc3e0bbb61b10b8f865d`
      );
      const data = response.data;
      setMapData(response.data);
      setEmail(data?.email);
      setPassword(data.password);
      setProfilePic(data.image);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  
  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('image', newImage, profilePic); // Use the current image name
  
    axios.patch(`https://eikon-api.onrender.com/imageUpdate/${profilePic}`, formData)
      .then(response => {
        setProfilePic(response.data.FormData); // Set the new image name to state
      })
      
      .catch(error => {
        console.error('Error uploading image:', error);
      });
      handleGet();
  }
  
  

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
        email,
        password,
        image: profilePic,
      };

      const response = await axios.patch(
        `https://eikon-api.onrender.com/loginId/651bcc3e0bbb61b10b8f865d`,
        {
          email: email,
          password: password,
          image: profilePic,
        }
      );

      setModalState((prevState) => ({
        ...prevState,
        showModal: false,
      }));
      handleGet();
    } catch (error) {
      console.error("Error making PATCH request:", error);
    }
  };



  useEffect(() => {
    handleGet();
    
  }, []);

  return (
    <div className="container">
      <div className="mt-5">
        <label>Email:</label>
        <input
          className="form-control"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <textarea
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Profile Image:</label>
        <textarea
          className="form-control"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <input type="file" onChange={e => setNewImage(e.target.files[0])} />
        <button onClick={handleImageUpload}> Update Image</button>
      </div>
<button onClick={handleGet}>Get</button>
      <div className="row justify-content-end">
        <button className="btn btn-success m-1" onClick={openConfirmationModal}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Profile;
