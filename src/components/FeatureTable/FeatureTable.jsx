import React, { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Feature from "../Feature/Feature";
import gsap from "gsap";
// import { RxCross2 } from "react-icons/rx";

const features = [
  "YouTube Content ID, YouTube Music & YouTube Shorts Covered",
  "Monetize Your Music in Facebook & Instagram",
  "Get Your Music in Triller, Snapchat & TikTok",
  "Schedule Your Own Release Date",
  "Free Custom Label",
  "100% Copyright Will Be Yours",
  "Get 80% Revenue from the Streamings",
  "GeetBazaar Pro Dashboard with Detailed analytics",
  "Get lifetime support with zero yearly cost",
  "Advanced revenue reports",
  "All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn",
  "Caller Tunes On JIO, Vi, BSNL & Airtel",
  "Worldwide Reach",
  "All International Apps Covered",
  "90% Revenue from Streaming platforms",
  "85% Revenue from YouTube Platforms",
  "Lyrics monetization",
  "Get Lyrics In Facebook, Instagram, Spotify, JioSaavn, Google & More",
  "Various marketing tools with Playlisting options",
];

const plans = [
  {
    name: "GeetBazaar Social",
    features: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    name: "GeetBazaar CRBT",
    features: [
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
  },
  {
    name: "GeetBazaar CRBT+",
    features: [
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
  },
  {
    name: "GeetBazaar Pro",
    features: [
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
    ],
  },
];

const FeatureTable = () => {
  const headerRef = React.useRef(null);
  useEffect(() => {
    gsap.to(headerRef.current, {
      opacity: 1,
      left: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);
  return (
    <>
      <h2 className="text-heading-4-bold lg:text-heading-2-bold text-center mt-3 mb-4">
        Compare Plans
      </h2>
      <div className="w-[94%] lg:w-full mx-auto">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="w-full text-sm text-white">
            <thead
              className="rounded-2xl overflow-hidden sticky z-50"
              style={{
                top:
                  document.getElementById("topbar")?.clientHeight + 20 + "px",
              }}
              ref={headerRef}
            >
              <div
                className={`grid grid-cols-${
                  plans.length + 1
                }  bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl`}
              >
                <th className="text-left p-4">Feature</th>
                {plans.map((plan, i) => (
                  <th key={i} className="text-center p-4 font-semibold">
                    {plan.name}
                  </th>
                ))}
              </div>
            </thead>
            <div className="mt-2 space-y-1">
              {features.map((feature, index) => (
                // <div className={`grid grid-cols-5`} key={index}>
                <Feature feature={feature} plans={plans} index={index} />
                //   </td>
                // </div>
              ))}
            </div>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block lg:hidden">
          {features.map((feature, index) => (
            <div key={index} className="bg-interactive-light p-4  my-2">
              <div className="font-semibold text-white mb-2">{feature}</div>
              <div className="grid grid-cols-2 gap-4">
                {plans.map((plan, planIndex) => (
                  <div key={planIndex} className="flex items-center">
                    {!plan.features[index] ? (
                      <del className="text-interactive-light-disabled">
                        {plan.name}
                      </del>
                    ) : (
                      <span className="text-sm text-white">{plan.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeatureTable;
