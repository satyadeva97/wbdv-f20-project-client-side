import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ButtonPlay,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import JobsCardComponent from "./JobsCardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

class JobCarouselComponent extends React.Component {
  onResize = () => {
    this.setState({ isMobile: window.innerWidth < 600 });
  };

  componentDidMount() {
    this.onResize = this.onResize.bind(this);

    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize, true);
  }

  state = {
    isMobile: false,
  };

  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={300}
        visibleSlides={this.state.isMobile ? 1 : 3}
        step={1}
        totalSlides={this.props.slides.length}
        infinite
        className="carousel"
        interval={2000}
        isPlaying={this.props.autoPlay}
        isIntrinsicHeight
      >
        <div className="carousel-content">
          <ButtonBack className="transparent-button transparent-button-back">
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </ButtonBack>
          <Slider className="slider" classNameTrayWrap="">
            {this.props.slides.map((job, index) => {
              return (
                <Slide
                  tag="div"
                  innerClassName="align-items-center d-flex justify-content-center"
                  index={index}
                  key={index}
                >
                  <JobsCardComponent job={job} />
                </Slide>
              );
            })}
          </Slider>
          <ButtonNext className="transparent-button transparent-button-next">
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </ButtonNext>
          <ButtonPlay
            className="transparent-button transparent-button-play"
            childrenPaused={<FontAwesomeIcon icon={faPlayCircle} />}
          />
        </div>
      </CarouselProvider>
    );
  }
}

JobCarouselComponent.defaultProps = {
  slides: [],
  autoPlay: true,
};

export default JobCarouselComponent;
