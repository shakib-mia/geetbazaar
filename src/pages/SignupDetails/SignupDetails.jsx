import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import CountrySelector from "../../components/CountrySelector/CountrySelector";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../constants";
import loginBg from "../../assets/images/loginbg.jpg";

const SignupDetails = () => {
  const { userData, setUserData, token } = useContext(ProfileContext);
  // const [screen, setScreen] = useState("name");
  const [selectedCode, setSelectedCode] = useState("91");
  const [allIds, setAllIds] = useState([]);
  const [userId, setUserId] = useState("");
  const [available, setAvailable] = useState(true);
  const [isManualUserId, setIsManualUserId] = useState(false);
  const navigate = useNavigate();

  // Fetch all existing IDs
  useEffect(() => {
    const fetchAllIds = async () => {
      try {
        const res = await axios.get(backendUrl + "generate-user-id");
        setAllIds(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllIds();
  }, []);

  // Generate ID automatically if not manual
  useEffect(() => {
    if (!isManualUserId && userData.first_name && userData.last_name) {
      let newId = `${userData.first_name}${userData.last_name}`
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      let counter = 1;
      while (allIds.includes(newId)) {
        newId = `${newId}${counter}`;
        counter++;
      }
      setUserId(newId);
      setUserData({ ...userData, "user-id": newId });
      setAvailable(!allIds.includes(newId));
    }
  }, [userData.first_name, userData.last_name, allIds, isManualUserId]);

  const handleUserIdChange = (e) => {
    const value = e.target.value.replace(/[^a-z0-9]/g, "");
    setUserId(value);
    setUserData({ ...userData, "user-id": value });
    setIsManualUserId(true);
    setAvailable(!allIds.includes(value));
  };

  const areFieldsFilled = () => {
    return (
      userData.first_name &&
      userData.last_name &&
      userData.billing_address &&
      userData.billing_city &&
      userData.billing_country &&
      userData.postal_code &&
      userData.phone_no &&
      userId
    );
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...userData,
        phone_no: selectedCode + userData.phone_no,
      };
      await axios.post(backendUrl + "post-user-details", payload, {
        headers: { token },
      });
      setUserData({ ...userData, ...payload });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const fields = [
    {
      label: "First Name",
      name: "first_name",
      value: userData.first_name,
      required: true,
    },
    {
      label: "Last Name",
      name: "last_name",
      value: userData.last_name,
      required: true,
    },
    {
      label: "Company/Record Label",
      name: "company_label",
      value: userData.company_label,
      required: false,
    },
    {
      label: "Address",
      name: "billing_address",
      value: userData.billing_address,
      required: true,
    },
    {
      label: "Email",
      name: "user_email",
      value: userData.user_email,
      required: true,
      disabled: true,
    },
    {
      label: "City",
      name: "billing_city",
      value: userData.billing_city,
      required: true,
    },
    {
      label: "Country",
      name: "billing_country",
      value: userData.billing_country,
      required: true,
    },
    {
      label: "Postal Code",
      name: "postal_code",
      value: userData.postal_code,
      required: true,
    },
    {
      label: "Phone",
      name: "phone_no",
      value: userData.phone_no,
      required: true,
    },
    { label: "GST", name: "gst_no", value: userData.gst_no, required: false },
    { label: "User ID", name: "user-id", value: userId, required: true },
  ];

  return (
    <div
      className="flex justify-center items-center min-h-screen text-black min-w-[100vw] absolute left-0 bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="p-4 border-2 backdrop-blur-lg bg-black/15 border-white/30 rounded-xl w-full max-w-3xl">
        <form onSubmit={signup} className="space-y-4 text-white">
          <h4 className="text-heading-5-bold lg:text-left lg:text-heading-4-bold font-bold text-center text-white lg:whitespace-nowrap">
            We need a few more details
          </h4>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.slice(0, 2).map((f) => (
              <InputField
                key={f.name}
                label={f.label}
                value={f.value}
                onChange={(e) =>
                  setUserData({ ...userData, [f.name]: e.target.value })
                }
                required={f.required}
                fieldClassName="!text-white !bg-white/30 !border-none"
                labelClassName="!text-white"
              />
            ))}
          </div>

          {/* Company & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.slice(2, 4).map((f) => (
              <InputField
                key={f.name}
                label={f.label}
                value={f.value}
                onChange={(e) =>
                  setUserData({ ...userData, [f.name]: e.target.value })
                }
                required={f.required}
                fieldClassName="!text-white !bg-white/30 !border-none"
                labelClassName="!text-white"
              />
            ))}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={fields[4].label}
              value={fields[4].value}
              disabled
              fieldClassName="!text-white !bg-white/30 !border-none"
              labelClassName="!text-white"
            />
            <InputField
              label={fields[8].label}
              value={fields[8].value}
              onChange={(e) =>
                setUserData({ ...userData, phone_no: e.target.value })
              }
              fieldClassName="!text-white !bg-white/30 !border-none"
              labelClassName="!text-white"
            />
          </div>

          {/* City & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={fields[5].label}
              value={fields[5].value}
              onChange={(e) =>
                setUserData({ ...userData, billing_city: e.target.value })
              }
              fieldClassName="!text-white !bg-white/30 !border-none"
              labelClassName="!text-white"
            />
            <CountrySelector
              selectedCountry={userData.billing_country}
              setSelectedCountry={(c) =>
                setUserData({ ...userData, billing_country: c })
              }
            />
          </div>

          {/* Postal Code & GST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={fields[7].label}
              value={fields[7].value}
              onChange={(e) =>
                setUserData({ ...userData, postal_code: e.target.value })
              }
              fieldClassName="!text-white !bg-white/30 !border-none"
              labelClassName="!text-white"
            />
            <InputField
              label={fields[9].label}
              value={fields[9].value}
              onChange={(e) =>
                setUserData({ ...userData, gst_no: e.target.value })
              }
              fieldClassName="!text-white !bg-white/30 !border-none"
              labelClassName="!text-white"
            />
          </div>

          {/* User ID */}
          <InputField
            label={fields[10].label}
            value={userId}
            onChange={handleUserIdChange}
            fieldClassName="!text-white !bg-white/30 !border-none"
            labelClassName="!text-white"
            note={userId ? (available ? "Available" : "Already in Use") : ""}
            noteClassName={available ? "text-green-500" : "text-red-500"}
          />

          <div className="text-center mt-4">
            <Button
              type="submit"
              text="Submit"
              disabled={!areFieldsFilled() || !available}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupDetails;
