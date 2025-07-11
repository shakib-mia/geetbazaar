import React, { useContext, useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import axios from "axios";
import SelectOptions from "../../components/SelectOptions/SelectOptions";
import CountrySelector from "../../components/CountrySelector/CountrySelector";
import Button from "../../components/Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const KYC = () => {
  const [selectedCode, setSelectedCode] = useState("91");
  const [selectedCountry, setSelectedCountry] = useState("");
  const { token } = useContext(ProfileContext);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const [govtId, setGovtId] = useState({});

  // console.log(govtId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const data = {
        accepted,
      };
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      // console.log(data["govt-id"]);

      const govtId = new FormData();
      govtId.append("file", data["govt-id"]);

      const config = {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      };

      const res = await axios.post(
        backendUrl + "upload-govt-id",
        govtId,
        config
      );

      // console.log(res.data.url);

      // Example of how you might want to manipulate data further
      data.phoneNo = "+" + selectedCode + data["phone-no"];
      data.govtId = res.data.url;

      delete data["phone-no"];
      delete data["govt-id"];

      // console.log(data);
      axios.post(backendUrl + "kyc", data).then(({ data }) => {
        if (data.insertedId.length > 0) {
          e.target.reset();
          toast.success("KYC Submitted Successfully", {
            position: "bottom-center",
          });
          setTimeout(() => navigate("/"), 3000);
        }
      });

      // Additional code for further processing can go here
    } catch (error) {
      console.error("Error during submission:", error);
      // Handle the error appropriately here
    }
  };

  // console.log(govtId.name);

  return (
    <div className="pb-3 lg:pb-7 pt-6 lg:pt-7">
      <h3 className="text-heading-3-bold text-grey-dark text-center mb-4">
        KYC
      </h3>
      <form
        className="p-3 shadow-lg w-11/12 lg:w-1/2 mx-auto rounded"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <InputField
            id={"name"}
            name={"name"}
            type={"text"}
            placeholder={"Enter Your Name Here"}
            label={"Name"}
            hideRequired={true}
            required={true}
          />

          <InputField
            id={"email-id"}
            name={"emailId"}
            type={"email"}
            placeholder={"Enter Your Email Address"}
            label={"Email ID"}
            hideRequired={true}
            required={true}
          />
        </div>

        <InputField
          id={"phone-no"}
          name={"phone-no"}
          type={"tel"}
          placeholder={"Enter Your Phone Number Here"}
          label={"Phone Number"}
          selectedCode={selectedCode}
          setSelectedCode={setSelectedCode}
          hideRequired={true}
          required={true}
          containerClassName="mb-2"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <InputField
            id={"pin-code"}
            name={"pinCode"}
            type={"text"}
            placeholder={"Enter Your Pin Code Here"}
            label={"Pin Code"}
            hideRequired={true}
            required={true}
          />

          <InputField
            id={"govt-id"}
            name={"govt-id"}
            type={"file"}
            accept={"image/*"}
            placeholder={"Upload your Govt. ID"}
            label={"Govt. ID"}
            hideRequired={true}
            required={true}
            onChange={(e) => setGovtId(e.target.files[0])}
            fileName={govtId.name}
          />
        </div>
        <InputField
          id={"street-address"}
          name={"streetAddress"}
          type={"text"}
          placeholder={"Enter Your Street Address Here"}
          label={"Street Address"}
          containerClassName={"mb-2"}
          hideRequired={true}
          required={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <InputField
            id={"address"}
            name={"address"}
            type={"text"}
            placeholder={"Enter Your Address Here"}
            label={"Address"}
            hideRequired={true}
            required={true}
          />

          <InputField
            id={"state"}
            name={"state"}
            type={"text"}
            placeholder={"Enter Your State Here"}
            label={"State"}
            hideRequired={true}
            required={true}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <InputField
            id={"gst"}
            name={"gst"}
            type={"text"}
            placeholder={"Enter Your GST Number Here"}
            label={"GST Number"}
            hideRequired={true}
            required={true}
          />
          <CountrySelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </div>

        {/* <InputField
          id={"phone-no"}
          name={"phone-no"}
          type={"number"}
          placeholder={"Enter Your Phone Number Here"}
          label={"Phone Number"}
          hideRequired={true}
          containerClassName="mb-2"
        /> */}

        <InputField
          type={"checkbox"}
          label={`I have confirm GeetBazaar terms of service, privacy policy and refund policy.`}
          id={"accept"}
          onChange={(e) => setAccepted(e.target.checked)}
          containerClassName={"mt-2 flex items-center gap-1"}
          fieldClassName="!w-fit !mt-0"
          value={accepted}
        />

        <div className="flex justify-center mt-2">
          <Button disabled={!accepted || !govtId.name} type={"submit"}></Button>
        </div>
      </form>
    </div>
  );
};

export default KYC;
