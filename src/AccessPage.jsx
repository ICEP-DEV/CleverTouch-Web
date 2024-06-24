import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "./assets/assets";
import "./AccessPage.css";
import Clock from './components/Date/Date';

const AccessPage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("Stored user:", user); // Debugging line
        
        if (user) {
            setLoggedInUser(user);
        } else {
            navigate('/'); // Redirect to login if no user is found
        }
    }, [navigate]);

    const logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
        localStorage.removeItem('userName'); // Remove the user's name from local storage
        setLoggedInUser(null);
        navigate('/');
    };

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
            {loggedInUser ? (
                <div className="loggedInUserSection">
                    <p className="welcomeMessage">Welcome, {loggedInUser}!</p> {/* Display the user's name if available */}
                    <button onClick={logoutUser} className="btn btn-primary">Logout</button>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
}

export default AccessPage;
