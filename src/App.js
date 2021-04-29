import './App.css';
import logo from './images/logo.png';
import armstrong from './images/armstrong-air.jpg';

function App() {
  return (
    <div className="App">
      <header>
        <h1><img src={logo} alt="logo"/></h1>
      </header>
      <div className="navbar">

      </div>
      <article>
        <p>At Slowne heating and cooling we offer full system replacements. We do
        not offer the following services:</p>
        <ul>
          <li>We don't do maintenances</li>
          <li>We don't offer 24 hour service</li>
          <li>We don't work weekends</li>
          <li>We don't install anything other than Armstrong Air</li>
          <img src={armstrong} id="armstrong-logo" alt="armstrong logo"/>
          <li>We reserve the right to not do anything we don't want to</li>
        </ul>
        <p>To schedule a service call please call A-Aron</p>
        <i>Or don't, whatever</i>
      </article>
      <footer>
        <p>This website is still under construction</p>
      </footer>
    </div>
  )
}

export default App;
