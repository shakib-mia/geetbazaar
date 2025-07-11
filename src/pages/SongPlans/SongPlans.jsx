import React, { useContext, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Button from "../../components/Button/Button";
// import * as ReactOwlCarousel from "react-owl-carousel";
import { SiAirtel } from "react-icons/si";
import razorpay from "./../../assets/icons/razorpay.png";

import bsnl from "../../assets/icons/bsnl.webp";
import idea from "../../assets/icons/idea.webp";
import jio from "../../assets/icons/jio.webp";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ProfileContext } from "../../contexts/ProfileContext";
import { PlanContext } from "../../contexts/PlanContext";
import FeatureTable from "../../components/FeatureTable/FeatureTable";

const SongPlans = ({ handleRazorpayPayment, setPlanName }) => {
  const navigate = useNavigate();
  const [modal, showModal] = useState(false);
  const [price, setPrice] = useState(0);
  const { setPlanStore } = useContext(PlanContext);

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };
  // const handlePrevClick = () => {
  //   document.querySelector(".song-plans .owl-prev").click();
  // };

  // const handleNextClick = () => {
  //   document.querySelector(".song-plans .owl-next").click();
  // };

  return (
    <div className="overflow-hidden py-5 px-[10px] relative song-plans">
      <div className="flex gap-3 justify-center items-center w-fit mx-auto">
        <Button
          containerClassName={"!h-fit !w-fit flex items-center z-10"}
          className={
            "text-white w-4 h-4 lg:w-6 lg:!h-6 !px-0 !py-0 flex items-center justify-center"
          }
          onClick={handlePrevClick}
          id="plans-prev"
          disabled={false}
        >
          {/* <FaArrowRight className="text-heading-5" /> */}
          <FaChevronLeft className="text-heading-6" />
        </Button>

        <p>Swipe For More</p>

        <Button
          containerClassName={"!h-fit !w-fit flex items-center z-10"}
          className={
            "text-white w-4 h-4 lg:w-6 lg:!h-6 !px-0 !py-0 flex items-center justify-center"
          }
          onClick={handleNextClick}
          id="plans-next"
          disabled={false}
        >
          {/* <FaArrowRight className="text-heading-5" /> */}
          <FaChevronRight className="text-heading-6" />
        </Button>
      </div>
      {/* <ReactOwlCarousel
        // onChange={handleSlideChange}
        loop={true}
        autoplayHoverPause
        navigation="true"
        nav
        responsive={{
          0: {
            items: 1,
            startPosition: 1,
          },
          768: {
            items: 2,
          },
          1280: {
            items: 3,
          },
        }}
        className="py-6 !overflow-hidden text-grey-dark xl:!w-5/6 mx-auto"
      >
        <div className="!h-full p-4 shadow-lg mx-2 relative">
          <div
            className="py-1 px-2 absolute rounded-full flex gap-1 text-paragraph-1"
            style={{ top: -11, right: 16 }}
            id="special"
          >
            <div className="w-4 text-paragraph-1 flex justify-center items-center bg-interactive-light aspect-square text-white rounded">
              <FaFacebookF />
            </div>
            <div className="w-4 text-paragraph-1 flex justify-center items-center bg-interactive-light aspect-square text-white rounded">
              <FaYoutube />
            </div>
            <div className="w-4 text-paragraph-1 flex justify-center items-center bg-interactive-light aspect-square text-white rounded">
              <FaInstagram />
            </div>
          </div>
          <div className="h-full flex flex-col justify-between">
            <aside>
              <h4 className="text-heading-4 font-bold">BackVision Social</h4>
              <h5 className="text-heading-5-bold text-grey mt-2">Free</h5>

              <ul className="flex flex-col gap-1 mt-4">
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    YouTube Content ID, YouTube Music & YouTube Shorts Covered
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Monetize Your Music in Facebook & Instagram
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Get Your Music in Triller, Snapchat & TikTok)
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Schedule Your Own Release Date
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Free Custom Label</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    100% Copyright Will Be Yours
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Get 80% Revenue from the Streamings
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    BackVision Pro Dashboard with Detailed analytics
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Get lifetime support with zero yearly cost
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Advanced revenue reports</aside>
                </li>
              </ul>
            </aside>

            <Button
              text={"Get Started"}
              className={"w-full justify-center"}
              onClick={() => {
                setPrice(0);
                setPlanName("forevision-social");
                setPlanStore((prev) => ({
                  ...prev,
                  planName: "BackVision-social",
                  price: 0,
                }));
                navigate("/song-upload?foreVision-social?0");
              }}
            ></Button>
          </div>
        </div>
        <div className="!h-full p-4 rounded-lg mx-2 bg-gradient-to-br from-secondary to-interactive-light-focus text-white shadow-[0_13px_20px_#aaa] relative -top-3">
          <div
            className="bg-interactive-light-destructive-focus text-white py-1 px-2 inline-block absolute rounded-full"
            style={{ top: -20, right: 16 }}
            id="special"
          >
            ⭐⭐ Best Rated ⭐⭐
          </div>

          <div className="h-full flex flex-col justify-between">
            <aside>
              <h4 className="text-heading-4 font-bold">BackVision CRBT+</h4>
              <h5 className="text-heading-5-bold text-grey-light mt-2">
                &#8377;699
              </h5>

              <ul className="flex flex-col gap-1 mt-4">
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Caller Tunes On JIO, Vi, BSNL & Airtel
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Worldwide Reach</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    All International Apps Covered
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    90% Revenue from Streaming platforms
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    85% Revenue from YouTube Platforms
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Schedule Your Own Release Date
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Free Custom Label</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    100% Copyright Will Be Yours
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    YouTube Content ID, YouTube Music & YouTube Shorts Covered
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    BackVision Pro Dashboard with Detailed analytics
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Get lifetime support with zero yearly cost
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Monetize Your Music in Facebook & Instagram
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Lyrics monetization</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Advanced revenue reports</aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Get Lyrics In Facebook, Instagram, Spotify, JioSaavn, Google
                    & More
                  </aside>
                </li>
                <li className="flex gap-2 text-paragraph-1 items-center">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Various marketing tools with Playlisting options
                  </aside>
                </li>
              </ul>
            </aside>

            <Button
              text={"Get Started"}
              containerClassName={"mt-5"}
              className={
                "w-full justify-center bg-white !text-interactive-light hover:bg-white-secondary focus:!bg-white-tertiary"
              }
              onClick={() => {
                setPrice(69900);
                setPlanName("CRBT+");
                setPlanStore((prev) => ({
                  ...prev,
                  planName: "CRBT+",
                  price: 69900,
                }));
                navigate("/song-upload?forevision-crbt+?69900");
              }}
            ></Button>
          </div>
        </div>
        <div className="!h-full p-4 rounded-lg selection:bg-white selection:text-secondary mx-2 shadow-lg relative">
          <div
            className="bg-interactive-light text-white py-1 px-2 inline-block absolute rounded-full"
            style={{ top: -11, right: 16 }}
            id="special"
          >
            Pro
          </div>
          <div className="flex h-full flex-col justify-between">
            <aside>
              <h4 className="text-heading-4 font-bold">BackVision Pro</h4>
              <h5 className="text-heading-5-bold text-grey mt-2">&#8377;498</h5>

              <ul className="flex flex-col gap-1 mt-4">
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    All International Apps Covered
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    90% Revenue from Streaming platforms
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    85% Revenue from YouTube Platforms
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Schedule Your Own Release Date
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Free Custom Label</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    100% Copyright Will Be Yours
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    YouTube Content ID, YouTube Music & YouTube Shorts Covered
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    BackVision Pro Dashboard with Detailed analytics
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Get lifetime support with zero yearly cost
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Monetize Your Music in Facebook & Instagram
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Advanced revenue reports</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Various marketing tools with Playlisting options
                  </aside>
                </li>
              </ul>
            </aside>

            <Button
              text={"Get Started"}
              onClick={() => {
                setPrice(49800);
                setPlanName("BackVision Pro");
                setPlanStore((prev) => ({
                  ...prev,
                  planName: "BackVision Pro",
                  price: 49800,
                }));
                navigate("/song-upload?forevision-pro?49800");
              }}
              className={"w-full justify-center"}
              containerClassName={"mt-3"}
            ></Button>
          </div>
        </div>

        <div className="!h-full p-4 shadow-lg rounded-lg mx-2 relative">
          <div
            className="border border-interactive-light-destructive-focus bg-white py-1 px-2 absolute rounded-full flex gap-1"
            style={{ top: -15, right: 16 }}
            id="special"
          >
            <SiAirtel className="text-interactive-light-destructive-focus" />
            <img className="!w-3 !h-3" src={bsnl} alt="bsnl" />
            <img className="!w-3 !h-3" src={idea} alt="idea" />
            <img className="!w-3 !h-3" src={jio} alt="jio" />
          </div>
          <div className="h-full flex flex-col justify-between">
            <aside>
              <h4 className="text-heading-4 font-bold">BackVision CRBT</h4>
              <h5 className="text-heading-5-bold text-grey mt-2">&#8377;499</h5>

              <ul className="flex flex-col gap-1 mt-4">
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Caller Tunes On JIO, Vi, BSNL & Airtel
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    90% Revenue from Streaming platforms
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    85% Revenue from YouTube Platforms
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Schedule Your Own Release Date
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Free Custom Label</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    100% Copyright Will Be Yours
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    YouTube Content ID, YouTube Music & YouTube Shorts Covered
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    BackVision Pro Dashboard with Detailed analytics
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Get lifetime support with zero yearly cost
                  </aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">Advanced revenue reports</aside>
                </li>
                <li className="flex gap-2 items-center text-paragraph-1">
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">
                    Various marketing tools with Playlisting options
                  </aside>
                </li>
              </ul>
            </aside>
            <Button
              text={"Get Started"}
              className={"w-full justify-center"}
              onClick={() => {
                setPrice(49900);
                setPlanStore((prev) => ({
                  ...prev,
                  planName: "CRBT",
                  price: 49900,
                }));

                setPlanName("CRBT");
                navigate("/song-upload?forevision-crbt?49900");
              }}
            ></Button>
          </div>
        </div>
      </ReactOwlCarousel> */}

      {modal && (
        <Modal>
          <div className="w-11/12 lg:w-1/2 xl:w-1/4 h-3/4 bg-white m-auto relative p-2 rounded-lg">
            <button
              className="absolute -top-5 -right-5 text-heading-4 text-interactive-light-destructive-focus"
              onClick={() => showModal(false)}
            >
              &times;
            </button>

            <h5 className="text-heading-5-bold text-white-secondary bg-primary absolute top-0 left-0 w-full p-2 rounded-t-lg">
              Select Your Payment Method
            </h5>

            <button
              className="w-full flex justify-center py-2 border-2 border-primary rounded-full mt-6"
              onClick={() => {
                handleRazorpayPayment(price);
                // setTimeout(() => showModal(false), 1000);
                setTimeout(() => {
                  showModal(false);
                }, 700);
              }}
            >
              <img src={razorpay} alt="razorpay" className="w-1/3" />
            </button>

            {/* <button
            className="w-full flex justify-center py-2 border-2 border-secondary-dark rounded-full my-2"
            onClick={() => handlePhonePePayment(99900)}
          >
            <img src={phonepe} alt="phonepe" className="w-1/3" />
          </button> */}

            {/* <button
            className="w-full flex justify-center py-2 border-2 border-secondary-dark rounded-full mt-2"
            // onClick={() => handleRazorpayPayment(99900)}
          >
            <img src={paypal} alt="paypal" className="w-1/3" />
          </button> */}

            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons />
            </PayPalScriptProvider>
          </div>
        </Modal>
      )}

      <FeatureTable />
    </div>
  );
};

export default SongPlans;
