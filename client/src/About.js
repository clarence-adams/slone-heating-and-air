import { useSpring, animated } from 'react-spring';
import armstrong from './images/armstrong-air.png';
import concord from './images/concord-air.png';
import nuCalgon from './images/nu-calgon.png';

function About() {
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

  return (
    <div id="about-logos">
      <animated.img style={img0} src={armstrong} id="armstrong-logo"
      class="logo" alt="armstrong logo"/>
      <br/>
      <animated.img style={img1} src={concord} id="concord-logo"
      class="logo" alt="concord logo"/>
      <br/>
      <animated.img style={img2} src={nuCalgon} id="nuCalgon-logo"
      class="logo" alt="Nu-Calgon logo"/>
    </div>
  )
}

export default About;
