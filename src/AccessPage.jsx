import React from "react";
import { Link } from "react-router-dom";
import { assets } from "./assets/assets";
import "./AccessPage.css";
import Clock from './components/Date/Date';

const AccessPage = () => {
  return (
    <div className="AccessPageContainer container">
      
      <h2 className="AccessPageHeading">Presentation & Files</h2>
      <Clock />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center custom-margin-bottom">
          <Link to="/present" className="AccessPageLink">
            <img className="AccessPageImage img-fluid" src={assets.education} alt="education" />
          </Link>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center custom-margin-bottom">
          <Link to="/UserFile" className="AccessPageLink">
            <img className="AccessPageImage img-fluid" src={assets.files} alt="files" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccessPage;
