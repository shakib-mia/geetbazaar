import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { BsExclamationTriangle } from "react-icons/bs";

const TimerCircle = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <BsExclamationTriangle className="text-interactive-light-destructive mx-auto text-[5rem] mb-3" />
      <p>
        Your yearly plan has expired. You will be redirected to the plans page.
      </p>
      <div className="flex justify-center">
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
      </div>
    </div>
  );
};

export default TimerCircle;
