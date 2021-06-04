import { useState } from "react";
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  const [activeTestimonialX, setActiveTestimonialX] = useState(0)
  const [isImmediate, setIsImmediate] = useState(false)

  const slide = useSpring({
    immediate: isImmediate,
    to: {translateX: activeTestimonialX + "%"},
  });

  const nextTestimonial = () => {
    if (activeTestimonial !== testimonials.length - 1) {
      setActiveTestimonialX(-110)
      setTimeout(() => {
        setActiveTestimonial(activeTestimonial + 1)
        setIsImmediate(true)
        setActiveTestimonialX(110)
        setIsImmediate(false)
        setActiveTestimonialX(0)
      }, 300)
    }
  }
  const previousTestimonial = () => {
    if (activeTestimonial !== 0) {
      setActiveTestimonialX(110)
      setTimeout(() => {
        setActiveTestimonial(activeTestimonial - 1)
        setIsImmediate(true)
        setActiveTestimonialX(-110)
        setIsImmediate(false)
        setActiveTestimonialX(0)
      }, 300)
    }
  }

  return (
    <div id="testimonials-content-wrapper">
      <div id="testimonials-content">
        <animated.div className="testimonial" style={slide}>
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
          <FontAwesomeIcon id="arrow-left" className="testimonial-button"
          icon="arrow-left" onClick={previousTestimonial} size="2x"/>
          <FontAwesomeIcon id="arrow-right" className="testimonial-button"
          icon="arrow-right" onClick={nextTestimonial} size="2x"/>
        </div>
      </div>
    </div>
  )
}

export default Testimonials;
