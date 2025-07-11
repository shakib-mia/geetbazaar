import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
// import formBg from "./../../assets/images/background.webp";
// import Video from "../../components/Video/Video";

const ProfileVerification = () => {
  /******
   *
   * ALL THE FIELDS NAME CAN BE CHANGED ACCORDING
   *
   * TO BACKEND FIELDS REQUIREMENTS
   *
   * *****/
  const user = JSON.parse(sessionStorage.getItem("user"));
  // console.log(user);

  const fields = [
    {
      label: "Name",
      placeholder: "Name",
      name: "verified_on_resso_name",
      type: "text",
      required: true,
      // value: user.display_name,
      disabled: true,
    },
    {
      label: "Email",
      placeholder: "Email",
      name: "verified_on_resso_email",
      type: "email",
      required: true,
      // value: user.user_email,
      disabled: true,
    },
    {
      label: "User Name of Resso",
      placeholder: "Resso username",
      name: "verified_on_resso_usernm",
      type: "email",
      required: true,
      // value: user.user_nicename,
      disabled: true,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      name: "verified_on_resso_phone",
      type: "tel",
      required: true,
      // pattern: /^((\+91)?|91|91\s|\+91\s)?[789][0-9]{9}/g,
    },
    {
      label: "Artist Name",
      placeholder: "Artist Name",
      name: "verified_on_resso_artist_name",
      type: "text",
      required: true,
    },
    {
      label: "Artist Profile Url",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "verified_on_resso_url",
      type: "text",
      required: true,
    },
    {
      label: "Album URL",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "verified_on_resso_album_url",
      type: "text",
      required: true,
    },
    {
      label: "Genre",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "verified_on_resso_genre",
      type: "text",
      required: true,
    },
    {
      label: "Origin",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "verified_on_resso_origin",
      type: "text",
      required: true,
    },
    {
      label: "Era",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "verified_on_resso_era",
      type: "text",
      required: true,
    },

    {
      label: "Social Links",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "verified_on_resso_social_link",
      type: "text",
      required: true,
      textarea: true,
    },

    {
      label: "Artist/Band bio",
      placeholder: "Artist/Band bio",
      name: "verified_on_resso_artit_band",
      type: "text",
      required: true,
      textarea: true,
    },

    {
      label: "Artist Image",
      placeholder: "Artist Image",
      name: "verified_on_resso_image",
      type: "file",
      required: true,
      textarea: false,
    },

    {
      label: "DOB",
      placeholder: "DOB",
      name: "verified_on_resso_dob",
      type: "date",
      required: true,
    },
    {
      label: "Screenshots of Artist Profile",
      placeholder: "Screenshots of Artist Profile",
      name: "verified_on_resso_ss",
      type: "file",
      required: true,
    },
    {
      label: "Screenshots of User Profile",
      placeholder: "Screenshots of User Profile",
      name: "verified_on_resso_ss",
      type: "file",
      required: true,
    },
  ];

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="Resso Profile Verification"
        subheader="Want to claim your artist profile on Resso? Here is the process."
      />
      <Form
        fields={fields}
        backendUrl="http://adztronaut.com/music/admin/api/addVerifiedResso"
        uIdKey="verified_on_resso_user_id"
        instruction={
          <>
            Account set up - 1. Download the Resso app on your phone 2. Create a
            user account 3. Set up a preferred username 4. Set up a display
            picture 5. Email the screenshot of the user page with username and
            display picture visible. 6. Attach the screenshot of the Resso
            Artist page for the same artist, so that we can merge it with
            his/her newly created user account.
          </>
        }
      />

      <div className="mt-7">
        <h5 className="text-heading-5 text-primary-dark text-center mb-1">
          Need help? watch the video for guidance
        </h5>

        <div className="w-1/2 mx-auto h-[3px] bg-secondary-light mb-2"></div>

        {/* <Video /> */}
      </div>
    </div>
  );
};

export default ProfileVerification;
