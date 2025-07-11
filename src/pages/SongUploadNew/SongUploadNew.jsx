import React, { useContext, useEffect, useState } from "react";
import SongUploadFormContainer from "../../components/SongUploadFormContainer/SongUploadFormContainer";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SongUploadProgress from "../../components/SongUploadProgress/SongUploadProgress";
import { ProfileContext } from "../../contexts/ProfileContext";
import { checkTheDateIsBefore } from "../../utils/checkTheDateIsBefore";
import { BsExclamationTriangle } from "react-icons/bs";
import TimerCircle from "../../components/TimerCircle/TimerCircle";
import axios from "axios";
import { backendUrl } from "../../constants";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const SongUploadNew = () => {
  const [screen, setScreen] = useState("albumDetails");
  const location = useLocation();
  const { userData, token } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    if (location.pathname.split("/")[1] !== "edit-song") {
      if (userData?.user_email) {
        console.log(userData);
        if (userData.yearlyPlanEndDate) {
          if (checkTheDateIsBefore(userData.yearlyPlanEndDate)) {
            navigate("/album-upload");
          } else {
            // যদি location.search এ প্ল্যান ডাটা থাকে, তাহলে setShowTimer কল হবে না এবং plans পেজে নেভিগেট হবে না
            if (location.search.length === 0) {
              setShowTimer(true);

              const timeout = setTimeout(() => {
                navigate("/plans");
              }, 5000);

              return () => clearTimeout(timeout); // Cleanup function
            }
          }
        } else {
          console.log(location.search);
          if (location.search.length === 0) {
            navigate("/plans");
          }
        }
      }
    }
  }, [userData, location.pathname, navigate]); // Proper dependencies

  return (
    <div className="lg:pt-6 pt-2 px-1">
      {location.pathname.split("/")[1] !== "edit-song" && (
        <h4 className="text-heading-5-bold lg:text-heading-4-bold text-grey capitalize mt-6 lg:mt-2">
          Plan :{" "}
          {location.search.split("?")[1]?.includes("-")
            ? location.search.split("?")[1]?.split("-")?.join(" ")
            : location.search.split("?")[1]}
        </h4>
      )}

      <SongUploadProgress screen={screen} setScreen={setScreen} />

      <SongUploadFormContainer screen={screen} setScreen={setScreen} />

      {/* Show the timer directly here */}
      {showTimer && (
        <div className="text-center mt-6 fixed top-0 left-0 w-screen h-screen z-[999999999] backdrop-blur flex justify-center items-center">
          <div className="bg-white w-1/3 py-7 shadow-lg rounded">
            <BsExclamationTriangle className="text-interactive-light-destructive mx-auto text-[5rem] mb-3" />
            <p>
              Your yearly plan has expired. You will be redirected to the plans
              page.
            </p>
            <div className="flex justify-center mt-4">
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
        </div>
      )}
    </div>
  );
};

export default SongUploadNew;
