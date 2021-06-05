import { useState, useEffect, useCallback } from "react";
import ValidatedInput from "./ValidatedInput.js";

function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [address, setAddress] = useState("")
  const [message, setMessage] = useState("")

  const nameCallback = useCallback((data) => {
    setName(data);
  }, []);
  const emailCallback = useCallback((data) => {
    setEmail(data);
  }, []);
  const numberCallback = useCallback((data) => {
    setNumber(data);
  }, []);

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [contactAlert, setContactAlert] = useState("")
  const [contactAlertId, setContactAlertId] = useState("")

  const nameRegex = /\S/
  const emailRegex = /\S+@\S+\.\S+/
  const numberRegex = /\+1 \(\d{3}\) \d{3}-\d{4}/

  const submitHandler = () => {
    const data = {name, email, number, address, message}
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }
    fetch('/contact', requestOptions)
      .then(res => res.json())
      .then(res => {
        if(res.message === "error" || res.message === undefined) {
          setContactAlert("An error occurred while trying to send your message. Please try again later.")
          setContactAlertId("contact-alert-error")
        } else {
          setContactAlert("Your message has been successfully sent!")
          setContactAlertId("contact-alert-success")
          setButtonDisabled(true);
        }
      })
      .catch(() => {
        setContactAlert("An error occurred while trying to send your message. Please try again later.")
        setContactAlertId("contact-alert-error")
      })
  }

  function ContactAlert(props) {
    return (
      <div>
        <p>{props.alert}</p>
      </div>
    )
  }

  return (
    <div id="contact-form-wrapper">
      <form id="contact-form">
        <div id="contact-form-group">
          <div  className="contact-form-element">
            <label for="name">Name</label>
            <ValidatedInput data={name} dataName="name" regex={nameRegex}
            parentCallback={nameCallback}/>
          </div>
          <div  className="contact-form-element">
            <label for="email">Email</label>
            <ValidatedInput data={email} dataName="email" regex={emailRegex}
            parentCallback={emailCallback}/>
          </div>
          <div  className="contact-form-element">
            <label for="number">Number</label>
            <ValidatedInput data={number} dataName="number"
            mask="+1 (999) 999-9999" alwaysShowMask="true" regex={numberRegex}
            parentCallback={numberCallback}/>
          </div>
          <div className="contact-form-element">
            <label for="address">Address</label>
            <input type="text" className="contact-input" id="address"
            name="contactAddress" value={address} placeholder="123 Fake Street"/>
          </div>
          <div className="contact-form-element-unvalidated">
            <label for="message">Message</label>
            <textarea type="text" className="contact-input" id="message"
            name="contactMessage" value={message}
            placeholder="My A/C is not working" maxlength={"1000"}/>
          </div>
          <div className="contact-form-element">
            <button id="contact-form-button" type="submit"
            disabled={buttonDisabled} onClick={submitHandler}>
            <a id="contact-form-button-anchor" href="#contact">
            Send Message</a></button>
          </div>
          <div id={contactAlertId}>
            <ContactAlert alert={contactAlert}/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Contact;
