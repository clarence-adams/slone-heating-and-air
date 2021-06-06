import './App.css';
import About from "./About.js";
import Testimonials from "./Testimonials.js";
import Services from "./Services.js";
import Contact from "./Contact.js";
import logo from './images/logo2.png';
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
  return (
    <div className="App">
      <header>
        <h1><img id="logo" src={logo} alt="logo"/></h1>
        <div id="navbar">
          <a className="nav-button" href="#about">About</a>
          <a className="nav-button" href="#testimonials">Testimonials</a>
          <a className="nav-button" href="#services">Services</a>
          <a className="nav-button" href="#contact">Contact</a>
        </div>
      </header>
      <div id="content">
        <div id="about" className="content-section">
          <h2>About Us <FontAwesomeIcon icon="address-card"/></h2>
          <div className="line"/>
          <div className="loose-text-wrapper">
            <p className="loose-text">At Slone Heating and Air we offer equipment
            replacements using the following trustworthy brands: </p>
          </div>
          <About/>
        </div>
        <div id="testimonials" className="content-section">
          <h2>Testimonials <FontAwesomeIcon icon="comments"/></h2>
          <div className="line"/>
          <Testimonials/>
        </div>
        <div id="services" className="content-section">
          <h2>Services <FontAwesomeIcon icon="tools"/></h2>
          <div className="line"/>
          <Services/>
          <div className="loose-text-wrapper">
            <i className="loose-text">We reserve the right to not do anything we
            don't want to</i>
          </div>
        </div>
        <div id="contact" className="content-section">
          <h2>Contact <FontAwesomeIcon icon="envelope"/></h2>
          <div className="line"/>
          <div className="loose-text-wrapper">
            <p className="loose-text">To contact us, fill out the following form and
             A-Aron will visityou in the middle of the night when you least
             expect it!</p>
          </div>
          <div>
            <Contact/>
          </div>
        </div>
      </div>
      <footer id="footer">
        <p>This website is still under construction <FontAwesomeIcon
        icon="wrench"/></p>
      </footer>
    </div>
  )
}

export default App;
