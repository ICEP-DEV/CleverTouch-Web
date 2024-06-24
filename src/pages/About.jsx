import React from "react";
import BreadCrumps from '../components/BreadCrumps'
function About() {
  return (
    <div>
      <BreadCrumps  page="About us"  title="About our Clevertouch"  />
      <section id="about" className="home-services pt-lg-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="box-wrap">
                <div className="box-wrap-grid">
                  <div className="icon">
                    <span className="fa fa-graduation-cap"></span>
                  </div>
                  <div className="info">
                    <p>Our</p>
                    <h4>
                      <a href="#url">Mission</a>
                    </h4>
                  </div>
                </div>
                <p className="mt-4">
                Our mission is to provide students with an innovative platform that 
                allows them to view lecture presentations and take notes simultaneously,
                 capture and organize their study materials effectively, and ultimately improve their learning outcomes through efficient 
                study practices and easy access to educational resources.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-md-0 mt-4">
              <div className="box-wrap">
                <div className="box-wrap-grid">
                  <div className="icon">
                    <span className="fa fa-book"></span>
                  </div>
                  <div className="info">
                    <p>Our</p>
                    <h4>
                      <a href="#url">Vision</a>
                    </h4>
                  </div>
                </div>
                <p className="mt-4">
                To transform and enhance the educational experience by seamlessly
                 integrating lecture presentations and personalized note-taking,
                  promote more interactive, efficient, and engaging learning environment.

                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-lg-0 mt-4">
              <div className="box-wrap">
                <div className="box-wrap-grid">
                  <div className="icon">
                    <span className="fa fa-trophy"></span>
                  </div>
                  <div className="info">
                    <p>Our</p>
                    <h4>
                      <a href="#url">Goal</a>
                    </h4>
                  </div>
                </div>
                <p className="mt-4">
                Enhance Learning Efficiency
Create an easy-to-use interface for viewing lectures and taking notes at the same time.
Allow students to capture and save screenshots of lecture slides for future study.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w3l-aboutblock1 py-5" id="about">
        <div className="container py-lg-5 py-md-4 py-2">
          <div className="row">
            <div className="col-lg-6 align-self">
              <span className="title-small mb-2">About Us</span>
              <h3 className="title-big mx-0">
                Welcome to the Clevertouch
              </h3>
              <p className="mt-lg-4 mt-3">
              System must allow users to Create account and must allow Onboarding for first time users,
        A user must log in using their email and password. He/she must clicks on the link to access presentation 
        and selects view presentation option, you can find the screenshot, notetaking and others.
        On the system user must be able to type notes, take screenshot even edit notes.
        The User will be able to save notes at anytime and many times. Feedbacks are allowed if you want to say anything,
        User may logout to end session
              
              </p>
       
            </div>
            <div className="col-lg-6 left-wthree-img mt-lg-0 mt-sm-5 mt-4">
              <img
                src="assets/images/about.jpg"
                alt=""
                className="img-fluid radius-image"
              />
            </div>
          </div>
        </div>
      </section>
      
    
     

    </div>
  );
}

export default About;
