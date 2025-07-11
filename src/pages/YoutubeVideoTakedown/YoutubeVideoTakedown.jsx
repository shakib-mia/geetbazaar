import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import axios from "axios";

const YoutubeVideoTakedown = () => {
  const [countries, setCountries] = useState([]);
  const fields = [
    {
      label: "User Name",
      name: "youtube_video_takedown_name",
      placeholder: "Name",
      type: "text",
      required: true,
    },
    {
      label: "Email Address",
      name: "youtube_video_takedown_email",
      placeholder: "Email",
      type: "email",
      required: true,
    },
    {
      label: "Phone",
      name: "youtube_video_takedown_phone",
      placeholder: "Phone",
      type: "tel",
      required: false,
    },
    {
      label: "Content Name",
      name: "youtube_video_takedown_content_name",
      placeholder: "Content Name",
      type: "text",
      required: true,
    },
    {
      label: "Name of the Copyright Owner",
      name: "youtube_video_takedown_copyright_owner_name",
      placeholder: "Name of the Copyright Owner",
      type: "text",
      required: true,
    },

    {
      label: "Video URL for takedown",
      name: "youtube_video_takedown_video_url_for_takedown",
      placeholder: "Video URL for takedown",
      type: "text",
      required: true,
    },

    {
      label: "Street Address",
      name: "youtube_video_takedown_street_address",
      placeholder: "Street Address",
      type: "text",
      required: true,
    },
    {
      label: "City",
      name: "youtube_video_takedown_city",
      placeholder: "City",
      type: "text",
      required: true,
    },
    {
      label: "State/Province",
      name: "youtube_video_takedown_state",
      placeholder: "State/Province",
      type: "text",
      required: true,
    },
    {
      label: "Zip/Postal Code",
      name: "youtube_video_takedown_postal_code",
      placeholder: "Zip/Postal Code",
      type: "text",
      required: true,
    },
    {
      label: "Country",
      name: "youtube_video_takedown_country",
      placeholder: "Country",
      type: "dropdown",
      id: "country",
      options: countries,
      required: true,
    },
    {
      label: "Removal options",
      placeholder: "Removal options",
      name: "youtube_video_takedown_removal_option",
      id: "removal",
      type: "multi-select",
      selectItems: [
        {
          text: "Scheduled: Send a 7-day notice",
          name: "youtube_video_takedown_removal_option",
          selected: false,
        },
        {
          text: "Standard: Request Removal Now",
          name: "youtube_video_takedown_removal_option",
          selected: false,
        },
      ],
      required: true,
    },

    // {
    //   label:
    //     "The information in this form is accurate, and under penalty of perjury. I am the owner, or an agent authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.",
    //   name: "The information in this form is accurate, and under penalty of perjury. I am the owner, or an agent authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.",
    //   placeholder: "Country",
    //   type: "multi-select",
    //   id: "country",
    //   options: countries,
    //   required: true,
    // },

    {
      label: "Legal agreements",
      placeholder: "Legal Agreements",
      name: "youtube_video_takedown_agreement",
      type: "multi-select",
      id: "legal-agreement",
      selectItems: [
        {
          text: "The information in this form is accurate, and under penalty of perjury. I am the owner, or an agent authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed",
          // name: "promotional_tool_artist_type",
          selected: false,
        },
      ],
      required: true,
    },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      // console.log(data[0].name.common);
      setCountries(data.map((item) => item.name.common));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="YouTube Video Takedown"
        subheader={
          <>Received a claim on your own video? here we are for you!</>
        }
      />

      <Form id="youtube-video-takedown" fields={fields} uIdKey={"takedown"} />
    </div>
  );
};

export default YoutubeVideoTakedown;
