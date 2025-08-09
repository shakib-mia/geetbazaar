import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import check from "./../../assets/icons/checkbox.webp";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl, user } from "../../constants";
import SelectOptions from "../../components/SelectOptions/SelectOptions";
import CountrySelector from "../../components/CountrySelector/CountrySelector";
import { toast } from "react-toastify";

const SignupDetails = () => {
  const [checked, setChecked] = useState(false);
  const { userData, profileData, setUserData, token } =
    useContext(ProfileContext);
  const [selectedCode, setSelectedCode] = useState("91");
  const [screen, setScreen] = useState("name");
  const navigate = useNavigate();
  const [userIds, setUserIds] = useState([]);
  const [signupDetailsData, setSignupDetailsData] = useState(userData);
  const [originalData] = useState(userData); // Store the initial user data for comparison
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // console.log(token);
    axios
      .get(backendUrl + "token-time", {
        headers: { token },
      })
      .then(({ data }) => setUserData({ ...userData, user_email: data.email }))
      .catch((err) => console.log(err));
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data.map((item) => item.name.common));
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkForChanges = (updatedFormData) => {
    const isDataChanged = Object.keys(updatedFormData).some(
      (key) => updatedFormData[key] !== originalData[key]
    );
    setIsChanged(isDataChanged);
  };

  useEffect(() => {
    axios
      .get(backendUrl + "generate-user-id")
      .then(({ data }) => setUserIds(data));
  }, []);

  const [userId, setUserId] = useState("");
  const [available, setAvailable] = useState(true); // Assuming it's true initially
  const [hideNote, setHideNote] = useState(false);
  const [isChanged, setIsChanged] = useState(false); // To track changes in the form
  const [allIds, setAllIds] = useState([]);
  let username =
    userData.first_name.toLowerCase() + userData.last_name.toLowerCase();

  useEffect(() => {
    if (userData.first_name && userData.last_name) {
      const generatedId = `${userData.first_name}${userData.last_name}`
        .toLowerCase()
        .replace(/\s/g, "");

      setUserId(generatedId);
      setUserData({ ...userData, "user-id": generatedId });

      // Check availability
      if (allIds.includes(generatedId)) {
        setAvailable(false);
        setHideNote(false);
      } else {
        setAvailable(true);
        setHideNote(true);
      }
    }
  }, [userData.first_name, userData.last_name, allIds]);

  const [isManualUserId, setIsManualUserId] = useState(false);

  useEffect(() => {
    const fetchAllIds = async () => {
      try {
        const response = await fetch(backendUrl + "generate-user-id");
        const data = await response.json();
        setAllIds(data);
      } catch (error) {
        console.error("Error fetching all user IDs:", error);
      }
    };
    fetchAllIds();
  }, []);

  console.log(allIds);

  // Check if all required fields are filled
  const areFieldsFilled = () => {
    return (
      userData.first_name &&
      userData.last_name &&
      userData.billing_address &&
      userData.billing_city &&
      userData.billing_country &&
      userData.postal_code &&
      userData.phone_no &&
      userId // Assuming user ID is also required
    );
  };

  // Update form validity based on required fields and availability
  useEffect(() => {
    setIsChanged(areFieldsFilled());
  }, [userData, userId]);

  //  const [isManualUserId, setIsManualUserId] = useState(false);

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
    setIsManualUserId(true); // mark manual editing
    setUserData({ ...userData, "user-id": value });

    // Check availability
    if (allIds.includes(value)) {
      setAvailable(false);
      setHideNote(false);
    } else {
      setAvailable(true);
      setHideNote(true);
    }
  };

  useEffect(() => {
    if (!isManualUserId && userData.first_name && userData.last_name) {
      const generatedId = `${userData.first_name}${userData.last_name}`
        .toLowerCase()
        .replace(/\s/g, "");

      setUserId(generatedId);
      setUserData({ ...userData, "user-id": generatedId });

      if (allIds.includes(generatedId)) {
        setAvailable(false);
        setHideNote(false);
      } else {
        setAvailable(true);
        setHideNote(true);
      }
    }
  }, [userData.first_name, userData.last_name, allIds, isManualUserId]);

  const fields = [
    {
      id: "firstName",
      hideRequired: true,
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "First Name",
      value: userData.first_name,
      onChange: (e) => setUserData({ ...userData, first_name: e.target.value }),
      required: true,
    },
    {
      id: "lastName",
      hideRequired: true,
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
      value: userData.last_name,
      onChange: (e) => setUserData({ ...userData, last_name: e.target.value }),
      required: true,
    },
    {
      id: "recordLabel",
      hideRequired: true,
      name: "company_label",
      label: "Company/Record label",
      type: "text",
      placeholder: "Example: GeetBazaar",
      onChange: (e) =>
        setUserData({ ...userData, recordLabel: e.target.value }),
      required: false,
    },
    {
      id: "address",
      hideRequired: true,
      name: "billing_address",
      label: "Address",
      type: "text",
      placeholder: "Enter Here",
      value: userData.billing_address,
      onChange: (e) =>
        setUserData({ ...userData, billing_address: e.target.value }),
      required: true,
    },
    {
      id: "email",
      hideRequired: true,
      name: "email",
      label: "Email",
      type: "email",
      value: userData.user_email,
      onChange: (e) => {
        console.log(e.target.value);
        setUserData({ ...userData, user_email: e.target.value });
      },
      disabled: true,
      required: false,
    },
    {
      id: "city",
      hideRequired: true,
      name: "billing_city",
      label: "City",
      type: "text",
      placeholder: "City Name",
      value: userData.billing_city,
      onChange: (e) =>
        setUserData({ ...userData, billing_city: e.target.value }),
      required: true,
    },
    {
      id: "country",
      hideRequired: true,
      name: "billing_country",
      label: "Country",
      type: "text",
      placeholder: "India",
      value: userData.billing_country,
      onChange: (e) =>
        setUserData({ ...userData, billing_country: e.target.value }),
      required: true,
    },
    {
      id: "postalCode",
      hideRequired: true,
      name: "postal_code",
      label: "Postal Code",
      type: "number",
      placeholder: "700001",
      value: userData.postal_code,
      onChange: (e) =>
        setUserData({ ...userData, postal_code: e.target.value }),
      required: true,
    },
    {
      id: "phone",
      hideRequired: true,
      name: "phone_no",
      label: "Phone",
      type: "tel",
      placeholder: "+91",
      value: userData.phone_no,
      onChange: (e) => setUserData({ ...userData, phone_no: e.target.value }),
      required: true,
    },
    {
      id: "gst",
      name: "gst_no",
      label: "Gst",
      type: "text",
      value: userData.gst_no,
      onChange: (e) => setUserData({ ...userData, gst_no: e.target.value }),
      hideRequired: true,
    },
    {
      id: "userId",
      name: "user-id",
      label: "User ID",
      type: "text",
      placeholder: "abc123",
      value: userId,
      onChange: handleUserIdChange,
      required: true,
      note: hideNote || (available ? "Available" : "Already in Use"),
      dangerNote: !available,
      hideRequired: true,
      successNote: available,
    },
  ];

  /* ===========================   GAP FOR DOUBLE INPUT FIELD   ================================ */
  useEffect(() => {
    const newArr = [];
    document.getElementById("form").childNodes.forEach((el) => {
      // console.log(el.classList.value.includes("w-1/2"));
      el.classList.value.includes("w-1/2") && newArr.push(el);
    });
    // console.log(newArr);

    newArr
      .slice(0, 7)
      .map((i, key) => key % 2 === 0 && i.classList.add("pr-2"));
  }, []);

  const signup = (e) => {
    e.preventDefault();
    // console.log(userData);
    const userDetailsData = {
      ...userData,
      phone_no: selectedCode + userData.phone_no,
      // user_email: userData.user_email,
    };

    const config = {
      headers: {
        token,
      },
    };

    axios
      .post(backendUrl + "post-user-details", userDetailsData, config)
      .then((res) => {
        // if (res.data.acknowledged) {
        navigate("/");
        setUserData({
          ...userData,
          ...userDetailsData,
        });
        // window.location.reload();
        // }
      });
  };

  return (
    <>
      {/* <AuthBody
        heading="We need a few more details"
        onSubmit={signup}
        id="signup-page"
        className="hidden xl:flex"
      > */}
      <form onSubmit={signup} className="my-3 flex justify-center text-black">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm lg:max-w-[40vw] w-full">
          <div className="w-full flex justify-between items-center mb-2">
            <h5 className="text-heading-5-bold">We need a few more details</h5>
          </div>
          {/* <div className="flex gap-1" id="form"> */}
          {/* {fields.map((props, id) =>
              (id + 1) % 3 === 0 ? (
                <>
                  {props.name === "phone" && (
                    <div className="flex w-fit gap-[8px] items-center mt-3 -mb-3">
                      <input
                        type="checkbox"
                        required={true}
                        id={id}
                        className="hidden"
                        onChange={(e) => {
                          if (!props.onChange) {
                            setUserData({
                              ...userData,
                              [props.name]: e.target.value,
                            });
                          } else {
                            props.onChange(e);
                          }
                        }}
                      />

                      <div
                        className={`${
                          !checked &&
                          "border-[1px]  border-surface-white-line text-[12px]"
                        } rounded-[4px] w-[16px] h-[16px]`}
                      >
                        {checked && <img src={check} alt="checkbox" />}
                      </div>

                      <label
                        htmlFor={id}
                        className="text-black-primary text-subtitle-2 font-medium"
                      >
                        Save this information for next time
                      </label>
                    </div>
                  )}

                  <InputField
                    {...fields[id]}
                    selectedCode={selectedCode}
                    setSelectedCode={setSelectedCode}
                    onChange={(e) => {
                      console.log(e.target.value);
                      if (!props.onChange) {
                        setUserData({
                          ...userData,
                          [props.name]: e.target.value.trim(),
                        });
                      } else {
                        props.onChange(e);
                      }
                    }}
                    key={id}
                    containerId={id}
                    containerClassName={`w-full`}
                  />
                </>
              ) : props.name === "billing_country" ? (
                <div className="w-1/2">
                  <CountrySelector
                    selectedCountry={userData.billing_country}
                    setSelectedCountry={(country) =>
                      setUserData({ ...userData, [props.name]: country })
                    }
                  />
                </div>
              ) : (
                // <SelectOptions
                //   containerClassName={`w-1/2`}
                //   label={"Country"}
                //   options={countries.map((item) => item.name?.common)}
                //   onChange={(e) => {
                //     setUserData({ ...userData, [props.name]: e.target.value });
                //     const country = countries.find(
                //       (item) => item.name.common === e.target.value
                //     );

                //     setSelectedCode(
                //       (country.idd.root + country.idd.suffixes[0]).slice(
                //         1,
                //         (country.idd.root + country.idd.suffixes[0]).length
                //       )
                //     );
                //   }}
                // />
                <InputField
                  {...props}
                  containerId={id}
                  onChange={(e) => {
                    if (!props.onChange) {
                      setUserData({
                        ...userData,
                        [props.name]: e.target.value,
                      });
                    } else {
                      props.onChange(e);
                    }
                  }}
                  key={id}
                  containerClassName={`w-1/2`}
                  // fieldClassName="mr-2"
                />
              )
            )} */}

          <div id="form" className="space-y-4">
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    first_name: e.target.value,
                    "user-id": `${userData.first_name}${userData.last_name}`,
                  });
                }}
                value={userData.first_name}
                required={true}
              />
              <InputField
                label="Last Name"
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    last_name: e.target.value,
                    "user-id": `${userData.first_name}${userData.last_name}`,
                  });
                }}
                value={userData.last_name}
                required={true}
              />
            </div>

            {/* Company and Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Company/Record Label"
                onChange={(e) =>
                  setUserData({ ...userData, company_label: e.target.value })
                }
                value={userData.company_label}
                required={false}
              />
              <InputField
                label="Address"
                onChange={(e) =>
                  setUserData({ ...userData, billing_address: e.target.value })
                }
                value={userData.billing_address}
                required={true}
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Email"
                onChange={(e) =>
                  setUserData({ ...userData, user_email: e.target.value })
                }
                value={userData.user_email}
                required={true}
                disabled={true}
              />
              <InputField
                label="Phone"
                onChange={(e) =>
                  setUserData({ ...userData, phone_no: e.target.value })
                }
                value={userData.phone_no}
                required={true}
              />
            </div>

            {/* City and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="City"
                onChange={(e) =>
                  setUserData({ ...userData, billing_city: e.target.value })
                }
                value={userData.billing_city}
                required={true}
              />
              <>
                <CountrySelector
                  selectedCountry={userData.billing_country}
                  setSelectedCountry={(country) =>
                    setUserData({ ...userData, billing_country: country })
                  }
                />
              </>
            </div>

            {/* Postal and GST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Postal Code"
                onChange={(e) =>
                  setUserData({ ...userData, postal_code: e.target.value })
                }
                value={userData.postal_code}
                required={true}
              />
              <InputField
                label="GST"
                onChange={(e) =>
                  setUserData({ ...userData, gst_no: e.target.value })
                }
                value={userData.gst_no}
                required={false}
              />
            </div>

            {/* User ID */}
            <InputField
              label="User ID"
              onChange={(e) => {
                setUserData({ ...userData, "user-id": e.target.value });
                // console.log(e.target.value);
              }}
              value={userData["user-id"]}
              note={
                userData["user-id"]?.length
                  ? !allIds.includes(userData["user-id"])
                    ? "Available"
                    : "Already in Use"
                  : ""
              }
              noteClassName={
                allIds.includes(userData["user-id"])
                  ? "text-red-500"
                  : "text-green-500"
              }
              // value={userData["user-id"]}
            />
          </div>

          {/* </div> */}
          {/* <InputField {...fields[2]} containerClassName={`w-full`} /> */}
          <div className="mt-3 mb-2 text-center">
            <Button
              type="submit"
              text="Submit"
              onClick={() => setScreen("contact")}
              // disabled={
              //   !(email.length > 0 && password.length && password === confirmPass)
              // }
            />
          </div>
        </div>
      </form>
      {/* </AuthBody> */}

      {/* ========== Phone View ========== */}
      {/* <ReactOwlCarousel items={1} mouseDrag={false} touchDrag={false} id="signup-details-slider"> */}
      <AuthBody
        heading="We need a few more details"
        onSubmit={(e) => {
          e.preventDefault();
          setScreen("contact");
        }}
        id="signup-page"
        className={`xl:hidden ${screen === "name" ? "flex" : "hidden"}`}
      >
        <div className="flex flex-wrap" id="form">
          {fields.slice(0, 3).map((props, id) => (
            <InputField
              {...props}
              containerId={id}
              key={id}
              onChange={(e) => {
                if (!props.onChange) {
                  setUserData({
                    ...userData,
                    [props.name]: e.target.value,
                  });
                } else {
                  props.onChange(e);
                }
              }}
              containerClassName={`w-full`}
            />
          ))}
        </div>

        {/* <InputField {...fields[2]} containerClassName={`w-full`} /> */}
        <div className="mt-3 mb-2 text-center">
          <Button
            type="submit"
            text="SignUp"
            onClick={(e) => {
              e.preventDefault();
              setScreen("contact");
            }}
          />
        </div>
      </AuthBody>

      <AuthBody
        heading="We need a few more details"
        onSubmit={(e) => {
          e.preventDefault();
          setScreen("small-address");
        }}
        id="signup-page"
        className={`xl:hidden ${screen === "contact" ? "flex" : "hidden"}`}
      >
        <div className="flex flex-wrap" id="form">
          {/* Email */}
          <InputField
            {...fields[4]}
            containerId={fields[4].id}
            key={fields[4].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[4].name]: e.target.value,
              });

              // signupDetailsData;
            }}
            containerClassName={`w-full`}
            // fieldClassName="mr-2"
          />
          {/* phone number */}
          <InputField
            {...fields[8]}
            containerId={fields[8].id}
            key={fields[8].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[8].name]: e.target.value,
              });

              // signupDetailsData;
            }}
            containerClassName={`w-full`}
            selectedCode={selectedCode}
            setSelectedCode={setSelectedCode}
          />
        </div>
        {/* <InputField {...fields[2]} containerClassName={`w-full`} /> */}
        <div className="mt-3 mb-2 text-center flex justify-center">
          <Button rightIcon={true} />
        </div>
      </AuthBody>

      <AuthBody
        heading="We need a few more details"
        onSubmit={(e) => {
          e.preventDefault();
          setScreen("large-address");
        }}
        id="signup-page"
        className={`xl:hidden ${
          screen === "small-address" ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-wrap" id="form">
          {/* {fields.slice(9, 10).map((props, id) => */}

          <InputField
            {...fields[3]}
            containerId={fields[3].id}
            key={fields[3].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[3].name]: e.target.value,
              });

              // signupDetailsData;
            }}
            containerClassName={`w-full`}
          />
          <InputField
            {...fields[5]}
            containerId={fields[5].id}
            key={fields[5].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[5].name]: e.target.value,
              });
              // signupDetailsData;
            }}
            containerClassName={`w-full`}
          />
        </div>

        <div className="mt-3 mb-2 text-center">
          <Button
            type="submit"
            text="Submit"
            onClick={(e) => {
              e.preventDefault();
              setScreen("large-address");
            }}
          />
        </div>
      </AuthBody>

      <AuthBody
        heading="We need a few more details"
        onSubmit={signup}
        id="signup-page"
        className={`xl:hidden ${
          screen === "large-address" ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-wrap" id="form">
          <InputField
            {...fields[6]}
            containerId={fields[6].id}
            key={fields[6].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[6].name]: e.target.value,
              });
              // signupDetailsData;
            }}
            containerClassName={`w-full`}
            // fieldClassName="mr-2"
          />
          <InputField
            {...fields[7]}
            containerId={fields[7].id}
            key={fields[7].id}
            onChange={(e) => {
              setUserData({
                ...userData,
                [fields[7].name]: e.target.value,
              });
              // signupDetailsData;
            }}
            containerClassName={`w-full`}
            // fieldClassName="mr-2"
          />
        </div>

        <div className="mt-3 mb-2 text-center">
          <Button
            type="submit"
            text="Submit"
            disabled={!available || !isChanged}
          />
        </div>
      </AuthBody>
      {/* </ReactOwlCarousel> */}
    </>
  );
};

export default SignupDetails;
