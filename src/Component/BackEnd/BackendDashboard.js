import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { components } from './Components'
import ConfirmationModal from './ConfirmationModal'

const BackendDashboard = ({setIsAuthenticated}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [activeContent, setActiveContent] = useState(null)
  const setIntialStateModal = () => setModalState(prevState => ({...prevState, showModal: false }))
  const [modalState, setModalState] = useState({
    showModal: false,
    handleUpdate: ()=>{},
    setShowConfirmationModal:setIntialStateModal,
  })

  useEffect(() => {
    setActiveContent(components[0])
  }, [])

  useEffect(() => {
    // You should have a function or mechanism to check if admin is logged in.
    // For this example, I'm using a simple flag.
    const checkAdminLoginStatus = () => {
      // You can implement your own logic here to check if the admin is logged in.
      // For now, I'm using a flag to simulate the logged-in status.
      const isAdminLoggedIn = true // Replace with your actual authentication check
      setIsAdminLoggedIn(isAdminLoggedIn)
    }

    checkAdminLoginStatus()
  }, [location])

  // Function to handle content selection
  const handleContentSelect = (contentName) => {
    setActiveContent(contentName)
  }

  const handleLogout = () => {
    // Implement your logout logic here
    // For now, just navigate to "/backHome" as an example
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <div className='' >
      <div className='d-flex justify-content-between m-2'>
        <div>
          <h3 className='text-center '>Welcome to Eikon BackEnd </h3>
        </div>
        <div>
          <button className='btn btn-danger' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {isAdminLoggedIn ? (
        <div className='' style={{'overflow':'hidden'}}>
 <div className='row'>
          <div className='bg-secondary  p-3 col-md-4 col-lg-2 col-sm-12' 
    >
            {components &&
              components.map((item) => {
                return(
                  <ul className='  ' >
 <li className={`btn ${item.name === activeContent?.name ? 'text-dark bg-light text-center' : 'text-light'}`} key={item.name} onClick={() => handleContentSelect(item)} style={{"text-align": "inherit"}}>
                  {item.name}
                </li>
                  </ul>
                 
                )
                
                })}
          </div>

          <div className='col-md-8 col-lg-10 col-sm-12'> <activeContent.component setModalState={setModalState}/> </div>
        </div>
        </div>
       
      ) : (
        <p>Please log in as an admin to access the dashboard.</p>
      )}
      {modalState.showModal && <ConfirmationModal {...modalState}/>}
    </div>
  )
}

export default BackendDashboard
