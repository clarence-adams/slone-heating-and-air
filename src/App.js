import './App.css';
import logo from './images/logo.png';
import armstrong from './images/armstrong-air.png';
import concord from './images/concord-air.png';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faQuoteRight,
  faQuoteLeft,
  faAddressCard,
  faTools,
  faComments,
  faEnvelope,
  faWrench
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faQuoteRight,
  faQuoteLeft,
  faAddressCard,
  faTools,
  faComments,
  faEnvelope,
  faWrench
)

function App() {
  const img0 = useSpring(
    {
      to: { opacity: 1 },
      from: { opacity: 0 },
      delay: 500
    }
  )
  const img1 = useSpring(
    {
      to: { opacity: 1 },
      from: { opacity: 0 },
      delay: 1000
    }
  )

  return (
    <div className="App">
      <header>
        <h1><img id="logo" src={logo} alt="logo"/></h1>
        <div id="navbar">
          <a class="nav-button" href="#about">About</a>
          <a class="nav-button" href="#services">Services</a>
          <a class="nav-button" href="#testimonials">Testimonials</a>
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
        <div id="testimonials" class="content-section">
          <h2>Testimonials <FontAwesomeIcon icon="comments"/></h2>
          <div className="line"/>
          <p><FontAwesomeIcon icon="quote-left"/> They were good <FontAwesomeIcon icon="quote-right"/></p>
          <p>- Big Clarence</p>
        </div>
        <div id="contact" class="content-section">
          <h2>Contact <FontAwesomeIcon icon="envelope"/></h2>
          <div className="line"/>
          <p>To schedule a service call please call A-Aron</p>
          <i>Or don't, whatever</i>
        </div>
      </div>
      <footer id="footer">
        <p>This website is still under construction <FontAwesomeIcon icon="wrench"/></p>
      </footer>
    </div>
  )
}

export default App;
