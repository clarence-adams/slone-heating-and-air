import './Contact.css';
import { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'

function Contact() {
  const [name, setName] = useState('')
  const [isNameValid, setIsNameValid] = useState(false)

  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)

  const [number, setNumber] = useState('')
  const [isNumberValid, setIsNumberValid] = useState(false)

  const [address, setAddress] = useState('')

  const [message, setMessage] = useState('')

  const [submissionAttempted, setSubmissionAttempted] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [contactAlert, setContactAlert] = useState('')
  const [contactAlertId, setContactAlertId] = useState('')
 
  const validatedData = {
    name: {
      data: name,
      dataName: 'name',
      callbacks: {
        setData: (data) => setName(data),
        setValidity: (data) => setIsNameValid(data)
      }
    },
    email: {
      data: email,
      dataName: 'email',
      callbacks: {
        setData: (data) => setEmail(data),
        setValidity: (data) => setIsEmailValid(data)
      }
    },
    number: { 
      data: number,
      dataName: 'number',
      callbacks: {
        setData: (data) => setNumber(data),
        setValidity: (data) => setIsNumberValid(data)
      }
    }
  }
  const isValidatedDataValid = [isNameValid, isEmailValid, isNumberValid]

  const emptyStringRegex = /^$/
  const nameRegex = /^[A-Za-z\s]+$/
  const emailRegex = /^\S+@\S+\.[A-Za-z]+/
  const numberRegex = /\+1 \(\d{3}\) \d{3}-\d{4}/
  const emptyNumberRegex = /\+1 \(___\) ___-____/

  // function that sends contact message once button is pressed

  const submitHandler = () => {
    setSubmissionAttempted(true)

    const data = {name, email, number, address, message}
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }
    
    fetch('/.netlify/functions/send-email', requestOptions)
      .then(res => res.json())
      .then(res => {
        if(res.message === 'error' || res.message === undefined) {
          setContactAlert('An error occurred while trying to send your message. Please try again later.')
          setContactAlertId('contact-alert-error')
        } else if (res.message === 'success') {
          setContactAlert('Your message has been successfully sent!')
          setContactAlertId('contact-alert-success')
          setButtonDisabled(true);
        }
      })
      .catch(() => {
        setContactAlert('An error occurred while trying to send your message. Please try again later.')
        setContactAlertId('contact-alert-error')
      })

    setButtonDisabled(true)
  }

  // onChange handlers for unvalidated inputs

  const addressOnChangeHandler = (event) => setAddress(event.target.value)
  const messageOnChangeHandler = (event) => setMessage(event.target.value)

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
    if (isValidatedDataValid.every((element) => element === true) && submissionAttempted) {
      setButtonDisabled(false)
    } else if (isValidatedDataValid.every((element) => element === false) && submissionAttempted) {
      const keys = Object.keys(validatedData) 
      
      keys.forEach((key) => {
        if (validatedData[key].data === '') {
          document.getElementById(validatedData[key].dataName).focus()
          document.getElementById(validatedData[key].dataName).blur()
        }
      })
      setButtonDisabled(true)
    } else if (!submissionAttempted) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  // eslint-disable-next-line
  }, [validatedData])

  return (
    <div id='contact-form-wrapper'>
      <form id='contact-form'>
        <div id='contact-form-group'>
          <div className='contact-form-element'>
            <div class='contact-form-label-wrapper'>
              <label htmlFor='name'>Name</label>
              <div class='red-asterisk'>*</div>
            </div>
            <ValidatedInput data={name} dataName='name' regex={nameRegex}
            emptyRegex={emptyStringRegex} parentCallbacks={validatedData.name.callbacks}
            maxLength={'757'} placeholder='John Doe' required/>
          </div>
          <div className='contact-form-element'>
            <div class='contact-form-label-wrapper'>
              <label htmlFor='email'>Email</label>
              <div class='red-asterisk'>*</div>
            </div>
            <ValidatedInput data={email} dataName='email' regex={emailRegex}
            emptyRegex={emptyStringRegex} parentCallbacks={validatedData.email.callbacks}
            maxLength={'254'} placeholder='example@example.com' required/>
          </div>
          <div className='contact-form-element'>
            <div class='contact-form-label-wrapper'>
              <label htmlFor='number'>Number</label>
              <div class='red-asterisk'>*</div>
            </div>
            <ValidatedInput data={number} dataName='number' regex={numberRegex}
            emptyRegex={emptyNumberRegex} mask='+1 (999) 999-9999'
            alwaysShowMask='true' parentCallbacks={validatedData.number.callbacks} required/>
          </div>
          <div className='contact-form-element'>
            <label htmlFor='address'>Address</label>
            <input className='contact-input' onChange={addressOnChangeHandler} 
            placeholder='123 Fake Street, Lexington KY 40505' maxLength={'85'}/>
          </div>
          <div className='contact-form-element' id='message-element'>
            <label htmlFor='message'>Message</label>
            <textarea type='text' className='contact-input' id='message'
            name='contactMessage' onChange={messageOnChangeHandler} value={message}
            placeholder='My A/C is not working' maxLength={'1000'}/>
          </div>
          <div className='contact-form-element'>
            <button id='contact-form-button' type='submit'
            disabled={buttonDisabled} onClick={submitHandler}>
            <a id='contact-form-button-anchor' href='#contact'>
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
  const [previouslyFocused, setPreviouslyFocused] = useState(false)
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
    props.parentCallbacks.setData(event.target.value)
    validateData(props.regex.test(event.target.value))
  }
  
  const focusHandler = () => setPreviouslyFocused(true)

  const blurHandler = event => {
    if (!validationAttempted && !props.emptyRegex.test(event.target.value)) {
      setValidationAttempted(true)
    } else if (!validationAttempted && props.emptyRegex.test(event.target.value) && previouslyFocused === true) {
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
      onChange={onChangeHandler} onFocus={focusHandler} onBlur={blurHandler} 
      placeholder={props.placeholder} maxLength={props.maxLength}/>
      <p className='validation-message'
      style={validationMessageColor}>{validationMessage}</p>
    </div>
  )
}

export default Contact;
