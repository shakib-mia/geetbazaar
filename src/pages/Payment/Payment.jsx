import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import logo from "../../assets/icons/logo.PNG";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ProfileContext } from "../../contexts/ProfileContext";
import { PlanContext } from "../../contexts/PlanContext";
import { formatDate } from "../../utils/formatDate";
import { SiRazorpay } from "react-icons/si";
import { useRazorpay } from "react-razorpay";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";

const Payment = () => {
  const Razorpay = useRazorpay();
  const location = useLocation();
  const { token, userData } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [songData, setSongData] = useState({});
  // const { formData } = useContext(ScreenContext);
  const { setPlanStore, planStore } = useContext(PlanContext);
  const [formData, setFormData] = useState({});
  const order_id = location.search.split("?")[2].split("=")[1];

  useEffect(() => {
    axios
      .get(backendUrl + "recent-uploads/by-order-id/" + order_id, {
        headers: {
          token,
        },
      })
      .then(({ data }) => setFormData(data));
  }, []);

  // console.log();
  // console.log(planStore);
  // console.log(data);
  // console.log();
  // console.log(songId);

  useEffect(() => {
    // console.log(location.search.split("?")[2].split("=")[1]);
    axios
      .get(
        backendUrl +
          "songs/by-order-id/" +
          location.search.split("?")[2].split("=")[1]
      )
      .then(({ data }) => {
        // data;
        setSongData(data);
      });
  }, []);

  const handleRazorpayPayment = async (params) => {
    axios
      .post(backendUrl + "razorpay", {
        amount: parseFloat(formData.price),
        currency: userData.billing_country === "India" ? "INR" : "USD",
      }) // ============  *** Need to set amount dynamically here ***  ================
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
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
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
              order_id,
              payment_id: songData.payment_id,
            }));
            // navigate("/payment-success");
            // clg;
            // songData, razorpay_order_id;
            songData.order_id = razorpay_order_id;
            songData.payment_id = razorpay_payment_id;
            songData.status = "paid";
            songData.paymentDate = formatDate(new Date());
            axios
              .put(backendUrl + "songs/by-order-id/" + formData.price, songData)
              .then(({ data }) => {
                if (data.acknowledged) {
                  axios
                    .get(`${backendUrl}plans/monthly-sales/${formData.price}`, {
                      headers: {
                        token,
                      },
                    })
                    .then(({ data }) => console.log(data));
                  navigate("/payment-success");
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
  // console.log();

  // const handlePhonePePayment = (amount) => {
  //   console.log(amount);
  //   const options = {
  //     method: "post",
  //     url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
  //     headers: {
  //       accept: "text/plain",
  //       "Content-Type": "application/json",
  //     },
  //     data: {
  //       merchantId: "PGTESTPAYUAT",
  //       merchantTransactionId: "MT7850590068188104",
  //       merchantUserId: "MUID123",
  //       amount: 10000,
  //       redirectUrl: "https://webhook.site/redirect-url",
  //       redirectMode: "REDIRECT",
  //       callbackUrl: "https://webhook.site/callback-url",
  //       mobileNumber: "9999999999",
  //       paymentInstrument: {
  //         type: "PAY_PAGE",
  //       },
  //     },
  //   };

  //   const data = {
  //     name: "shakib",
  //     amount: 1,
  //     number: 91812345679,
  //     MID: "MID" + Date.now(),
  //     merchantTransactionId: "T" + Date.now(),
  //   };

  //   axios
  //     .post(backendUrl + "phonepe-payment/pay", data)
  //     .then(({ data }) => {
  //   (data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "0.01",
          },
        },
      ],
    });
  };

  const handleApprove = async (data, actions) => {
    // return actions.order.capture().then((details) => {
    //   const { payer } = details;
    //   console.log(details);
    //   // Handle successful payment here
    //   // For example, send payment details to your server
    // });

    const order = await actions.order.capture();
    console.log({
      transaction_id: order.purchase_units[0].payments.captures[0].id,
    });
  };

  // console.log({ formData });

  const handlePayWithGeetCoin = () => {
    Swal.fire({
      title: "Are you sure?",
      html: "You will be charged <b>999 GeetCoins</b> for this transaction.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22683E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed",
      customClass: {
        popup: "custom-swal-zindex-popup",
        backdrop: "custom-swal-zindex-backdrop",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const config = {
          headers: {
            token,
          },
        };
        axios
          .post(
            backendUrl + "tokenize/charge/" + formData.orderId,
            { amount: 999 },
            config
          )
          .then(({ data }) => {
            if (data.success) {
              setPlanStore((prev) => ({
                ...prev,
                order_id,
                payment_id: songData.payment_id,
              }));
              songData.order_id = order_id;
              songData.payment_id = "geetcoin-payment";
              songData.status = "paid";
              songData.paymentDate = formatDate(new Date());
              axios
                .put(
                  backendUrl + "songs/by-order-id/" + formData.orderId,
                  songData
                )
                .then(({ data }) => {
                  if (data.acknowledged) {
                    axios
                      .get(
                        `${backendUrl}plans/monthly-sales/${formData.price}`,
                        {
                          headers: {
                            token,
                          },
                        }
                      )
                      .then(({ data }) => console.log(data));
                    navigate("/payment-success");
                  }
                });
            } else {
              Swal.fire({
                title: "Payment Failed",
                text: "You do not have enough GeetCoins to complete this transaction.",
                icon: "error",
                confirmButtonColor: "#22683E",
                customClass: {
                  popup: "custom-swal-zindex-popup",
                  backdrop: "custom-swal-zindex-backdrop",
                },
              });
            }
          })
          .catch((error) => {
            console.error("Payment error:", error);
            Swal.fire({
              title: "Payment Error",
              text: "There was an error processing your payment. Please try again later.",
              icon: "error",
              confirmButtonColor: "#22683E",
              customClass: {
                popup: "custom-swal-zindex-popup",
                backdrop: "custom-swal-zindex-backdrop",
              },
            });
          });
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col w-10/12 md:w-1/2 xl:w-1/4 relative shadow-xl rounded-lg">
        <div className="p-4">
          <button
            className="w-full flex justify-center items-baseline text-black hover:bg-white hover:text-primary transition py-2 border-2 border-primary rounded-full mb-3" // mt-6 will be here when more methods and header will be added
            onClick={() => {
              handleRazorpayPayment(99900);
            }}
          >
            <SiRazorpay className="" />
            <p className="italic text-heading-6-bold">Razorpay</p>
            {/* <img src={razorpay} alt="razorpay" className="w-1/3 grayscale" /> */}
          </button>
          <Button className="!rounded-full" onClick={handlePayWithGeetCoin}>
            Pay with GeetCoin
          </Button>
          {/* 
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              onApprove={handleApprove}
              createOrder={createOrder}
            />
          </PayPalScriptProvider> */}
        </div>
      </div>
    </div>
  );
};

export default Payment;
