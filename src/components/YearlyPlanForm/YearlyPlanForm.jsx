import React, { useContext, useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import { PlanContext } from "../../contexts/PlanContext";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import logo from "../../assets/icons/logo.PNG";
import useRazorpay from "react-razorpay";
import { toast } from "react-toastify";

const YearlyPlanForm = () => {
  const { userData, token, dollarRate } = useContext(ProfileContext);
  const [orderId, setOrderId] = useState("XXXXX");
  const location = useLocation();
  const navigate = useNavigate();
  const { setPlanStore, planStore } = useContext(PlanContext);
  const [Razorpay] = useRazorpay();
  console.clear();
  console.log(dollarRate);

  useEffect(() => {
    axios
      .get(backendUrl + "generate-order-id", config)
      .then(({ data }) => setOrderId(data.orderId));
  }, []);

  const fields = [
    {
      placeholder: "Enter Yor Email ID",
      required: true,
      hideRequired: true,
      name: "emailId",
      id: "emailId",
      label: "Email ID",
      containerClassName: "mt-0",
      value: userData.user_email || userData.emailId,
      disabled: true,
    },
    {
      placeholder: "Phone Number",
      required: true,
      hideRequired: true,
      name: "phoneNo.",
      // name: "phoneNo",
      label: "Phone No.",
      value: userData.phone_no,
      disabled: true,
    },
    {
      placeholder: "Total Released Song",
      required: true,
      hideRequired: true,
      name: "totalReleasedSong",
      id: "totalReleasedSong",
      label: "Total Released Song",
      type: "text",
    },
    {
      placeholder: "Total Revenue Earned",
      required: true,
      hideRequired: true,
      name: "totalRevenueEarned",
      id: "totalRevenueEarned",
      label: "Total Revenue Earned",
    },
    {
      placeholder: "Spotify Profile Link",
      required: true,
      hideRequired: true,
      label: "Spotify Profile Link",
      name: "spotifyProfileLink",
      id: "spotifyProfileLink",
    },
    {
      placeholder: "JioSaavn Profile Link",
      required: true,
      hideRequired: true,
      label: "JioSaavn Profile Link",
      name: "jioSaavnProfileLink",
      id: "jioSaavnProfileLink",
    },
    {
      placeholder: "YouTube Profile Link",
      required: true,
      hideRequired: true,
      label: "YouTube Profile Link",
      name: "youtubeProfileLink",
      id: "youtubeProfileLink",
    },
    {
      placeholder: "Instagram account link",
      required: true,
      hideRequired: true,
      label: "Instagram account link",
      name: "instagramAccountLink",
      id: "instagramAccountLink",
      type: "text",
    },
    {
      placeholder: "Facebook account link",
      required: true,
      hideRequired: true,
      label: "Facebook account link",
      name: "facebookAccountLink",
      id: "facebookAccountLink",
      type: "text",
    },
    {
      placeholder: "Monthly Content",
      required: true,
      hideRequired: true,
      label: "Monthly Content",
      name: "monthlyContent",
      id: "monthlyContent",
      type: "number",
    },
    {
      placeholder: "Monthly Listeners",
      required: true,
      hideRequired: true,
      label: "Monthly Listeners",
      name: "monthlyListeners",
      id: "monthlyListeners",
      type: "number",
    },
    {
      placeholder: "Number of songs uploaded till date through BackVision",
      required: true,
      hideRequired: true,
      name: "songsTillDateThroughBackVision",
      id: "songsTillDateThroughBackVision",
      label: "Number of songs uploaded till date through BackVision",
    },
  ];

  const handleRazorpayPayment = async (formData) => {
    // console.log();
    axios
      .post(backendUrl + "razorpay", {
        amount:
          userData.billing_country === "India"
            ? parseFloat(429900)
            : parseInt(429900 * dollarRate),
        currency: userData.billing_country === "India" ? "INR" : "USD",
      }) // ============  *** Need to set amount dynamically here ***  ================
      .then(({ data }) => initPayment(data, formData))
      .catch((error) => console.log(error));
  };
  // console.log(location);
  const initPayment = (data, formData) => {
    const options = {
      // key: "rzp_live_hbtXvHKqIxw2XQ",
      key: "rzp_test_VWlIF0sBVpBClm",
      amount:
        userData.billing_country === "India"
          ? parseFloat(429900)
          : parseInt(429900 * dollarRate),
      // currency: data.currency,
      name: data.name,
      currency: userData.billing_country === "India" ? "INR" : "USD",
      description: "Test",
      image: logo,
      order_id: data.id,
      handler: async (response) => {
        // response.songId =
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const verifyUrl = backendUrl + "razorpay/verify/yearly";
          const config = {
            headers: {
              token,
            },
          };
          // console.log(config);
          const res = await axios.post(
            verifyUrl,
            { ...response, price: 429900 },
            config
          );
          // res;

          if (res.data.insertCursor.acknowledged) {
            setPlanStore((prev) => ({
              planName: "GeetBazaar Yearly Plan",
              price: 429900,
              order_id: orderId,
              payment_id: razorpay_payment_id,
            }));
            // navigate("/payment-success");
            // clg;
            // songData, razorpay_order_id;
            formData.orderId = orderId;
            formData.order_id = razorpay_order_id;
            formData.payment_id = razorpay_payment_id;
            formData.status = "paid";
            formData.paymentDate = formatDate(new Date());
            formData.planName = location.search.split("?")[1];

            axios
              .get(`${backendUrl}plans/monthly-sales/${429900}`, {
                headers: {
                  token,
                },
              })
              .then(({ data }) => console.log(data));
            navigate("/payment-success");

            axios
              .post(backendUrl + "yearly-plans", formData, {
                headers: { token },
              })
              .then(({ data }) => {
                if (data.acknowledged) {
                  // e.target.reset();
                  toast.success("Yearly Plan Activated");
                }
              });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const planData = {};

    fields.map((item) => (planData[item.name] = e.target[item.name].value));
    handleRazorpayPayment(planData);

    // console.log(planData);

    // console.log(planData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full overflow-y-auto bg-white h-full"
    >
      {fields.map((field, key) => (
        <InputField
          // labelClassName={"!text-white"}
          containerClassName={"mt-1 lg:mt-4"}
          key={key}
          // type={"text"}
          // className="text-black"
          {...field}
        />
      ))}

      <div className="flex justify-center mt-2">
        <Button type={"submit"}>Submit</Button>
      </div>
    </form>
  );
};

export default YearlyPlanForm;
