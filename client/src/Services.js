import { useState } from "react";
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from "react-visibility-sensor";

function Services() {
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
    + "froggy and we never work on Sunday no matter WHAT."
  },
  {
    serviceHeader: "Difficult Equipment Replacements",
    serviceDescription: "That sounds hard, we're not doing that."
  },
  {
    serviceHeader: "Equipment Brand Variety",
    serviceDescription: "We don't install anything other than Armstrong Air."
  },
  {
    serviceHeader: "Duct Cleaning / Sanitization",
    serviceDescription: "We don't own that expensive machine."
  }]

  function Service(props) {
    const [visible, setVisible] = useState(false)

    const fadeIn = useSpring({
      from: {opacity: 0},
      to: {opacity: visible ? 1 : 0},
      delay: 300
    });

    const onChange = (isVisible) => {
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

  return (
    <div id="services-content-wrapper">
      <div id="services-content">
      {services.map((element, index) =>
        <Service serviceHeader={element.serviceHeader}
        serviceDescription={element.serviceDescription} key={index}/>
      )}
      </div>
    </div>
  )
}

export default Services;
