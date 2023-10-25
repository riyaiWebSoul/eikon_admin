import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function BackAbout({setModalState}) {
  const [data, setData] = useState({})

  const handlePost = async () => {
    // ... (unchanged)
  }

  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/about/65167a7585c32c09813f3561`) // Include the ID in the URL
      setData(response.data) // Set the title in the input field
    } catch (error) {
      console.error('Error making GET request:', error)
      // Handle errors here.
    }
  }

  const handleDelete = async () => {
    // ... (unchanged)
  }


  const handlePut = async () => {
    // ... (unchanged)
  }

  const openConfirmationModal = async () => {
    setModalState(prevState => ({
      ...prevState,
      showModal: true,
      handleUpdate
    }))
  }
  
  const handleUpdate = async () => {
    try {
        await axios.patch(`https://eikon-api.onrender.com/about/65167a7585c32c09813f3561`, {
        title: data?.title,
        description: data?.description,
        SubTile: data?.SubTile,
        descriptionSub0: data?.descriptionSub0,
        descriptionSub1: data?.descriptionSub1,
        descriptionSub2: data?.descriptionSub2,
        descriptionSub3: data?.descriptionSub3

        // Include any other fields you want to update
      })

      setModalState(prevState => ({
        ...prevState,
        showModal: false,
      }))
    } catch (error) {
      console.error('Error making PATCH request:', error)
      // Handle errors here.
    }
  }

  useEffect(() => {
    handleGet()
  }, [])

  const handleChange = (e) => setData(prevState => ({...prevState, [e.target.name]:e.target.value }))

  return (
    <div className='container mt-2'>
      {/* <h2 className=' p-5 text-center'> About Us </h2> */}
      <div className='' style={{ display: 'block', zIndex: 1 }}>
        {/* <h3>Edit Data:</h3> */}
        <div>
          <label>Title:</label>
          <input className="form-control"
            type="text"
            value={data?.title}
            name='title'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea className="form-control"
            value={data?.description}
            name='description'
            onChange={(e) => handleChange(e)}           
          />
        </div>
        <div className="form-group">
          <label>Subtitle:</label>
          <textarea className="form-control"
            value={data?.SubTile}
            name='SubTile'
            onChange={(e) => handleChange(e)}           
          />
        </div>
        <div className="form-group">
          <label>DescriptionSub:</label>
          <textarea className="form-control"
            value={data?.descriptionSub0}
            name='descriptionSub0'
                        onChange={(e) => handleChange(e)}           
          />
        </div>
        <div className="form-group">
          <label>DescriptionSub1:</label>
          <textarea className="form-control"
            value={data?.descriptionSub1}
            onChange={(e) => handleChange(e)}           

          />
        </div>
        <div>
          <label>DescriptionSub2:</label>
          <textarea className="form-control"
            value={data?.descriptionSub2}
            name='descriptionSub2'
            onChange={(e) => handleChange(e)}           

          />
        </div>
        <div>
          <label>DescriptionSub3:</label>
          <textarea className="form-control"
            value={data?.descriptionSub3}
            name='descriptionSub3'
            onChange={(e) => handleChange(e)}           

          />
        </div>

      </div>
      <div>
        <div className="row justify-content-end">
          <button className="btn btn-primary m-1 " onClick={handleGet}>Get</button>
          <button className="btn btn-success m-1" onClick={openConfirmationModal}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default BackAbout
