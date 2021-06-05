import {useState, useEffect} from 'react';
import InputMask from 'react-input-mask';

function ValidatedInput(props) {
  const [isDataValid, setIsDataValid] = useState(undefined)
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
    if (valid) {
      setIsDataValid(true)
      setBorderColor({borderColor: 'green'})
      setValidationMessageColor({color: 'green'})
      setValidationMessage(capitalizeFirstLetter(props.dataName) + ' is valid!')
    } else {
      setIsDataValid(false)
      setBorderColor({borderColor: 'red'})
      setValidationMessageColor({color: 'red'})
      setValidationMessage('Please enter a valid ' + props.dataName)
    }
  }

  const onChangeHandler = event => {
    props.parentCallback(event.target.value)
  }

  const blurHandler = event => {
    validateData(props.regex.test(props.data))
  }

  return (
    <div>
      <InputMask id={props.dataName} className='contact-input'
      name={props.dataName} style={borderColor} mask={props.mask}
      alwaysShowMask={props.alwaysShowMask} value={props.data}
      onChange={onChangeHandler} onBlur={blurHandler} placeholder={props.placeholder}
      maxlength={props.maxLength}/>
      <p class='validation-message'
      style={validationMessageColor}>{validationMessage}</p>
    </div>
  )
}

export default ValidatedInput;
