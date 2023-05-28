import { useRef, useState } from "react";
import SideNavigation from "../../components/sidebar/SideBar";
import emailjs from "emailjs-com";
import { useParams } from "react-router-dom";
import "./faq.scss";
import { accordionData } from "../../data/accordion.data";
import AccordionUI from "../../components/accordion/AccordionUI";

const Faq = () => {
  const location = useParams().id;
  const [permissions, setPermissions] = useState({
    settings: JSON.parse(localStorage.getItem("user"))._id == location,
    fordevs: JSON.parse(localStorage.getItem("user")).isAdmin,
  });
  const [Index, setIndex] = useState(false);
  const form = useRef();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail_sender_test",
        "template_5bjni3i",
        form.current,
        "PQ-VksmVP8UIV5yCL"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }
  return (
    <>
      <SideNavigation
        location={location}
        active="faq"
        permissions={permissions}
      />
      <div className="faqContainer">
        <div className="faqAccordions">
          {accordionData?.map((data) => {
            return (
              <AccordionUI
                key={data.id}
                title={data.question}
                Id={data.id}
                main={data.steps}
                Index={Index}
                setIndex={setIndex}
              />
            );
          })}
        </div>
        <div className="faqRoute">
          <div className="contact">
            <div className="contact-box">
              <div className="contact-links">
                <h2>CONTACT</h2>
                <div className="links">
                  <div className="link">
                    <a>
                      <img
                        src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
                        alt="linkedin"
                      />
                    </a>
                  </div>
                  <div className="link">
                    <a>
                      <img
                        src="https://i.postimg.cc/YCV2QBJg/github.png"
                        alt="github"
                      />
                    </a>
                  </div>
                  <div className="link">
                    <a>
                      <img
                        src="https://i.postimg.cc/W4Znvrry/codepen.png"
                        alt="codepen"
                      />
                    </a>
                  </div>
                  <div className="link">
                    <a>
                      <img
                        src="https://i.postimg.cc/NjLfyjPB/email.png"
                        alt="email"
                      />
                    </a>
                  </div>
                </div>
                <a className="phone" href="tel:+998(91)0100180">
                  +998 (91) 010-01-80
                </a>
              </div>
              <div className="contact-form-wrapper">
                <h3 style={{ color: "white" }}>send message to admin</h3>
                <br />
                <form ref={form} onSubmit={sendEmail}>
                  <div className="form-item">
                    <input type="text" name="name" required />
                    <label>Name:</label>
                  </div>
                  <div className="form-item">
                    <input type="text" name="subject" required />
                    <label>Subject:</label>
                  </div>
                  <div class="form-item">
                    <input type="text" name="email" required />
                    <label>Email:</label>
                  </div>
                  <div className="form-item">
                    <textarea class="" name="message" required></textarea>
                    <label>Message:</label>
                  </div>
                  <input
                    className="submit-btn"
                    type="submit"
                    value="Send Message"
                  ></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Faq;
