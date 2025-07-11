import React from "react";
// import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import bg from "../../assets/images/login-bg.jpg";

const AuthSlider = () => {
  return (
    <Swiper
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay
      className="h-full"
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
    >
      <SwiperSlide>
        <img
          src={bg}
          alt="background"
          className="!w-full !h-full object-cover object-[7%] rounded-md aspect-square"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={
            "https://t4.ftcdn.net/jpg/07/62/21/69/360_F_762216992_HjUZb565ohcpBh6R2rtal3JlOEf94XSX.jpg"
          }
          alt="background"
          className="!w-full !h-full object-cover object-center rounded-md aspect-square"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={
            "https://as1.ftcdn.net/v2/jpg/10/97/26/64/1000_F_1097266431_IG7QdOTzN4kgYRCCqEqTv3A5ZXDdxllx.jpg"
          }
          alt="background"
          className="!w-full !h-full object-cover object-right rounded-md aspect-square"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default AuthSlider;
