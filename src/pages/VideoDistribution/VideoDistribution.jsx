import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

const VideoDistribution = () => {
  // const [selectedItems, setSelectedItems] = useState([]);

  const fields = [
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "video_distribution_email",
      type: "email",
      required: true,
    },
    {
      label: "Your Name",
      placeholder: "Your Name",
      name: "video_distribution_your_name",
      type: "text",
      required: true,
    },
    {
      label: "Phone Number",
      placeholder: "Phone Number",
      name: "video_distribution_phone",
      type: "tel",
      required: true,
    },
    {
      label: "YouTube/Vimeo URL",
      placeholder: "YouTube/Vimeo URL",
      name: "video_distribution_url",
      type: "text",
      required: true,
    },
    {
      label: "Content Name",
      placeholder: "Content Name",
      name: "video_distribution_content_name",
      type: "text",
      required: true,
    },

    {
      label: "Content Type",
      placeholder: "Content Type",
      name: "video_distribution_content_type",
      id: "content-type",
      type: "multi-select",
      selectItems: [
        { text: "Music Video", selected: false },
        { text: "Feature Film", selected: false },
        { text: "Web-series", selected: false },
      ],
      // selectedItems: [],
      required: true,
    },

    {
      label: "Content Language",
      placeholder: "Content Language",
      name: "video_distribution_language",
      type: "text",
      required: true,
    },

    {
      label: "Message",
      placeholder: "Message",
      name: "video_distribution_message",
      type: "text",
      textarea: true,
      required: true,
    },
  ];

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="Video Distribution"
        subheader={
          <>
            Get your video on MX Player, Hungama Play, <br /> JioSaavn Video and
            other OTT platforms for free.
          </>
        }
      />

      <Form fields={fields} uIdKey="video_user_id" id="video-distribution" />
    </div>
  );
};

export default VideoDistribution;
