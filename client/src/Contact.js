import './Contact.css';
import { useState, useEffect } from "react"
import InputMask from 'react-input-mask'

function Contact() {
  const [name, setName] = useState("")
  const [isNameValid, setIsNameValid] = useState(false)

  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)

  const [number, setNumber] = useState("")
  const [isNumberValid, setIsNumberValid] = useState(false)

  const [address, setAddress] = useState("")
  const [isAddressValid, setIsAddressValid] = useState(false)

  const [message, setMessage] = useState("")

  const [submissionAttempted, setSubmissionAttempted] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [contactAlert, setContactAlert] = useState("")
  const [contactAlertId, setContactAlertId] = useState("")

  const nameCallbacks = {
    setValue: (data) => setName(data),
    setValidity: (data) => setIsNameValid(data)
  }
  const emailCallbacks = {
    setValue: (data) => setEmail(data),
    setValidity: (data) => setIsEmailValid(data)
  }
  const numberCallbacks = {
    setValue: (data) => setNumber(data),
    setValidity: (data) => setIsNumberValid(data)
  }
  const addressCallbacks = {
    setValue: (data) => setAddress(data),
    setValidity: (data) => setIsAddressValid(data)
  }

  const validatedData = [isNameValid, isEmailValid, isNumberValid, isAddressValid]

  const emptyStringRegex = /^$/
  const nameRegex = /^[A-Za-z]+$/
  const emailRegex = /^\S+@\S+\.[A-Za-z]+/
  const numberRegex = /\+1 \(\d{3}\) \d{3}-\d{4}/
  const emptyNumberRegex = /\+1 \(___\) ___-____/
  const addressRegex = /\S/

  // function that sends contact message once button is pressed

  const submitHandler = () => {
    setSubmissionAttempted(true)

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

  // onChange handler that updates stored message as form is updated

  const onChangeMessage = (event) => {
    setMessage(event.target.value)
  }

  // function that contains props so it can be styled according to
  // the message type (failure or success)

  function ContactAlert(props) {
    return (
      <div>
        <p>{props.alert}</p>
      </div>
    )
  }

  // useEffect function that enables or disables submit button

  useEffect(() => {
    if (validatedData.every((element) => element === true) && submissionAttempted) {
      setButtonDisabled(false)
    } else if (!submissionAttempted) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  // eslint-disable-next-line
  }, [validatedData])

  return (
    <div id="contact-form-wrapper">
      <form id="contact-form">
        <div id="contact-form-group">
          <div className="contact-form-element">
            <label htmlFor="name">Name</label>
            <ValidatedInput data={name} dataName="name" regex={nameRegex}
            emptyRegex={emptyStringRegex} parentCallbacks={nameCallbacks}
            maxLength={"757"} placeholder="John Doe" required/>
          </div>
          <div className="contact-form-element">
            <label htmlFor="email">Email</label>
            <ValidatedInput data={email} dataName="email" regex={emailRegex}
            emptyRegex={emptyStringRegex} parentCallbacks={emailCallbacks}
            maxLength={"254"} placeholder="example@example.com" required/>
          </div>
          <div className="contact-form-element">
            <label htmlFor="number">Number</label>
            <ValidatedInput data={number} dataName="number" regex={numberRegex}
            emptyRegex={emptyNumberRegex} mask="+1 (999) 999-9999"
            alwaysShowMask="true" parentCallbacks={numberCallbacks} required/>
          </div>
          <div className="contact-form-element">
            <label htmlFor="address">Address</label>
            <ValidatedInput data={address} dataName="address"
            regex={addressRegex} emptyRegex={emptyStringRegex}
            parentCallbacks={addressCallbacks} placeholder="123 Fake Street"
            maxLength={"85"}/>
          </div>
          <div className="contact-form-element" id="message-element">
            <label htmlFor="message">Message</label>
            <textarea type="text" className="contact-input" id="message"
            name="contactMessage" onChange={onChangeMessage} value={message}
            placeholder="My A/C is not working" maxLength={"1000"}/>
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

  // validation function
  const validateData = (valid) => {
    if (valid && validationAttempted) {
      props.parentCallbacks.setValidity(true)
      setBorderColor({borderColor: 'green'})
      setValidationMessageColor({color: 'green'})
      setValidationMessage(capitalizeFirstLetter(props.dataName) + ' is valid!')
    } else if (!valid && validationAttempted) {
      props.parentCallbacks.setValidity(false)
      setBorderColor({borderColor: 'red'})
      setValidationMessageColor({color: 'red'})
      setValidationMessage('Please enter a valid ' + props.dataName)
    }
  }

  const onChangeHandler = event => {
    props.parentCallbacks.setValue(event.target.value)
    validateData(props.regex.test(event.target.value))
  }

  const blurHandler = event => {
    if (!validationAttempted && !props.emptyRegex.test(event.target.value)) {
      setValidationAttempted(true)
    }
  }

  // useEffect function calls validation function as validationAttempted state changes
  
  useEffect(() => {
    validateData(props.regex.test(props.data))
  // eslint-disable-next-line
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
