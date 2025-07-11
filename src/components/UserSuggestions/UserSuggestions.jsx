import React from "react";
import SuggestedUser from "../SuggestedUser/SuggestedUser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// import * as ReactOwlCarousel from "react-owl-carousel";

const UserSuggestions = () => {
  return (
    <div className="overflow-x-hidden">
      <h5 className="text-heading-5-bold">People You May Know</h5>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mt-2"
      >
        <SwiperSlide>
          <SuggestedUser />
        </SwiperSlide>
        <SwiperSlide>
          <SuggestedUser />
        </SwiperSlide>
        <SwiperSlide>
          <SuggestedUser />
        </SwiperSlide>
        <SwiperSlide>
          <SuggestedUser />
        </SwiperSlide>
        <SwiperSlide>
          <SuggestedUser />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default UserSuggestions;
