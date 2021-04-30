import './App.css';
import logo from './images/logo.png';
import armstrong from './images/armstrong-air.png';

function App() {
  return (
    <div className="App">
      <header>
        <h1><img id="logo" src={logo} alt="logo"/></h1>
      </header>
      <div id="content">
        <div id="navbar">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>
        <div id="about">
          <p>At Slong heating and air we offer full system replacements.</p>
        </div>
        <div id="services">
          <h2>Services</h2>
          <div className="line"/>
          <p> We do
          not offer the following services:</p>
          <ul>
            <li>We don't do maintenances</li>
            <li>We don't offer 24 hour service</li>
            <li>We don't work weekends</li>
            <li>We don't install anything other than Armstrong Air</li>
            <img src={armstrong} id="armstrong-logo" alt="armstrong logo"/>
            <li>We reserve the right to not do anything we don't want to</li>
          </ul>
        </div>
        <div id="testimonials">
          <h2>Testimonials</h2>
          <div className="line"/>
          <p>They were good - Big Clarence</p>
        </div>
        <div id="contact">
          <h2>Contact</h2>
          <div className="line"/>
          <p>To schedule a service call please call A-Aron</p>
          <i>Or don't, whatever</i>
        </div>
      </div>
      <footer id="footer">
        <p>This website is still under construction</p>
      </footer>
    </div>
  )
}

export default App;
