import React, { useEffect, useState } from "react";
import arrow from "./../../assets/icons/down-arrow-white.webp";
// Import Swiper React components
import "swiper/css";
import "swiper/css/navigation";
import Swiper from "swiper";
import Navigation from "swiper/modules";

const VerticalCarousel = ({ className, heading, children }) => {
  const slide = document.getElementsByClassName("swiper-slide");
  const [firstActive, setFirstActive] = useState(false);
  const [lastActive, setLastActive] = useState(false);
  // Define a function to be called when the class list of slide[0] changes
  const handleFirstSlideClassChange = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        setFirstActive(slide[0].classList.contains("swiper-slide-active"));

        // console.log(slide[0]);
        break; // Only log once when the class list changes
      }
    }
  };

  // Define a function to be called when the class list of slide[slide.length - 1] changes
  const handleLastSlideClassChange = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        setLastActive(
          slide[slide.length - 2].classList.contains("swiper-slide-active")
        );
        break; // Only log once when the class list changes
      }
    }
  };

  useEffect(() => {
    // Create a new MutationObserver instance for slide[0]
    const firstSlideObserver = new MutationObserver(
      handleFirstSlideClassChange
    );

    // Start observing changes to the attributes of slide[0]
    firstSlideObserver.observe(slide[0], { attributes: true });

    // Create a new MutationObserver instance for slide[slide.length - 1]
    const lastSlideObserver = new MutationObserver(handleLastSlideClassChange);

    // Start observing changes to the attributes of slide[slide.length - 1]
    lastSlideObserver.observe(slide[slide.length - 1], { attributes: true });

    // Clean up the observers when the component unmounts
    return () => {
      firstSlideObserver.disconnect();
      lastSlideObserver.disconnect();
    };
  });

  return (
    <div className={`${className} vertical-carousel`}>
      <div className="text-subtitle-1 font-semibold text-black">{heading}</div>
      <div
        onClick={() =>
          document.getElementsByClassName("swiper-button-prev")[0].click()
        }
        className={`cursor-pointer${
          firstActive ? " opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <img src={arrow} className="rotate-180 mx-auto" alt="" />
      </div>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        slidesPerView={2}
        className="mySwiper"
      >
        {children}
      </Swiper>

      <div
        onClick={() =>
          document.getElementsByClassName("swiper-button-next")[0].click()
        }
        className={`cursor-pointer${
          lastActive ? " opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <img src={arrow} alt="" className="mx-auto" />
      </div>
    </div>
  );
};

export default VerticalCarousel;
