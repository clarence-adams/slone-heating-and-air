import { useState } from "react";
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from "react-visibility-sensor";

function Services() {
  const services = [{
    serviceHeader: "Annual Maintenance Plans",
    serviceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing"
    + " elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    + " aliqua. Sagittis eu volutpat odio facilisis mauris sit amet. Vitae"
    + " semper quis lectus nulla at volutpat diam ut venenatis. Mi tempus"
    + " imperdiet nulla malesuada pellentesque elit eget gravida cum. Velit"
    + " dignissim sodales ut eu. Cras tincidunt lobortis feugiat vivamus."
    + " Donec pretium vulputate sapien nec sagittis. Mauris rhoncus aenean"
    + " vel elit."
  },
  {
    serviceHeader: "24 Hour Express Service",
    serviceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing"
    + " elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    + " aliqua. Sagittis eu volutpat odio facilisis mauris sit amet. Vitae"
    + " semper quis lectus nulla at volutpat diam ut venenatis. Mi tempus"
    + " imperdiet nulla malesuada pellentesque elit eget gravida cum. Velit"
    + " dignissim sodales ut eu. Cras tincidunt lobortis feugiat vivamus."
    + " Donec pretium vulputate sapien nec sagittis. Mauris rhoncus aenean"
    + " vel elit."
  },
  {
    serviceHeader: "Weekend Service",
    serviceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing"
    + " elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    + " aliqua. Sagittis eu volutpat odio facilisis mauris sit amet. Vitae"
    + " semper quis lectus nulla at volutpat diam ut venenatis. Mi tempus"
    + " imperdiet nulla malesuada pellentesque elit eget gravida cum. Velit"
    + " dignissim sodales ut eu. Cras tincidunt lobortis feugiat vivamus."
    + " Donec pretium vulputate sapien nec sagittis. Mauris rhoncus aenean"
    + " vel elit."
  },
  {
    serviceHeader: "Difficult Equipment Replacements",
    serviceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing"
    + " elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    + " aliqua. Sagittis eu volutpat odio facilisis mauris sit amet. Vitae"
    + " semper quis lectus nulla at volutpat diam ut venenatis. Mi tempus"
    + " imperdiet nulla malesuada pellentesque elit eget gravida cum. Velit"
    + " dignissim sodales ut eu. Cras tincidunt lobortis feugiat vivamus."
    + " Donec pretium vulputate sapien nec sagittis. Mauris rhoncus aenean"
    + " vel elit."
  },
  {
    serviceHeader: "Equipment Brand Variety",
    serviceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing"
    + " elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    + " aliqua. Sagittis eu volutpat odio facilisis mauris sit amet. Vitae"
    + " semper quis lectus nulla at volutpat diam ut venenatis. Mi tempus"
    + " imperdiet nulla malesuada pellentesque elit eget gravida cum. Velit"
    + " dignissim sodales ut eu. Cras tincidunt lobortis feugiat vivamus."
    + " Donec pretium vulputate sapien nec sagittis. Mauris rhoncus aenean"
    + " vel elit."
  },
  {
    serviceHeader: "Duct Cleaning / Sanitization",
    serviceDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing"
    + " elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    + " aliqua. Sagittis eu volutpat odio facilisis mauris sit amet. Vitae"
    + " semper quis lectus nulla at volutpat diam ut venenatis. Mi tempus"
    + " imperdiet nulla malesuada pellentesque elit eget gravida cum. Velit"
    + " dignissim sodales ut eu. Cras tincidunt lobortis feugiat vivamus."
    + " Donec pretium vulputate sapien nec sagittis. Mauris rhoncus aenean"
    + " vel elit."
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
      <h3>{props.serviceHeader}</h3>
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
