import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { components } from "./Components";
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";
const BackendDashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const [iconImages, setIconImages] = useState();
  const[adminName,setAdminName]=useState('');

  const handleGet = async () => {
    try {
      const response = await axios.get(
        "https://eikon-api.onrender.com/loginId/651bcc3e0bbb61b10b8f865d"
      );
      setAdminName(response.data.email)
      setIconImages(response.data.image);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };




  const setIntialStateModal = () =>
    setModalState((prevState) => ({ ...prevState, showModal: false }));
  const [modalState, setModalState] = useState({
    showModal: false,
    handleUpdate: () => {},
    setShowConfirmationModal: setIntialStateModal,
  });

  useEffect(() => {
    handleGet()
    setActiveContent(components[0]);
    
  }, []);

  useEffect(() => {
    const checkAdminLoginStatus = () => {
      const isAdminLoggedIn = true;
      setIsAdminLoggedIn(isAdminLoggedIn);
    };
    handleGet()
    checkAdminLoginStatus();
  }, [location]);

  const handleContentSelect = (contentName) => {
    setActiveContent(contentName);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };
 
  return (
    <div className="">
      {isAdminLoggedIn ? (
        <div className="" style={{ overflow: "hidden" }}>
          <div className="row" style={{"height": "100vh","overflow": "auto"}}>
            <div className="bg-secondary    col-md-4 col-lg-2 col-sm-12" > 
              <div className="m-3  border-bottom   border-5 border-light">
                <div className="user-panel text-light text-center">
                  <div className="thumb  ">
                  <button className="btn bg-dark text-light p-0">
                    <img  class="img-circle" src={`https://eikon-api.onrender.com/imageUploads/${iconImages}`} width={"100px"}  alt="Profile"/> </button>  
                  </div>       
                    <p className="">{adminName}</p>
                   
                  <div class="clearfix"></div>
                </div>
              </div>
              {components &&
                components.map((item) => {
                  return (
                    <ul className="  p-1 ml-2 ">
                      <li
                        className={`btn ${
                          item.name === activeContent?.name
                            ? "text-dark text-light bg-light m-0 text-center "
                            : "text-light  m-0 text-center "
                        }`} 
                        key={item.name}
                        onClick={() => handleContentSelect(item)}
                        style={{ "text-align": "inherit" ,"width": "-webkit-fill-available"}}
                      >
                        {item.name}
                      </li>
                    </ul>
                  );
                })}
            </div>
            <div className="col-md-8 col-lg-10 col-sm-12 ">
              <div className="row m-2 ">
                <div className="col-lg-12 d-flex justify-content-end">
                  <button
                    className="btn btn-danger text-end "
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
                <div className="col-lg-12 col-md-10 col-sm-10 col-xs-6">
                  <h1 className="text-center ">Eikon Admin Panel </h1>
                </div>
              </div>
              <div>
                {" "}
                <activeContent.component setModalState={setModalState} />{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Please log in as an admin to access the dashboard.</p>
      )}
      {modalState.showModal && <ConfirmationModal {...modalState} />}
    </div>
  );
};

export default BackendDashboard;
