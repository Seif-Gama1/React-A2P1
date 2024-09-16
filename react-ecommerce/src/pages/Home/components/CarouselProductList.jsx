import React, { Component, memo } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { FaArrowCircleRight,FaArrowCircleLeft } from "react-icons/fa";

// export default function MySlider() {
const MySlider = () => {
  return (
    <CarouselProvider
      className="w-[96%] mx-auto mt-40 pb-0 relative"
      naturalSlideWidth={400}
      naturalSlideHeight={160}
      totalSlides={2}
      isPlaying={true}
      interval={4000}
      infinite={true}
    > 
      <Slider>

        <Slide index={0}>
          <div>
            <img className="rounded-md w-full" src="/images/2484120.jpg" alt="pic2"/>
            <div className="absolute top-[10%] lg:top-[40%] left-[50%] lg:left-[70%] items-center text-[#a41515] text-lg lg:text-3xl font-bold">
              <h2>SHOP ONLINE !</h2>
              <h1 className="mt-5">SALES UP TO 70%</h1>
              <button type="button" className="text-white bg-[#a41515] mt-5 rounded px-6 py-3">
                  <a href="#">SHOP NOW</a> 
              </button>
            </div>
          </div>
        </Slide>
  
        <Slide index={1}>
          <div>
            <img className="rounded-md w-full" src="/images/1496231.jpg" alt="pic1"/>
            <div className="absolute top-[10%] lg:top-[35%] left-[4.5%] items-center text-[#1864c7] text-lg lg:text-3xl font-bold">
              <h2>Experience Shopping Like Never Before</h2>
              <h1 className="mt-5">SALES UP TO 70%</h1>
              <button type="button" className="text-white bg-[#1864c7] mt-5 rounded px-6 py-3">
                  <a href="#">SHOP NOW</a> 
              </button>
            </div>
          </div>
        </Slide>

      </Slider>      

      <ButtonBack className="align-middle absolute top-[45%]">
        <FaArrowCircleLeft color="#fff" size={50}/>
      </ButtonBack>
      
      <ButtonNext className="align-middle absolute right-0 top-[45%]">
        <FaArrowCircleRight color="#fff" size={50}/>
      </ButtonNext>

    </CarouselProvider>
  );
}

export default memo(MySlider);