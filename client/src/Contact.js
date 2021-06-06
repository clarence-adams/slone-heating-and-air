import './Contact.css';
import { useState, useEffect, useCallback } from "react"
import InputMask from 'react-input-mask'

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
  const addressCallback = useCallback((data) => {
    setAddress(data);
  }, []);

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [contactAlert, setContactAlert] = useState("")
  const [contactAlertId, setContactAlertId] = useState("")

  const emptyStringRegex = /^$/
  const nameRegex = /^[A-Za-z]+$/
  const emailRegex = /^\S+@\S+\.[A-Za-z]+/
  const numberRegex = /\+1 \(\d{3}\) \d{3}-\d{4}/
  const emptyNumberRegex = /\+1 \(___\) ___-____/
  const addressRegex = /\S/

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

  const onChangeMessage = (event) => {
    setMessage(event.target.value)
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
            emptyRegex={emptyStringRegex} parentCallback={nameCallback}
            maxlength={"757"} required/>
          </div>
          <div  className="contact-form-element">
            <label for="email">Email</label>
            <ValidatedInput data={email} dataName="email" regex={emailRegex}
            emptyRegex={emptyStringRegex} parentCallback={emailCallback}
            maxlength={"254"} required/>
          </div>
          <div  className="contact-form-element">
            <label for="number">Number</label>
            <ValidatedInput data={number} dataName="number" regex={numberRegex}
            emptyRegex={emptyNumberRegex} mask="+1 (999) 999-9999"
            alwaysShowMask="true" parentCallback={numberCallback} required/>
          </div>
          <div className="contact-form-element">
            <label for="address">Address</label>
            <ValidatedInput data={address} dataName="address"
            regex={addressRegex} emptyRegex={emptyStringRegex}
            parentCallback={addressCallback} placeholder="123 Fake Street"
            maxlength={"85"}/>
          </div>
          <div className="contact-form-element" id="message-element">
            <label for="message">Message</label>
            <textarea type="text" className="contact-input" id="message"
            name="contactMessage" onChange={onChangeMessage} value={message}
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

function ValidatedInput(props) {
  const [isDataValid, setIsDataValid] = useState(undefined)
  const [validationAttempted, setValidationAttempted] = useState(false)
  const [borderColor, setBorderColor] = useState({borderColor: 'black'})
  const [validationMessage, setValidationMessage] = useState('')
  const [validationMessageColor, setValidationMessageColor] = useState({color: 'black'})

  // Helper function
  const capitalizeFirstLetter = (string) => {
    let capitalizedFirstLetter = string.charAt(0).toUpperCase()

    let capitalizedString = capitalizedFirstLetter + string.slice(1)

    return capitalizedString
  }

  const validateData = (valid) => {
    if (valid && validationAttempted) {
      setIsDataValid(true)
      setBorderColor({borderColor: 'green'})
      setValidationMessageColor({color: 'green'})
      setValidationMessage(capitalizeFirstLetter(props.dataName) + ' is valid!')
    } else if (!valid && validationAttempted) {
      setIsDataValid(false)
      setBorderColor({borderColor: 'red'})
      setValidationMessageColor({color: 'red'})
      setValidationMessage('Please enter a valid ' + props.dataName)
    }
  }

  const onChangeHandler = event => {
    props.parentCallback(event.target.value)
    validateData(props.regex.test(event.target.value))
  }

  const blurHandler = event => {
    if (!validationAttempted && !props.emptyRegex.test(event.target.value)) {
      setValidationAttempted(true)
    }
  }

  useEffect(() => {
    validateData(props.regex.test(props.data))
  }, [validationAttempted])

  return (
    <div>
      <InputMask id={props.dataName} className='contact-input'
      name={props.dataName} style={borderColor} mask={props.mask}
      alwaysShowMask={props.alwaysShowMask} value={props.data}
      onChange={onChangeHandler} onBlur={blurHandler} placeholder={props.placeholder}
      maxLength={props.maxLength}/>
      <p className='validation-message'
      style={validationMessageColor}>{validationMessage}</p>
    </div>
  )
}

export default Contact;
