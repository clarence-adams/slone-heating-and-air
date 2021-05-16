import './App.css';
import { useState } from "react";
import logo from './images/logo2.png';
import armstrong from './images/armstrong-air.png';
import concord from './images/concord-air.png';
import nuCalgon from './images/nu-calgon.png';
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from "react-visibility-sensor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faQuoteRight, faQuoteLeft, faAddressCard, faTools, faComments,faEnvelope,
  faWrench, faArrowLeft, faArrowRight
} from '@fortawesome/free-solid-svg-icons'

library.add(faQuoteRight, faQuoteLeft, faAddressCard, faTools, faComments,
  faEnvelope, faWrench, faArrowLeft, faArrowRight
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
  const img2 = useSpring(
    {
      to: { opacity: 1 },
      from: { opacity: 0 },
      delay: 1200
    }
  )

  const services = [{
    serviceHeader: "Annual Maintenance Plans",
    serviceDescription: "Regular maintenance will increase the lifespan and "
    + "efficiency of your HVAC system. During a maintenance various components "
    + "are thoroughly inspected and their performance is measured to ensure "
    + "they are operating at peak efficiency. We don't do them."
  },
  {
    serviceHeader: "24 Hour Express Service",
    serviceDescription: "How are we going to sleep and also answer the phone? "
    + "If we work 24 hours how are we going to meet the minimum necessary "
    + "requirements for life? We don't do that either."
  },
  {
    serviceHeader: "Weekend Service",
    serviceDescription: "We definitely don't do that unless we're feeling real "
    + "froggy and we never work on Sunday no matter WHAT. PERIODT."
  },
  {
    serviceHeader: "Difficult Equipment Replacements",
    serviceDescription: "That sounds hard, we're not doing that."
  },
  {
    serviceHeader: "Equipment Brand Variety",
    serviceDescription: "We don't install anything other than Armstrong Air."
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
          <p>At Slone Heating and Air we offer equipment replacements using the
          following trustworthy brands: </p>
          <animated.img style={img0} src={armstrong} id="armstrong-logo"
          class="logo" alt="armstrong logo"/>
          <br/>
          <animated.img style={img1} src={concord} id="concord-logo"
          class="logo" alt="concord logo"/>
          <br/>
          <animated.img style={img2} src={nuCalgon} id="nuCalgon-logo"
          class="logo" alt="Nu-Calgon logo"/>
        </div>
        <div id="testimonials" class="content-section">
          <h2>Testimonials <FontAwesomeIcon icon="comments"/></h2>
          <div className="line"/>
          <Testimonials/>
        </div>
        <div id="services" class="content-section">
          <h2>Services <FontAwesomeIcon icon="tools"/></h2>
          <div className="line"/>
          <div id="services-content">
            {services.map((element) =>
              <Service serviceHeader={element.serviceHeader}
              serviceDescription={element.serviceDescription}/>
            )}
          </div>
          <i>We reserve the right to not do anything we don't want to</i>
        </div>
        <div id="contact" class="content-section">
          <h2>Contact <FontAwesomeIcon icon="envelope"/></h2>
          <div className="line"/>
          <p>To contact us, fill out the following form and A-Aron will visit
          you in the middle of the night when you least expect it!</p>
          <div>
            <Contact/>
          </div>
          <i>This form does not actually do anything yet</i>
        </div>
      </div>
      <footer id="footer">
        <p>This website is still under construction <FontAwesomeIcon icon="wrench"/></p>
      </footer>
    </div>
  )
}

function Testimonials() {

  // testimonial component props
  const testimonials = [{
    testimonial: "They were good AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    customer: "Big Clarence"
  },
  {
    testimonial: "Leave me alone",
    customer: "Gauge Adams"
  },
  {
    testimonial: "They're my favorite HVAC company",
    customer: "Aaron Slone"
  },
  {
    testimonial: "I like them as well",
    customer: "Ajjea Slone"
  },
  {
    testimonial: "An excellent company ran by an excellent baby boy",
    customer: "Aaron's Mom"
  },
  {
    testimonial: "The equipment they install is excellent quality",
    customer: "Tim Jenks"
  },
  {
    testimonial: "Southern Comfort's hoodies are better",
    customer: "Anonymous Employee"
  },
  {
    testimonial: "EeeEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeeeeeeeEEEEEEEEEEEEEEEEEEe"
    + "eeEeeeEEeeEEeeEeeEEeeEEeeEEeEEEEEEEEEEeeEeeeeeeEeeEeeEe",
    customer: "Mini Me"
  }]

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [showTestimonial, setShowTestimonial] = useState(true)

  const fade = useSpring({
    from: {opacity: 1},
    to: {opacity: showTestimonial},
    delay: 300
  });

  const previousTestimonial = () => {
    if (activeTestimonial === 0) {

    } else {
      setShowTestimonial(0)
      setTimeout(() => {setActiveTestimonial(activeTestimonial - 1)}, 750)
      setTimeout(() => {setShowTestimonial(1)}, 750)
    }
  }

  const nextTestimonial = () => {
    if (activeTestimonial === testimonials.length - 1) {

    } else {
      setShowTestimonial(0)
      setTimeout(() => {setActiveTestimonial(activeTestimonial + 1)}, 750)
      setTimeout(() => {setShowTestimonial(1)}, 750)
    }
  }

  return (
    <div id="testimonials-content-wrapper">
      <div id="testimonials-content">
        <animated.div className="testimonial" style={fade}>
          <div class="quote-left-wrapper">
            <FontAwesomeIcon icon="quote-left" size="lg"/>
          </div>
          <p><i> {testimonials[activeTestimonial].testimonial} </i></p>
          <div class="quote-right-wrapper">
            <FontAwesomeIcon icon="quote-right" size="lg"/>
          </div>
          <div className="testimonial-line-wrapper">
            <div className="testimonial-line"/>
          </div>
          <p>- {testimonials[activeTestimonial].customer}</p>
        </animated.div>
        <div id="testimonials-controls">
          <FontAwesomeIcon className="testimonial-button" icon="arrow-left" onClick={previousTestimonial} size="2x"/>
          <FontAwesomeIcon className="testimonial-button" icon="arrow-right" onClick={nextTestimonial} size="2x"/>
        </div>
      </div>
    </div>
  )
}

function Service(props) {
  const [visible, setVisible] = useState(false)

  const fadeIn = useSpring({
    from: {opacity: 0},
    to: {opacity: visible ? 1 : 0},
    delay: 300
  });

  const onChange = function (isVisible) {
    if (isVisible) {
      setVisible(true)
    }
  }

  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      <animated.div className="service" style={fadeIn}>
        <h2>{props.serviceHeader}</h2>
        <p>{props.serviceDescription}</p>
      </animated.div>
    </VisibilitySensor>
  )
}

function Contact() {
  return (
    <div id="contact-form-wrapper">
      <form id="contact-form" method="post">
        <div id="form-group">
          <div  className="contact-form-element">
            <label for="name"/>
            <input type="text" id="name" name="contact-name"
            placeholder="Name"/>
          </div>
          <div  className="contact-form-element">
            <label for="email"/>
            <input type="text" id="email" name="contact-email"
            placeholder="Email"/>
          </div>
          <div className="contact-form-element">
            <label for="address"/>
            <input type="text" id="address" name="contact-address"
            placeholder="Address"/>
          </div>
          <div className="contact-form-element">
            <label for="info"/>
            <textarea type="text" id="info" name="contact-info"
            placeholder="Message" style={{"resize": "none"}}/>
          </div>
          <div id="contact-form-button" className="contact-form-element"
          placeholder="Info">
            <button type="submit">Contact</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App;
