import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function About(props) {
  const navigate = useNavigate();
  const handleclick = () => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      props.showAlert("You are not logged in", "danger");
      navigate("/login");
    }
    // eslint-disable-next-line
  };
  return (
    <>
      <div className="container">
        <div className="jumbotron mt-5">
          <h1 className="display-4">iNotebook</h1>
          <p className="lead">
            A digital notebook for all your notes and ideas.
          </p>
          <hr className="my-4" />
          <p>
            iNotebook is a web-based application that allows you to create,
            Update, Delete Notes in server database.
          </p>
          <p>
            Express Webframe is used at backend side to store notes and user
            information in Monogodb Database
          </p>
          <p>
            Stay organized and never lose track of your thoughts again with
            iNotebook.
          </p>
          <button className="btn btn-primary btn-lg" onClick={handleclick}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
