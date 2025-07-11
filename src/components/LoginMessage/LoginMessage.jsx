import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { GrAd } from "react-icons/gr";
import caution from "./../../assets/images/announcement.png";

const LoginMessage = () => {
  return (
    <div className="fixed left-0 top-0 bg-[#000a2a] bg-opacity-70 w-screen h-screen flex justify-center items-center pb-3 lg:pt-0 lg:items-center">
      <div className="w-10/12 xl:w-1/2 bg-white p-5 rounded-xl shadow-xl lg:justify-center h-fit items-center flex flex-col lg:flex-row lg:gap-2 pl-0 pr-0 lg:pr-5 py-0 lg:pt-4 pt-0">
        <img src={caution} alt="caution" className="w-3/4 lg:w-1/2" />

        <aside className="flex flex-col items-center gap-2 p-2 px-1 lg:px-2 lg:p-0 w-full lg:w-1/2">
          <p className="mx-auto text-center lg:text-heading-6 text-grey-dark flex leading-6 lg:leading-8">
            Thank you for being a part of our journey! We’re constantly working
            to provide you with the best experience. However, if you face any
            issues while using our application, please don’t hesitate to let us
            know.{" "}
          </p>
          <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={8}
            size={100}
          >
            {({ remainingTime }) => (
              <span className="text-heading-4-bold text-grey-dark">
                {remainingTime}
              </span>
            )}
          </CountdownCircleTimer>
        </aside>
      </div>
    </div>
  );
};

export default LoginMessage;
