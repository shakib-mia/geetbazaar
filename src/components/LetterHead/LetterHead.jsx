import React, { useContext } from "react";
import { forwardRef } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

const Letterhead = forwardRef(({ formData }, ref) => {
  const { userData } = useContext(ProfileContext);
  // console.log(formData);
  return (
    <div className="bg-white py-2 rounded text-paragraph-1" ref={ref}>
      <div className="p-6">
        {formData["Sub-Label Name"]}
        <br />
        {userData.emailId} <br />
        {userData.phone_no} <br />
        {userData.billing_address}, {userData.billing_city},{" "}
        {userData.billing_country} - {userData.postal_code} <br />
      </div>
      <div className="text-end mr-6 my-1">
        Date: {new Date().getDate().toString().padStart(2, "0")}/
        {(new Date().getMonth() + 1).toString().padStart(2, "0")}/
        {new Date().getFullYear()}
      </div>

      <div className="text-center underline">TO WHOMSOEVER IT MAY CONCERN</div>

      <p className="p-6">
        This is to inform that we{" "}
        <b>
          {formData && formData["Sub-Label Name"]
            ? formData["Sub-Label Name"]
            : "undefined"}
        </b>{" "}
        have licensed our content Exclusively to <b>GeetBazaar</b> for
        monetization of content across any and all platforms and services
        including but not limited to CRBT, IVR Full Tracks (Operator Based) and
        OTT platforms (international, domestic), streaming services, video
        streaming/download etc across various services and all telecom operators
        for the territory of world, on terms as detailed below –
      </p>

      <ul className="p-6 pt-0">
        <li>License Type – Exclusive</li>
        <li>Content – All Past catalogue and Future new releases.</li>
        <li>Territory – Worldwide</li>
        <li>
          Term – This B2B is valid from Date of Signing of this Document and
          valid till one year and will be auto renewed for another year if not
          requested and agreed for termination on or before one month of expiry
          of this document in written by both the parties.
        </li>
      </ul>

      <div className="pl-6">
        <p>Regards,</p>
        <p>
          For{" "}
          <b>
            {formData && formData["Sub-Label Name"]
              ? formData["Sub-Label Name"]
              : "undefined"}
          </b>
        </p>
        <p className="text-heading-6 signature">{formData.signatoryName}</p>
        <p>(stamp and sign)</p>
      </div>
    </div>
  );
});

export default Letterhead;
