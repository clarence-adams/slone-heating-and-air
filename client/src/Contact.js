import { useState } from "react";

function Contact() {
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [contactAlert, setContactAlert] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [address, setAddress] = useState("")
  const [message, setMessage] = useState("")
  const [contactAlertId, setContactAlertId] = useState("")

  const onNameChange = event => setName(event.target.value)
  const onEmailChange = event => setEmail(event.target.value)
  const onNumberChange = event => setNumber(event.target.value)
  const onAddressChange = event => setAddress(event.target.value)
  const onMessageChange = event => setMessage(event.target.value)

  const submitHandler = () => {
    setButtonDisabled(true);

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
          setContactAlert("There was a problem trying to send your message. Please try again later.")
          setContactAlertId("contact-alert-error")
        } else {
          setContactAlert("Your message has been successfully sent!")
          setContactAlertId("contact-alert-success")
        }
      })
      .catch(() => {
        setContactAlert("There was a problem trying to send your message. Please try again later.")
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
            <input type="text" className="contact-input" id="name"
            name="contactName" value={name} placeholder="John Doe"
            onChange={onNameChange}/>
          </div>
          <div  className="contact-form-element">
            <label for="email">Email</label>
            <input type="text" className="contact-input" id="email"
            name="contactEmail" value={email} placeholder="john@example.com"
            onChange={onEmailChange}/>
          </div>
          <div  className="contact-form-element">
            <label for="number">Number</label>
            <input type="text" className="contact-input" id="number"
            name="contactNumber" value={number} placeholder="000-000-0000"
            onChange={onNumberChange}/>
          </div>
          <div className="contact-form-element">
            <label for="address">Address</label>
            <input type="text" className="contact-input" id="address"
            name="contactAddress" value={address} placeholder="123 Fake Street"
            onChange={onAddressChange}/>
          </div>
          <div className="contact-form-element">
            <label for="message">Message</label>
            <textarea type="text" className="contact-input" id="message"
            name="contactMessage" value={message}
            placeholder="My A/C is not working" onChange={onMessageChange}/>
          </div>
          <div className="contact-form-element">
            <button id="contact-form-button" type="submit"
            disabled={buttonDisabled} onClick={submitHandler}>
            <a href="#contact" id="contact-form-button-anchor">Submit</a>
            </button>
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
