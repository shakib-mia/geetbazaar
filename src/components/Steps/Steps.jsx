import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Step from "../Step/Step";
import { ProfileContext } from "../../contexts/ProfileContext";
import Timeline from "../Timeline/Timeline";

const Steps = () => {
  const store = useContext(ProfileContext);
  const steps = [
    {
      step: "Select a Plan",
      details:
        "Choose a suitable plan based on your requirements. For instance, if you want your music widely available, consider the BackVision CRBT+ plan.",
    },
    {
      step: "Album Details",
      details:
        "Once you've selected a plan, you'll be directed to the Album Details Page. Fill in all necessary album information. If you have a record label, you can create one; otherwise, use the platform's name as the label.",
      important_notes: [
        "Ensure your artwork meets the minimum dimensions of 3000×3000 pixels.",
        "Choosing the platform's name as the record label does not transfer content ownership; you or your company retain ownership.",
      ],
    },
    {
      step: "Choose the Stores",
      details:
        "Select the stores where you want your music to be available. You can opt to 'Select All' to distribute your music across all available stores or choose specific stores according to your preference.",
    },
    {
      step: "Audio",
      details:
        "Provide details about your tracks, such as song name, artist name, genre, and language. Ensure your audio files are in WAV and MP3 formats only.",
    },
    {
      step: "Set CRBT Time",
      details:
        "If applicable (for Caller Ring Back Tone services), specify the timing for the caller tune.",
      example:
        "If the song is 4 minutes and 37 seconds long and you want the hook to play at 1 minute and 8 seconds, enter '01:08' as the CRBT cut time.",
    },
    {
      step: "Place the Order",
      details:
        "Once all the above steps are completed, proceed to checkout. Click on 'Proceed to Checkout' to finalize your order and make the payment for the selected plan.",
    },
    {},
    {
      step: "Preview and Submit",
      details:
        "You'll be provided with a preview of your upload, allowing you to review all your data. If you have a coupon code, apply it for discounts. Double check for mistakes before submitting your content.",
    },
  ];

  return (
    <div className="w-5/6 mx-auto">
      <h4 className="text-heading-5-bold lg:text-heading-4-bold text-white mt-6 mb-3 text-center">
        How to Upload Your Content
      </h4>
      {!store.token && (
        <p className="text-center">
          Please{" "}
          <Link
            to={"/signup"}
            className="text-interactive-light hover:text-interactive-light-hover"
          >
            create an account
          </Link>{" "}
          before processing.
        </p>
      )}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {steps.map((item) => (
          <Step {...item} />
        ))}
      </div> */}

      <Timeline steps={steps.filter((step) => step.step)} />
      {/* <div className="flex">
        <div className="w-1/4">Lorem ipsum dolor sit amet.</div>
        <div className="w-1/4">Illum cum recusandae debitis inventore.</div>
        <div className="w-1/4">Quibusdam odio repellat sit veritatis!</div>
        <div className="w-1/4">Assumenda perferendis nesciunt labore quo?</div>
      </div>
      <div className="flex">
        <div className="w-1/3">Fuga iure quis velit minus.</div>
        <div className="w-1/3">
          Sapiente voluptate facere reprehenderit illum.
        </div>
        <div className="w-1/3">Quis quas molestias maxime dolore.</div>
      </div> */}
    </div>
  );
};

export default Steps;
