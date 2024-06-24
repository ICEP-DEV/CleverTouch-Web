import React from "react";
import BreadCrumps from "../components/BreadCrumps";

function Contact() {
  return (
    <div>
      <BreadCrumps page="Contact us" title="Contact our Company" />

      {/* contact block */}
      {/* contact1 */}
      <section className="w3l-contact-1 pb-5" id="contact">
        <div className="contacts-9 py-lg-5 py-md-4">
          <div className="container">
            <div className="d-grid contact-view">
              <div className="cont-details">
                <h4 className="title-small">Get in touch</h4>
                <h3 className="title-big mb-4">Feel free to contact us</h3>
                <p className="mb-sm-5 mb-4">
                Start using our App its userfriendly and make life to be easy.
                </p>

                <div className="cont-top">
                  <div className="cont-left text-center">
                    <span className="fa fa-map-marker text-primary"></span>
                  </div>
                  <div className="cont-right">
                    <h6>Our head office address</h6>
                    <p className="pr-lg-5">
                    Address here, Block K,Aubrey Matlakala St,Soshanguve-K,Soshanguve,0152.
                    </p>
                  </div>
                </div>
                <div className="cont-top margin-up">
                  <div className="cont-left text-center">
                    <span className="fa fa-phone text-primary"></span>
                  </div>
                  <div className="cont-right">
                    <h6>Call for help </h6>
                    <p>
                      <a href="tel:+(27) 86 110 2421">+(27) 86 110 2421</a>
                    </p>
                  </div>
                </div>
                <div className="cont-top margin-up">
                  <div className="cont-left text-center">
                    <span className="fa fa-envelope-o text-primary"></span>
                  </div>
                  <div className="cont-right">
                    <h6>Contact with our support</h6>
                    <p>
                      <a href="mailto:general@tut.ac.za" className="mail">
                      general@tut.ac.za
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      {/* /contact1 */}

    </div>
  );
}

export default Contact;
