import React, { Component } from "react";
import "./css/customslider.css"; // Import your custom CSS for the carousel

class CustomSlider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentIndex: 0,
      };
    }
  
    componentDidMount() {
      this.startAutoplay();
    }
  
    componentWillUnmount() {
      this.stopAutoplay();
    }
  
    startAutoplay = () => {
      this.autoplayInterval = setInterval(this.nextSlide, 4000);
    };
  
    stopAutoplay = () => {
      clearInterval(this.autoplayInterval);
    };
  
    nextSlide = () => {
      this.setState((prevState) => ({
        currentIndex: (prevState.currentIndex + 1) % 10, // Total number of slides
      }));
    };
  
    render() {
        const { currentIndex } = this.state;
        const numSlides = 10; // Total number of slides
        
        return (
          <div className="custom-slider">
            <div className="slider">
            {Array.from({ length: numSlides }).map((_, index) => {
  return (
    <div
      key={index}
      className={`slide ${currentIndex === index ? 'active' : ''}`}
      style={{
        transform: `translateX(${(index - currentIndex) * 100}%)`,
      }}
    >
      <h3>{(index + 1)}</h3>
    </div>
  );
})}
            </div>
          </div>
        );
      }}

export default CustomSlider;