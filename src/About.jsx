// About.js

import React from 'react';
import './About.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container"> {/* Add classname for the container */}
        <h1 className="about-title">What the system is all about:</h1> {/* Add classname for the title */}
        
      <p className="about-description"> {/* Add classname for the description */}
        System must allow users to Create account and must allow Onboarding for first time users,
        A user must log in using their email and password. He/she must clicks on the link to access presentation 
        and selects view presentation option, you can find the screenshot, notetaking and others.
        On the system user must be able to type notes, take screenshot even edit notes.
        The User will be able to save notes at anytime and many times. Feedbacks are allowed if you want to say anything,
        User may logout to end session
      </p>

      <p className="about-contact-info"> {/* Add classname for the contact information */}
        Tel_no :+ 27 726367588 <br />
        Venue : Build 18
      </p>
    </div>
  );
}

export default About;
