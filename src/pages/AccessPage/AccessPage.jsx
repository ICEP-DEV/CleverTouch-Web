import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets';
import "./AccessPage.css";
import axios from 'axios';
import Clock from '../../components/Date/Date';
import Navbar from '../../components/Navbar/Navbar'; // Import Navbar component

const AccessPage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        let user = null;
        try {
            user = JSON.parse(localStorage.getItem('user'));
            console.log("Stored user:", user); // Debugging line
        } catch (error) {
            console.error("Error parsing user data from local storage:", error);
        }
        
        if (user) {
            setLoggedInUser(user);
        } else {
            navigate('/'); // Redirect to login if no user is found
        }

        axios.get("http://localhost:3001/some-endpoint")
        .then(response => {
            console.log("Response Data:", response.data);
            setData(response.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
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
            <Navbar /> {/* Render Navbar component */}
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
                    <p className="welcomeMessage">Welcome, {loggedInUser.name}!</p> {/* Display the user's name if available */}
                    <button onClick={logoutUser} className="btn btn-primary">Logout</button>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
}

export default AccessPage;
