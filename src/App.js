import './App.css';
import { useState } from "react";
import logo from './images/logo2.png';
import armstrong from './images/armstrong-air.png';
import concord from './images/concord-air.png';
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from "react-visibility-sensor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faQuoteRight, faQuoteLeft, faAddressCard, faTools, faComments,faEnvelope,
  faWrench
} from '@fortawesome/free-solid-svg-icons'

library.add(faQuoteRight, faQuoteLeft, faAddressCard, faTools, faComments,
  faEnvelope, faWrench
)

function App() {
  // spring-react props
  const img0 = useSpring(
    {
      to: { opacity: 1 },
      from: { opacity: 0 },
      delay: 400
    }
  )
  const img1 = useSpring(
    {
      to: { opacity: 1 },
      from: { opacity: 0 },
      delay: 800
    }
  )

  // testimonial component props
  const testimonials = [{
    "testimonial": "They were good AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "customer": "Big Clarence"
  },
  {
    "testimonial": "Leave me alone",
    "customer": "Gauge Adams"
  },
  {
    "testimonial": "They're my favorite HVAC company",
    "customer": "Aaron Slone"
  },
  {
    "testimonial": "I like them as well",
    "customer": "Ajjea Slone"
  },
  {
    "testimonial": "An excellent company ran by an excellent baby boy",
    "customer": "Aaron's Mom"
  },
  {
    "testimonial": "The equipment they install is excellent quality",
    "customer": "Tim Jenks"
  },
  {
    "testimonial": "Southern Comfort's hoodies are better",
    "customer": "Anonymous Employee"
  },
  {
    "testimonial": "EeeEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeeeeeeeEEEEEEEEEEEEEEEEEEeeeEeeeEEeeEEeeEeeEEeeEEeeEEeEEEEEEEEEEeeEeeeeeeEeeEeeEe",
    "customer": "Mini Me"
  }]

  return (
    <div className="App">
      <header>
        <h1><img id="logo" src={logo} alt="logo"/></h1>
        <div id="navbar">
          <a class="nav-button" href="#about">About</a>
          <a class="nav-button" href="#testimonials">Testimonials</a>
          <a class="nav-button" href="#services">Services</a>
          <a class="nav-button" href="#contact">Contact</a>
        </div>
      </header>
      <div id="content">
        <div id="about" class="content-section">
          <h2>About Us <FontAwesomeIcon icon="address-card"/></h2>
          <div class="line"/>
          <p>At Slone Heating and Air we offer equipment replacements using the following trustworthy brands: </p>
          <animated.img style={img0} src={armstrong} id="armstrong-logo" class="logo" alt="armstrong logo"/>
          <br/>
          <animated.img style={img1} src={concord} id="concord-logo" class="logo" alt="concord logo"/>
        </div>
        <div id="testimonials" class="content-section">
          <h2>Testimonials <FontAwesomeIcon icon="comments"/></h2>
          <div className="line"/>
          <div id="testimonials-content">
            {testimonials.map((element) =>
              <Testimonial testimonial={element.testimonial}
              customer={element.customer}/>
            )}
          </div>
        </div>
        <div id="services" class="content-section">
          <h2>Services <FontAwesomeIcon icon="tools"/></h2>
          <div className="line"/>
          <p> We do
          not offer the following services:</p>
          <ul>
            <li>We don't do maintenances</li>
            <li>We don't offer 24 hour service</li>
            <li>We don't work weekends</li>
            <li>We don't install anything other than Armstrong Air</li>
            <li>We reserve the right to not do anything we don't want to</li>
          </ul>
        </div>
        <div id="contact" class="content-section">
          <h2>Contact <FontAwesomeIcon icon="envelope"/></h2>
          <div className="line"/>
          <p>To contact us, fill out the following form and A-Aron will visit you
           in the middle of the night when you least expect it!</p>
          <i>This form does not actually do anything yet</i>
          <form id="contact-form" method="post">
            <div id="form-group">
              <div  className="contact-form-element">
                <label for="name"/>
                <input type="text" id="name" name="contact-name" placeholder="Name"/>
              </div>
              <div  className="contact-form-element">
                <label for="email"/>
                <input type="text" id="email" name="contact-email" placeholder="Email"/>
              </div>
              <div className="contact-form-element">
                <label for="address"/>
                <input type="text" id="address" name="contact-address" placeholder="Address"/>
              </div>
              <div className="contact-form-element">
                <label for="info"/>
                <textarea type="text" id="info" name="contact-info" placeholder="Message" style={{"resize": "none"}}/>
              </div>
              <div id="contact-form-button" className="contact-form-element" placeholder="Info">
                <button type="submit">Contact</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer id="footer">
        <p>This website is still under construction <FontAwesomeIcon icon="wrench"/></p>
      </footer>
    </div>
  )
}

function Testimonial(props) {
  const [visible, setVisible] = useState(false)

  const fadeIn = useSpring({
    from: {opacity: 0},
    to: {opacity: visible ? 1 : 0},
    delay: 400
  });

  const onChange = function (isVisible) {
    if (isVisible) {
      setVisible(true)
    }
  }

  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      <animated.div className="testimonial" style={fadeIn}>
        <div class="quote-left-wrapper">
          <FontAwesomeIcon icon="quote-left" size="lg"/>
        </div>
        <p><i> {props.testimonial} </i></p>
        <div class="quote-right-wrapper">
          <FontAwesomeIcon icon="quote-right" size="lg"/>
        </div>
        <div class="testimonial-line-wrapper">
          <div class="testimonial-line"/>
        </div>
        <p>- {props.customer}</p>
      </animated.div>
    </VisibilitySensor>
  )
}

export default App;
