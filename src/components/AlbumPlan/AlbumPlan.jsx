import React, { useContext, useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { PlanContext } from "../../contexts/PlanContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const AlbumPlan = () => {
  const { setPlanStore } = useContext(PlanContext);
  const navigate = useNavigate();
  const { userData, dollarRate } = useContext(ProfileContext);
  console.log({ dollarRate });

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

  return (
    <>
      <div className="!h-fit p-4 rounded-lg mb-7 bg-gradient-to-br from-secondary to-interactive-light-focus text-white shadow-[0_13px_20px] shadow-interactive-light relative w-11/12 md:w-1/2 xl:w-10/12 mx-auto">
        <div
          className="bg-interactive-light-destructive-focus text-white py-1 px-2 inline-block absolute rounded-full"
          style={{ top: -20, right: 16 }}
          id="special"
        >
          🔥 New 🔥
        </div>
        <h4 className="text-heading-4 font-bold">BackVision Album</h4>
        <h5 className="text-heading-5-bold text-grey-light mt-2">
          {calculatePrice(99900)}
        </h5>

        <ul className="flex flex-col gap-1 mt-4">
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="font-semibold">
              25 Audios under 1 (one) UPC
              {/* Unlimited song under 1 (one) UPC */}
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">
              All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">
              Caller Tunes On JIO, Vi, BSNL, Airtel
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">
              Your Music Will Be Live Everywhere
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Caller Tune Facility</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">All International Apps Covered</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Upload Music In Specific Stores</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Get 90% Lifetime Royalties</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Schedule Your Own Release Date</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Free Custom Label</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">100% Copyright Will Be Yours</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">
              YouTube Content ID & YouTube Music
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">BackVision Dashboard</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Lifetime Support</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">
              Get Your Music In Facebook & Instagram
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Earn With Facebook And Instagram</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Song Migration Accepted</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">
              Previously Released Songs Accepted
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">
              Quarterly Report Directly On Dashboard
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Approval Within 3-4 Hrs</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Availability Lifetime</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Zero Yearly Fee</aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">
              Including BackVision Special Service
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">
              Get Lyrics In Facebook, Instagram, Spotify, JioSaavn, Google &
              More
            </aside>
          </li>
          <li className="flex gap-2 text-paragraph-1 items-center">
            <FaCheck className="w-1/12" />
            <aside className="w-11/12">Platform Playlist Pitch</aside>
          </li>
        </ul>

        <Button
          text={"Get Started"}
          className={
            "w-full justify-center bg-white !text-interactive-light-hover hover:bg-white-secondary active:bg-white-deactivated focus:bg-white-tertiary"
          }
          // onClick={() => navigate(`/album-upload?forevision-album?99900`)}
          onClick={() => {
            // setPrice(0);
            // setPlanName("forevision-album");
            setPlanStore((prev) => ({
              ...prev,
              planName: "BackVision-album",
              price: 99900,
            }));
            navigate("/album-upload?forevision-album?99900");
          }}
          containerClassName={"mt-5"}
        ></Button>
      </div>
    </>
  );
};

export default AlbumPlan;
