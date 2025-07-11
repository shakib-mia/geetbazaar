import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import CrbtList from "../../components/CrbtList/CrbtList";

const CrbtCodes = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="xl:w-10/12 mx-auto mt-5 lg:mt-7 mb-7 lg:mb-0 pb-7 lg:pb-7 p-3 shadow-xl rounded-lg text-grey-dark">
      <h3 className="text-heading-4-bold lg:text-heading-3-bold mb-2">
        CRBT Codes
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <aside
          className={`${
            showMore ? "h-full" : "h-[50vh]"
          } overflow-hidden pb-5 relative text-justify transition-[height] duration-700`}
        >
          <div className="w-full absolute py-1 bg-gradient-to-t from-white to-transparent bottom-0 left-0 flex justify-center">
            <button
              className="flex gap-2 items-center"
              onClick={() => setShowMore(!showMore)}
            >
              Show {showMore ? "Less" : "More"}{" "}
              <FaChevronDown
                className={`transition-transform ${
                  showMore ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
          <article>
            <p>
              CRBT stands for Caller Ring Back Tone, which is the tune or audio
              clip a caller hears when they dial someone's number, instead of
              the standard ringing sound. This service allows users to
              personalize the sound callers hear, often using popular songs,
              melodies, or custom messages.
            </p>

            <p className="mt-2">For example:</p>
            <ul className="list-disc list-inside">
              <li>
                If someone calls a person who has enabled CRBT, they might hear
                a Bollywood song instead of the usual "ring-ring."
              </li>
              <li>
                It's widely offered by telecom operators, allowing subscribers
                to select songs or tones from a library.
              </li>
            </ul>

            <p className="mt-2">
              In GeetBazaar's case, your CRBT-related plans (BackVision CRBT,
              CRBT+, and Album) provide users with options to include caller
              tunes as part of their music distribution packages. These services
              likely let artists or companies create their own tunes for this
              purpose.
            </p>

            <p className="mt-4">
              Here's the updated guide with specifics for each telecom provider:
            </p>

            <h5 className="text-heading-5-bold mt-4">
              How to Use CRBT for Different Telecom Operators
            </h5>
            <div className="mt-3 border-y divide-y">
              <div className="py-2">
                <h6 className="text-heading-6-bold">For Jio Users:</h6>

                <ul className="list-disc list-inside mt-1">
                  <li className="text-paragraph-1 font-medium">
                    Apps:
                    <ul className="list-[circle] list-inside ml-3 font-normal mt-[4px]">
                      <li>
                        Use the <b>MyJio</b> app or <b>JioSaavn</b> app to set
                        your caller tune.
                      </li>
                      <li>
                        Browse through songs in the app and set your favorite as
                        the caller tune directly.
                      </li>
                    </ul>
                  </li>

                  <li className="text-paragraph-1 font-medium">
                    No Codes:
                    <ul className="list-[circle] list-inside ml-3 font-normal mt-[4px]">
                      <li>
                        Jio does not provide activation codes; everything is
                        managed within the apps.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="py-2">
                <h6 className="text-heading-6-bold">
                  For Vi (Vodafone Idea) Users:
                </h6>

                <ul className="list-disc list-inside mt-1">
                  <li className="text-paragraph-1 font-medium">
                    Apps:
                    <ul className="list-[circle] list-inside ml-3 font-normal mt-[4px]">
                      <li>
                        Use the Vi application to browse and set caller tunes.
                      </li>
                    </ul>
                  </li>

                  <li className="text-paragraph-1 font-medium">
                    Codes:
                    <ul className="list-[circle] list-inside ml-3 font-normal mt-[4px]">
                      <li>
                        Dial <b>537+ song code</b> to set a caller tune
                        directly.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="py-2">
                <h6 className="text-heading-6-bold">For Airtel Users:</h6>

                <ul className="list-disc list-inside mt-1">
                  <li className="text-paragraph-1 font-medium">
                    Apps Only:
                    <ul className="list-[circle] list-inside ml-3 font-normal mt-[4px]">
                      <li>
                        Use the <b>Wynk Music</b> app to set your Hello Tune.
                      </li>{" "}
                      <li>Browse and select songs within the app.</li>
                    </ul>
                  </li>

                  <li className="text-paragraph-1 font-medium">
                    No Codes:
                    <ul className="list-[circle] list-inside ml-3 font-normal mt-[4px]">
                      <li>
                        Airtel does not provide activation codes; tunes can only
                        be managed through the Wynk app.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="py-2">
                <h6 className="text-heading-6-bold">For Airtel Users:</h6>

                <ul className="list-disc list-inside mt-1">
                  <li className="text-paragraph-1 font-medium">
                    Apps:
                    <ul className="list-[circle] list-inside ml-3 font-normal mt-[4px]">
                      <li>
                        Use the BSNL Caller Tune app to set your preferred tune.
                      </li>
                    </ul>
                  </li>

                  <li className="text-paragraph-1 font-medium">
                    SMS Option:
                    <ul className="list-[circle] list-inside ml-3 font-normal mt-[4px]">
                      <li>
                        Send an SMS: BT (Song Code) to 56700 to activate the
                        caller tune.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <h5 className="text-heading-5-bold mt-4">
              Note for Artists via GeetBazaar:
            </h5>
            <p className="py-1">
              Artists and distributors can submit their content for caller tune
              services via BackVision CRBT, BackVision CRBT+, BackVision Album
              plans. After approval, your tunes will be made available on the
              respective telecom platforms. This simplifies the process for
              users to set your songs as caller tunes! 😊
            </p>
          </article>
        </aside>
        <CrbtList />
      </div>
    </div>
  );
};

export default CrbtCodes;
