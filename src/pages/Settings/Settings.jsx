import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { compareTwoObjects } from "../../utils/compareTwoObjects";
import axios from "axios";
import { backendUrl } from "../../constants";

const Settings = () => {
  const { token, userData } = useContext(ProfileContext);
  const [formData, setFormData] = useState(userData || {}); // Initialize with userData if available
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Update formData whenever userData changes
  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    axios
      .put(backendUrl + "profile/" + formData.user_email, formData)
      .then(({ data }) => {
        if (data.acknowledged) {
          window.location.reload();
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pb-6 lg:h-screen w-screen pt-5 lg:pt-7 lg:pb-4"
    >
      <div
        className={`w-11/12 xl:w-1/3 shadow-md xl:shadow-xl p-3 rounded-[22px] bg-white relative h-fit mx-auto`}
      >
        <div className="flex flex-wrap gap-y-2">
          <InputField
            value={formData.first_name || ""}
            label={"First Name"}
            hideRequired={true}
            containerClassName={"w-full lg:w-1/2 lg:pr-1"}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          <InputField
            value={formData.last_name || ""}
            label={"Last Name"}
            hideRequired={true}
            containerClassName={"w-full lg:w-1/2 lg:pl-1"}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          <InputField
            value={formData.user_email || ""}
            label={"Email Address"}
            containerClassName={"w-full"}
            disabled={true}
            hideRequired={true}
          />
          <InputField
            value={formData.billing_address || ""}
            label={"Billing Address"}
            containerClassName={"w-full lg:w-1/2 lg:pr-1"}
            onChange={(e) =>
              setFormData({ ...formData, billing_address: e.target.value })
            }
            hideRequired={true}
          />
          <InputField
            value={formData.billing_city || ""}
            label={"Billing City"}
            containerClassName={"w-full lg:w-1/2 lg:pl-1"}
            onChange={(e) =>
              setFormData({ ...formData, billing_city: e.target.value })
            }
            hideRequired={true}
          />
          <InputField
            value={formData.postal_code || ""}
            label={"Postal Code"}
            containerClassName={"w-full"}
            onChange={(e) =>
              setFormData({ ...formData, postal_code: e.target.value })
            }
            hideRequired={true}
          />
          <InputField
            value={formData.partner_name || ""}
            label={"Partner Name"}
            containerClassName={"w-full lg:w-1/2 lg:pr-1"}
            onChange={(e) =>
              setFormData({ ...formData, partner_name: e.target.value })
            }
            hideRequired={true}
          />
          <InputField
            value={formData.phone_no || ""}
            label={"Phone No."}
            containerClassName={"w-full lg:w-1/2 lg:pl-1"}
            onChange={(e) =>
              setFormData({ ...formData, phone_no: e.target.value })
            }
            hideRequired={true}
          />
        </div>
        <div className="flex justify-center mt-2">
          <Button disabled={compareTwoObjects(formData, userData)}>
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Settings;
