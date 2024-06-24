import React, { useState } from "react";
import './LoginPopup.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const [currState, setCurrState] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [showForm, setShowForm] = useState(true);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); // New state for showing success alert
    const [showErrorAlert, setShowErrorAlert] = useState(false); // New state for showing error alert

    const addUserFunction = () => {
        axios.post("http://localhost:3001/create", {
            name: name,
            email: email,
            password: password,
        }).then(() => {
            console.log("User created successfully!");
            setCurrState("Login");
            setShowSuccessAlert(true); // Set showSuccessAlert to true after successful user creation
            localStorage.setItem('userName', name);
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    const loginUser = () => {
        axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
        }).then(response => {
            console.log("User logged in successfully!", response.data);
        const userData = response.data;
        console.log(response.data.result[0].id)
        localStorage.setItem('user', JSON.stringify(response.data.result[0].name));
        localStorage.setItem('savedEmail', email);
       
        localStorage.setItem('userName', userData.name); // Ensure userData.name exists
       navigate('/AccessPage');
        setShowForm(false);
       window.location.reload();
        }).catch(error => {
            console.error('Error:', error);
            setShowErrorAlert(true); // Set showErrorAlert to true for wrong username or password
        });
    };
    const handleSignUp = (e) => {
        e.preventDefault();
        const errors = {};
        if (!name.trim() && currState !== "Login") {
            errors.name = "Name is required";
        } else if (name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters";
        } else if (!/^[A-Z][a-zA-Z]{2,}$/.test(name.trim())) {
            errors.name = "Name must start with an uppercase letter and contain only letters";
        }
        
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
        
        if (!agreeTerms) {
            errors.agreeTerms = "Please agree to the terms";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            console.log("Form is valid");
            addUserFunction(); // Call addUserFunction to create the user
        }
    };

    const handleHideForm = () => {
        setShowForm(false);
        window.location.reload();
    };

    const handleForgotPassword = () => {
        setForgotPassword(true);
    };

    return (
        <div className="login-popup">
            {showForm && (
                <div className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <button onClick={handleHideForm}>x</button>
                    </div>
                    <div className="login-popup-inputs">
                        {currState === "Login" ? <></> : <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />}
                        <span className="error">{formErrors.name}</span>

                        <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <span className="error">{formErrors.email}</span>

                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <span className="error">{formErrors.password}</span>
                    </div>
                    <button onClick={currState === "Sign Up" ? handleSignUp : loginUser}>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
                        <p>By continuing, I agree to the terms of use & privacy policy</p>
                        <span className="error">{formErrors.agreeTerms}</span>
                    </div>
                    {currState === "Login" ?
                        <p><span onClick={handleForgotPassword}>Forgot Password?</span></p>
                        :
                        <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                    }
                    {forgotPassword && (
                        <div className="forgot-password-form">
                            <h2>Forgot Password?</h2>
                            <p>Please enter your email to reset your password.</p>
                            <input type="email" placeholder="Your email" />
                            <button>Reset Password</button>
                            <button onClick={() => setForgotPassword(false)}>Cancel</button>
                        </div>
                    )}
                    {showSuccessAlert && (
                        <div className="alert alert-success" role="alert">
                            Account created successfully!
                        </div>
                    )}
                    {showErrorAlert && (
                        <div className="alert alert-danger" role="alert">
                            Incorrect email or password. Please try again.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginPopup;
