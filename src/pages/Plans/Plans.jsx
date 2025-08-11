import React, { useContext, useEffect, useState, useMemo } from "react";
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
import { SiAirtel } from "react-icons/si";
// import * as ReactOwlCarousel from "react-owl-carousel";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";
import { PlanContext } from "../../contexts/PlanContext";
import Button from "../../components/Button/Button";
import Toggle from "../../components/Toggle/Toggle";
import AlbumPlan from "../../components/AlbumPlan/AlbumPlan";
import FeatureTable from "../../components/FeatureTable/FeatureTable";
import { backendUrl } from "./../../constants";

// Import your assets
import bsnl from "../../assets/icons/bsnl.webp";
import idea from "../../assets/icons/idea.webp";
import jio from "../../assets/icons/jio.webp";
// import razorpay from "../../assets/icons/razorpay.png";
import LoadingPulse from "../../components/LoadingPulse/LoadingPulse";
import Steps from "../../components/Steps/Steps";
import Faq from "../../components/Faq/Faq";
import YearlyPlanText from "../../components/YearlyPlanText/YearlyPlanText";
import FeatureList from "../../components/FeatureList/FeatureList";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import * as ReactOwlCarousel from "react-owl-carousel";

const DynamicSongPlans = () => {
  const navigate = useNavigate();
  const { setPlanStore } = useContext(PlanContext);
  const { token, userData, dollarRate, albumToggled } =
    useContext(ProfileContext);

  const [checked, setChecked] = useState(albumToggled);
  const [plans, setPlans] = useState([]);
  // const [dollarRate * 1.5, setDollarRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(plans.);

  // Fetch plans data
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${backendUrl}plans`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPlans(data.slice(0, data.length - 1));
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [token]);

  // Memoized price calculation
  const calculatePrice = useMemo(
    () => (price) => {
      if (!price) return "Free";

      const isIndian =
        userData.billing_country === "India" ||
        !userData ||
        !userData.billing_country;
      const currency = isIndian ? "₹" : "$";
      const amount = isIndian
        ? price / 100
        : ((price * dollarRate * 1.5) / 100).toFixed(2);

      return `${currency}${amount}`;
    },
    [userData.billing_country, dollarRate]
  );

  const handlePrevClick = () => {
    document.querySelector(".song-plans .swiper-button-prev")?.click();
  };

  const handleNextClick = () => {
    document.querySelector(".song-plans .swiper-button-next")?.click();
  };

  const renderSpecialTag = (tag) => {
    switch (tag) {
      case "Facebook, YouTube, Instagram":
        return (
          <div
            className="py-1 px-2 absolute rounded-full flex gap-1 text-paragraph-1"
            style={{ top: -11, right: 16 }}
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
        );
      case "Best Rated":
        return (
          <div
            className="bg-interactive-light-destructive-focus text-white py-1 px-2 inline-block absolute rounded-full"
            style={{ top: -20, right: 16 }}
          >
            ⭐⭐ Best Rated ⭐⭐
          </div>
        );
      case "Pro":
        return (
          <div
            className="bg-interactive-light text-white py-1 px-2 inline-block absolute rounded-full"
            style={{ top: -11, right: 16 }}
          >
            Pro
          </div>
        );
      case "Airtel, BSNL, Vi, Jio":
        return (
          <div
            className="border border-interactive-light-destructive-focus bg-white py-1 px-2 absolute rounded-full flex gap-1"
            style={{ top: -15, right: 16 }}
          >
            <SiAirtel className="text-interactive-light-destructive-focus" />
            <img className="!w-3 !h-3" src={bsnl} alt="bsnl" />
            <img className="!w-3 !h-3" src={idea} alt="idea" />
            <img className="!w-3 !h-3" src={jio} alt="jio" />
          </div>
        );
      default:
        return null;
    }
  };

  const handlePlanSelection = (plan) => {
    const price =
      userData.billing_country === "India"
        ? plan.price / 100
        : ((plan.price * dollarRate * 1.5) / 100).toFixed(2);

    setPlanStore((prev) => ({
      ...prev,
      planName: plan.planName,
      price: plan.price || 0,
    }));

    navigate(`/song-upload?${plan.name.replace(" ", "-")}?${price * 100 || 0}`);
  };

  const renderPlan = (plan, index) => {
    const isHighlighted = plan.name === "GeetBazaar CRBT+";
    const containerClass = isHighlighted
      ? "!h-full p-4 rounded-lg mx-2 bg-interactive-light text-white shadow-[0_13px_13px] shadow-interactive-light relative -top-3"
      : "!h-full p-4 rounded-lg shadow-[0_13px_13px_#000] mx-2 relative";
    const buttonClass = isHighlighted
      ? "w-full justify-center !text-interactive-light !bg-white hover:bg-white-secondary focus:!bg-white-tertiary"
      : "w-full justify-center";

    const displayPrice = calculatePrice(plan.price);

    return (
      <div key={index} className={containerClass}>
        {renderSpecialTag(plan.specialTag)}
        <div className="h-full flex flex-col justify-between">
          <aside>
            <h4 className="text-heading-4 font-bold">{plan.name}</h4>
            <h5
              className={`text-heading-5-bold ${
                isHighlighted ? "text-white" : "text-grey"
              } mt-2`}
            >
              {displayPrice}
            </h5>
            <FeatureList plan={plan} isHighlighted={isHighlighted} />
            {/* <ul className="flex flex-col gap-1 mt-4">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 items-center text-paragraph-1"
                >
                  <FaCheck className="w-1/12" />
                  <aside className="w-11/12">{feature}</aside>
                </li>
              ))}
            </ul> */}
          </aside>
          <Button
            text="Get Started"
            className={buttonClass}
            onClick={() => handlePlanSelection(plan)}
          />
        </div>
      </div>
    );
  };

  // alert(plans?.length);

  return (
    <div
      className="py-2 xl:py-7 relative song-plans text-black"
      id="plans-page"
    >
      <h3 className="text-heading-3-bold text-center mt-6 text-black">
        Plans We Offer
      </h3>

      <h6 className="lg:w-1/2 my-2 text-black mx-auto text-center text-heading-6">
        To Upload a Song, Please Choose a Plan Below
      </h6>

      {isLoading || (
        <div className="flex justify-center items-center gap-1">
          <p>Song</p>
          <Toggle checked={checked} setChecked={setChecked} />
          <p>Album</p>
        </div>
      )}
      {isLoading ||
        (!checked && (
          <div className="flex gap-3 justify-center items-center mx-auto lg:w-fit mt-4">
            <Button
              containerClassName="!h-fit !w-fit flex items-center z-10"
              className="text-black !w-[10rem] aspect-square lg:!w-6 lg:!h-6 !px-0 !py-0 flex items-center justify-center !mt-0"
              onClick={handlePrevClick}
              id="plans-prev"
            >
              <FaChevronLeft className="text-heading-6" />
            </Button>
            <p className="w-full text-center">Swipe For More</p>
            <Button
              containerClassName="!h-fit !w-fit flex items-center z-10"
              className="text-black !w-[10rem] aspect-square lg:!w-6 lg:!h-6 !px-0 !py-0 flex items-center justify-center !mt-0"
              onClick={handleNextClick}
              id="plans-next"
            >
              <FaChevronRight className="text-heading-6" />
            </Button>
          </div>
        ))}

      {checked ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 lg:mt-5 gap-4">
          <aside className="px-2 lg:pl-7 text-black">
            <h2 className="text-heading-5-bold lg:text-heading-2-bold">
              Album for Everyone
            </h2>
            <p className="mt-2 lg:mt-5">
              Get Your Music to the World for Just ₹999! What's Included in the
              ₹999 Album Package? Distribute your album to all major music
              platforms including Spotify, Apple Music, Amazon Music, and more.
            </p>

            <ul className="mt-2 flex flex-col gap-1">
              <li>
                <b>Unlimited Releases:</b> Release 25 tracks under this album
                package.
              </li>
              <li>
                <b>Comprehensive Analytics:</b> Access detailed reports on your
                music's performance, including plays, downloads, and earnings.
              </li>
              <li>
                <b>More Royalties:</b> Keep 90% of the revenue from all
                platforms and 85% from YouTube platforms on your music earnings.
              </li>
              <li>
                <b>Artist Support:</b> Get dedicated support from our team to
                help you navigate the music distribution process.
              </li>
              <li>
                <b>Marketing Tools:</b> Utilize our marketing resources to
                promote your album.
              </li>
              <li>
                <b>Metadata Management:</b> We handle all necessary metadata.
              </li>
              <li>
                <b>Playlist Pitching:</b> Submit your songs for playlist
                consideration.
              </li>
            </ul>
          </aside>
          <AlbumPlan
          // setPlanName={setPlanName}
          // handleRazorpayPayment={handleRazorpayPayment}
          // handlePhonePePayment={handlePhonePePayment}
          />
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center h-[50vh] items-center">
              <div className="loader"></div>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 3000,
                pauseOnMouseEnter: true,
              }}
              navigation={true}
              initialSlide={
                plans?.findIndex((item) => item.name.includes("CRBT+")) >= 0
                  ? plans.findIndex((item) => item.name.includes("CRBT+"))
                  : 0
              }
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                  initialSlide:
                    plans.findIndex((item) => item.name.includes("CRBT+")) -
                      2 >=
                    0
                      ? plans.findIndex((item) => item.name.includes("CRBT+")) -
                        2
                      : 0,
                },
              }}
              className="py-6 text-black mx-auto"
            >
              {plans
                .filter(
                  (item) =>
                    !(
                      item.name.includes("Album") ||
                      item.name.includes("Yearly")
                    )
                )
                .map((item, index) => (
                  <SwiperSlide key={index}>{renderPlan(item)}</SwiperSlide>
                ))}
            </Swiper>
          )}
        </>
      )}
      <div className="xl:w-5/6 mx-auto">
        <YearlyPlanText />
      </div>
      <Steps />

      <FeatureTable />
      {/* <div className="mx-auto"> */}
      <Faq />
      {/* </div> */}
    </div>
  );
};

export default DynamicSongPlans;
