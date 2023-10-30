import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { components } from "./Components";
import ConfirmationModal from "./ConfirmationModal";

const BackendDashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const setIntialStateModal = () =>
    setModalState((prevState) => ({ ...prevState, showModal: false }));
  const [modalState, setModalState] = useState({
    showModal: false,
    handleUpdate: () => {},
    setShowConfirmationModal: setIntialStateModal,
  });

  useEffect(() => {
    setActiveContent(components[0]);
  }, []);

  useEffect(() => {
    const checkAdminLoginStatus = () => {
      const isAdminLoggedIn = true;
      setIsAdminLoggedIn(isAdminLoggedIn);
    };

    checkAdminLoginStatus();
  }, [location]);

  const handleContentSelect = (contentName) => {
    setActiveContent(contentName);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For now, just navigate to "/backHome" as an example
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="">
      {isAdminLoggedIn ? (
        <div className="" style={{ overflow: "hidden" }}>
          <div className="row">
            <div className="bg-secondary  p-3 col-md-4 col-lg-2 col-sm-12">
              <div className="m-3  border-bottom   border-5 border-light">
                <div className="user-panel text-light text-center">
                  <div className="thumb  ">
                    <img
                      src={`https://eikon-api.onrender.com/imageUploads/1698638066677-profile.jpg`}
                      alt="Profile"
                      class="img-circle"
                    />
                  </div>       
                    <p className="">Admin Name</p>
                  <div class="clearfix"></div>
                </div>
              </div>
              {components &&
                components.map((item) => {
                  return (
                    <ul className="  ">
                      <li
                        className={`btn ${
                          item.name === activeContent?.name
                            ? "text-dark bg-light  "
                            : "text-light"
                        }`}
                        key={item.name}
                        onClick={() => handleContentSelect(item)}
                        style={{ "text-align": "inherit" }}
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
