import React, { useContext, useState } from "react";
import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import InputField from "../InputField/InputField";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, config } from "../../constants";
import finishImage from "./../../assets/images/almost-done.png";
import { ProfileContext } from "../../contexts/ProfileContext";
import { ScreenContext } from "../../contexts/ScreenContext";
import GSTCalculator from "../GstCalculator/GstCalculator";
import { PlanContext } from "../../contexts/PlanContext";
import Agreement from "../Agreement/Agreement";
import logo from "../../assets/icons/logo.PNG";
import { formatDate } from "../../utils/formatDate";
import useRazorpay from "react-razorpay";

const Distribution = () => {
  const { formData } = useContext(ScreenContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [discountData, setDiscountData] = useState({});
  const { userData, token } = useContext(ProfileContext);
  const [signature, setSignature] = useState(formData.signature || "");
  // console.log(formData);

  // const [orderId, setOrderId] = useState("XXXXX");
  const { setPlanStore, planStore } = useContext(PlanContext);
  const [showAgreement, setShowAgreement] = useState(false);
  const [Razorpay] = useRazorpay();
  // const { setPlanStore, planStore } = useContext(PlanContext);
  // console.log(planStore);

  // console.log();
  // const config = {
  //   headers: { token },
  // };

  // useEffect(() => {
  //   axios
  //     .get(backendUrl + "generate-order-id", config)
  //     .then(({ data }) => setOrderId(data.orderId));
  // }, []);

  const [accepted, setAccepted] = useState(formData.accepted || false);
  const discountPrice = discountData.discountPercentage
    ? (parseFloat(
        location.search.split("?")[2] || planStore.price || formData.price
      ) /
        100 -
        (parseFloat(
          location.search.split("?")[2] || planStore.price || formData.price
        ) /
          100) *
          (parseFloat(discountData.discountPercentage) / 100)) *
      100
    : parseFloat(
        location.search.split("?")[2] || planStore.price || formData.price
      );

  const saved = discountData.discountPercentage
    ? (parseFloat(
        location.search.split("?")[2] || planStore.price || formData.price
      ) /
        100) *
      (discountData.discountPercentage / 100)
    : 0;
  // console.log(discountData.discountPercentage);
  const verifyCouponCode = (e) => {
    e.preventDefault();

    axios
      .get(backendUrl + `coupon-codes/${e.target.couponCode.value}`, {
        headers: {
          planName: (planStore.planName || formData.planName)
            .split("-")
            .join(" "),
        },
      })
      .then(({ data }) => setDiscountData(data))
      .catch((error) => {
        setError(true);
        setDiscountData({});
        toast.error(error.response.data.message, {
          position: "bottom-center",
        });
      });
  };

  // console.log();

  const handlePayLater = () => {
    // console.log(formData);
    formData.planName = location.search.split("?")[1];
    formData.status = "pending";
    // formData.orderId = orderId;
    formData.userEmail = userData.emailId;
    delete formData.file;
    // formData;
    // navigate("/");

    const config = {
      headers: {
        token,
      },
    };

    axios
      .post(backendUrl + "upload-song/upload-song-data", formData, config)
      .then(({ data }) => {
        if (data.acknowledged) {
          toast.success("Order has been saved for later uses.");
          navigate("/");
        }
      });
  };

  const handleRazorpayPayment = async (params) => {
    // console.log();
    axios
      .post(
        backendUrl + "razorpay",
        {
          amount: parseFloat(formData.price),
          currency: userData.billing_country === "India" ? "INR" : "USD",
        },
        config
      ) // ============  *** Need to set amount dynamically here ***  ================
      .then(({ data }) => initPayment(data))
      .catch((error) => console.log(error));
  };
  // console.log(location);
  const initPayment = (data) => {
    const options = {
      // key: "rzp_live_hbtXvHKqIxw2XQ",
      key: "rzp_test_VWlIF0sBVpBClm",
      amount: data.amount,
      // currency: data.currency,
      name: data.name,
      currency: userData.billing_country === "India" ? "INR" : "USD",
      description: "Test",
      image: logo,
      order_id: data.id,
      handler: async (response) => {
        // response.songId =
        const { razorpay_order_id, razorpay_payment_id } = response;
        try {
          const verifyUrl = backendUrl + "razorpay/verify";
          const config = {
            headers: {
              token,
            },
          };
          // console.log(config);
          const res = await axios.post(
            verifyUrl,
            { ...response, price: data.amount },
            config
          );
          // res;

          if (res.data.insertCursor.acknowledged) {
            setPlanStore((prev) => ({
              ...prev,
              order_id: formData.orderId,
              payment_id: razorpay_payment_id,
            }));
            // navigate("/payment-success");
            // clg;
            // songData, razorpay_order_id;
            formData.order_id = razorpay_order_id;
            formData.payment_id = razorpay_payment_id;
            if (razorpay_order_id.length) {
              formData.status = "paid";
            }
            formData.paymentDate = formatDate(new Date());
            formData.planName = location.search.split("?")[1];

            axios
              .put(
                backendUrl + "songs/by-order-id/" + formData.orderId,
                formData
              )
              .then((res) => {
                if (res.data.acknowledged) {
                  axios
                    .get(`${backendUrl}plans/monthly-sales/${data.amount}`, {
                      headers: {
                        token,
                      },
                    })
                    .then(({ data }) => console.log(data));
                  navigate("/payment-success");
                }
              })
              .catch((error) => console.log(error));
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#064088",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  console.log(planStore);
  const handleSubmit = () => {
    const price =
      parseFloat(
        location.search.split("?")[2] || planStore.price || formData.price
      ) / 100;

    // formData.orderId = orderId;
    formData.userEmail = userData.emailId;
    formData.status = "pending";
    formData.planName = planStore.planName || formData.planName;
    formData.price = price * 100;

    console.log(formData);

    axios
      .post(backendUrl + "recent-uploads", formData, {
        headers: {
          token,
        },
      })
      .then(({ data }) => {
        if (data.acknowledged && !location.search.includes("yearly-plan")) {
          // if yearly (that's why isNaN logic added) of free plan
          if (
            location.search.toLocaleLowerCase().includes("social") ||
            isNaN(location.search.split("?")[2])
          ) {
            // axios.put(backendUrl+)
            axios
              .get(`${backendUrl}plans/monthly-sales/${price * 100}`, {
                headers: {
                  token,
                },
              })
              .then(({ data }) => {
                formData.planName =
                  location.search.split("?")[1] ||
                  planStore.planName ||
                  formData.planName;

                axios
                  .put(
                    backendUrl + "songs/by-order-id/" + formData.orderId,
                    formData
                  )
                  .then((res) => {
                    if (res.data.acknowledged) {
                      toast.success("Song has been uploaded successfully", {
                        position: "bottom-center",
                      });
                      axios
                        .get(
                          `${backendUrl}plans/monthly-sales/${
                            data.amount || formData.price
                          }`,
                          {
                            headers: {
                              token,
                            },
                          }
                        )
                        .then(({ data }) => console.log(data));
                      navigate("/");
                    }
                  })
                  .catch((error) => console.log(error));
                // }
              });
            // alert("/");
          } else {
            handleRazorpayPayment();
            // navigate(
            //   `/payment?price=${
            //     discountData.discountPercentage
            //       ? discountPrice
            //       : location.search.split("?")[2] || planStore.price || formData.price
            //   }?id=${orderId}`
            // );
          }
        }

        if (location.search.includes("yearly-plan")) {
          navigate("/");
        }
      });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row pb-7 lg:pb-0">
        <div className="w-full lg:w-1/2">
          <img src={finishImage} className="mx-auto w-full lg:w-10/12" alt="" />
          <h3 className="text-heading-3 text-interactive-dark-destructive mt-2 text-center">
            You are almost done!!!
          </h3>
        </div>
        <div className="w-full lg:w-5/12 pt-5">
          <h3 className="text-heading-3-bold text-white-tertiary">
            Order Details
          </h3>

          <div className="border border-[#ddd] flex flex-col divide-y divide-[#ddd] rounded mt-3 shadow-lg">
            <div className="flex divide-x divide-[#ddd] bg-white-tertiary">
              <aside className="w-1/2 p-2">Plan Name</aside>
              <aside className="w-1/2 p-2 capitalize">
                {userData.yearlyPlanStartDate
                  ? "Yearly Plan"
                  : planStore.planName || formData.planName}
              </aside>
            </div>

            <div className="flex divide-x divide-[#ddd] text-white">
              {location.search.includes("yearly-plan") ? (
                <p className="p-2 w-full text-center">Yearly Plan</p>
              ) : (
                <>
                  <aside className="w-1/2 p-2">Price:</aside>
                  {/* <aside className="w-1/2 p-2 flex items-center">
                <FaRupeeSign className="text-subtitle-2" />{" "}
                <span className="font-bold flex items-center">
                  {location.search.split("?")[2] || planStore.price || formData.price / 100} (Includes {"   "}
                  <FaRupeeSign /> {(location.search.split("?")[2] || planStore.price || formData.price * 0.18) /
                    100}{" "}
                  18% GST )
                </span>
              </aside> */}
                  <GSTCalculator location={location} formData={formData} />
                </>
              )}
            </div>

            <div className="flex divide-x divide-[#ddd] bg-white-tertiary">
              <aside className="w-1/2 p-2">Order ID</aside>
              <aside className="w-1/2 p-2">{formData.orderId}</aside>
            </div>

            <div className="flex divide-x divide-[#ddd] text-white">
              <aside className="w-1/2 p-2">Name</aside>
              <aside className="w-1/2 p-2">
                {userData.first_name} {userData.last_name}
              </aside>
            </div>

            {/* <div className="flex divide-x divide-[#ddd] bg-grey-light">
              <aside className="w-1/2 p-2">Email ID</aside>
              <aside className="w-1/2 p-2">{userData.user_email}</aside>
            </div> */}

            {userData.yearlyPlanStartDate ? (
              <></>
            ) : (
              location.search.toLowerCase().includes("social") ||
              location.search.toLowerCase().includes("yearly-plan") || (
                <form
                  className="flex items-end p-2"
                  onSubmit={verifyCouponCode}
                >
                  <div className="w-3/4">
                    <InputField
                      hideRequired
                      fieldClassName={`!rounded-r-none ${
                        error &&
                        "border-interactive-dark-destructive outline-interactive-dark-destructive"
                      }`}
                      containerClassName={"!w-full !mb-0"}
                      onChange={(e) => setError(false)}
                      label={"Coupon Code"}
                      name={"couponCode"}
                      parentClassName="!mb-0"
                    />
                  </div>
                  <Button
                    className={"!w-1/4 !rounded-l-none !rounded-r-lg"}
                    containerClassName={"!p-0 !border-none"}
                  >
                    Apply
                  </Button>
                </form>
              )
            )}

            {location.search.includes("social") ||
              (discountData.discountPercentage && (
                <>
                  <div className="flex divide-x divide-[#ddd]">
                    <aside className="w-1/2 p-2">Discount</aside>
                    <aside className="w-1/2 p-2">
                      {discountData.discountPercentage
                        ? discountData.discountPercentage + "%"
                        : "N/A"}
                    </aside>
                  </div>

                  <div className="flex divide-x divide-[#ddd] bg-grey-light">
                    <aside className="w-1/2 p-2">Save</aside>
                    <aside className="w-1/2 p-2 flex font-bold items-center">
                      <FaRupeeSign className="text-subtitle-2" />
                      {saved}
                    </aside>
                  </div>

                  <div className="flex divide-x divide-[#ddd]">
                    <aside className="w-1/2 p-2">Price After Discount</aside>
                    <aside className="w-1/2 p-2 flex items-center">
                      <FaRupeeSign className="text-subtitle-2" />{" "}
                      <span className="font-bold">{discountPrice / 100}</span>
                    </aside>
                  </div>

                  {/* <div className="flex divide-x divide-[#ddd] bg-grey-light">
                  <aside className="w-1/2 p-2">Plan Name</aside>
                  <aside className="w-1/2 p-2">
                    {location.search.split("?")[1]}
                  </aside>
                </div> */}
                </>
              ))}
          </div>

          {/* <label className="flex items-center gap-1 justify-end mt-3 uppercase cursor-pointer">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={(e) => setHasCouponCode(e.target.checked)}
            />
            <span>I have a Coupon Code</span>
          </label> */}

          <div className="w-1/2 mt-5 ml-auto text-center">
            <textarea
              // name=""
              onChange={(e) => {
                setSignature(e.target.value);
                formData.signature = e.target.value;
              }}
              placeholder="Sign Here..."
              className="border-b resize-none text-heading-5 w-full focus:outline-none signature placeholder:font-sans text-center pb-3 bg-black text-white"
              // id=""
              // cols="1"
              value={signature}
              rows="1"
            ></textarea>
            <label className="cursor-pointer text-white">
              <input
                type="checkbox"
                disabled={signature.length === 0 || formData.accepted}
                onChange={(e) => {
                  setAccepted(e.target.checked);
                  formData.accepted = e.target.checked;
                  setShowAgreement(true);
                }}
                checked={formData.accepted}
              />{" "}
              I Accept the{" "}
              <Link
                className="text-interactive-light font-medium hover:text-interactive-dark-hover active:text-interactive-light-active focus:text-interactive-light-focus"
                to="/terms-and-conditions"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                Terms and Conditions
              </Link>
            </label>
          </div>

          {location.search.includes("social") ? (
            <div className="flex gap-2 justify-center">
              <Button
                type={"button"}
                onClick={handleSubmit}
                containerClassName={"mt-4"}
                disabled={
                  !location.pathname.includes("edit") &&
                  (!formData.accepted || !signature.length)
                }
              >
                Submit
              </Button>

              <Button
                type={"button"}
                onClick={handlePayLater}
                containerClassName={"mt-4"}
                disabled={!formData.accepted || !signature.length}
              >
                Save As Draft
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 justify-center">
              {userData.yearlyPlanEndDate ||
              location.search.toLowerCase().includes("social") ? (
                <Button
                  type={"button"}
                  onClick={handleSubmit}
                  containerClassName={"mt-4"}
                  disabled={!accepted || !signature.length}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type={"button"}
                  onClick={handleSubmit}
                  containerClassName={"mt-4"}
                  disabled={!accepted || !signature.length}
                >
                  Proceed to Checkout
                </Button>
              )}
              <Button
                type={"button"}
                onClick={handlePayLater}
                containerClassName={"mt-4"}
                disabled={!accepted || !signature.length}
              >
                Save As Draft
              </Button>
            </div>
          )}

          {/* <Button>Submit</Button> */}
        </div>
      </div>

      {showAgreement ? (
        <Agreement
          formData={formData}
          handleClose={() => setShowAgreement(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Distribution;
