import React, { useEffect, useState } from "react";
// import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import SongUploadForm from "../../components/SongUploadForm/SongUploadForm";
// import { useLocation, useParams } from "react-router-dom";
// // import { backendUrl } from "../../constants";
// import axios from "axios";
// import logo from "../../assets/icons/logo.PNG";
// import { toast } from "react-toastify";
// import { ProfileContext } from "../../contexts/ProfileContext";
// import useRazorpay from "react-razorpay";

const SongUpload = () => {
  const [count, setCount] = useState(1);
  // const { token } = useContext(ProfileContext);
  // const [Razorpay] = useRazorpay();
  // const [singleUpload, setSingleUpload] = useState(true);
  const [uploadType, setUploadType] = useState("Single");
  const [submitted, setSubmitted] = useState(false);
  // const params = useLocation();
  // const planName = params.search.slice(1, params.search.length);
  // const queryParams = params.search
  //   .split("?")
  //   .slice(1, params.search.split("?").length);

  // Razorpay

  // const handleRazorpayPayment = async (amount) => {
  //   axios
  //     .post(backendUrl + "razorpay", { amount }) // ============  *** Need to set amount dynamically here ***  ================
  //     .then(({ data }) => {
  //       initPayment(data);
  //   (data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const initPayment = (data) => {
  //   const config = {
  //     headers: {
  //       token: sessionStorage.getItem("token") || token,
  //     },
  //   };
  //   const options = {
  //     key: "rzp_test_ltnS4Oawf8bRte",
  //     amount: queryParams[1],
  //     currency: data.currency,
  //     name: data.name,
  //     description: "Test",
  //     image: logo,
  //     order_id: data.id,
  //     handler: async (response) => {
  //       try {
  //         const verifyUrl = backendUrl + "razorpay/verify";
  //         const res = await axios.post(
  //           verifyUrl,
  //           { ...response, paidAmount: data.amount, planName },
  //           config
  //         );

  //         toast.success(res.data, {
  //           position: "bottom-center",
  //         });
  //       } catch (error) {
  //     (error);
  //       }
  //     },
  //     theme: {
  //       color: "#064088",
  //     },
  //   };

  //   const rzp1 = new Razorpay(options);
  //   rzp1.open();
  // };

  // const handlePhonePePayment = (amount) => {
  //   // console.log(amount);
  //   // const options = {
  //   //   method: "post",
  //   //   url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
  //   //   headers: {
  //   //     accept: "text/plain",
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // data: {
  //   //   merchantId: "PGTESTPAYUAT",
  //   //   merchantTransactionId: "MT7850590068188104",
  //   //   merchantUserId: "MUID123",
  //   //   amount: 10000,
  //   //   redirectUrl: "https://webhook.site/redirect-url",
  //   //   redirectMode: "REDIRECT",
  //   //   callbackUrl: "https://webhook.site/callback-url",
  //   //   mobileNumber: "9999999999",
  //   //   paymentInstrument: {
  //   //     type: "PAY_PAGE",
  //   //   },
  //   // },
  //   // };

  //   const data = {
  //     name: "shakib",
  //     amount: 1,
  //     number: 91812345679,
  //     MID: "MID" + Date.now(),
  //     merchantTransactionId: "T" + Date.now(),
  //   };

  //   // console.log(data);

  //   axios
  //     .post(backendurl"phonepe-payment/pay", data)
  //     .then(({ data }) => {
  //   (data);
  //       // window.open(data.data.instrumentResponse.redirectInfo.url);
  //     })
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    // console.log(uploadType);
    if (uploadType === "Single") {
      setCount(1);
    } else if (uploadType === "Album") {
      setCount(1);
    }
  }, [uploadType]);

  return (
    <>
      <div className="p-3 2xl:p-4 mb-6 2xl:mb-0 w-10/12 mx-auto shadow-md mt-4 rounded">
        <h1 className="text-heading-4-bold xl:text-heading-1-bold text-grey pb-3 xl:pb-7">
          Let's Release a Chartbuster
        </h1>
        <h3 className="text-heading-5-bold xl:text-heading-3-bold text-grey pb-4">
          What Do You Want to Release?
        </h3>
        <label className="text-heading-6-bold md:text-heading-5-bold text-grey-dark flex items-center gap-1">
          <input
            type="radio"
            name="upload-type"
            checked={uploadType === "Single"}
            className="mr-1"
            onChange={(e) => {
              e.target.checked && setUploadType("Single");
            }}
          />
          Single Song
        </label>
        <br />
        {/* <br /> */}
        {/* <br /> */}
        <label className="text-heading-6-bold md:text-heading-5-bold text-grey-dark flex items-center gap-1 mb-2">
          <input
            type="radio"
            name="upload-type"
            checked={uploadType === "Album"}
            className="mr-1"
            onChange={(e) => {
              e.target.checked && setUploadType("Album");
            }}
          />
          Album
        </label>
        <label className="text-heading-6-bold md:text-heading-5-bold text-grey-dark flex items-center gap-1 mb-2">
          <input
            type="radio"
            name="upload-type"
            checked={uploadType === "Film"}
            className="mr-1"
            onChange={(e) => {
              e.target.checked && setUploadType("Film");
            }}
          />
          Film
        </label>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <InputField
          label={"UPC"}
          id={"upc"}
          required={true}
          type={"text"}
          name={"upc"}
          placeholder={"UPC"}
          note={
            "If you already have a UPC for this release, please add. If not, no problem, we'll create one for you."
          }
        />
        <InputField
          required={true}
          type={"text"}
          label={"Album Name"}
          id={"album-name"}
          name={"albumName"}
          placeholder={"Album Name"}
        />
      </div> */}
        <br />
        <br />
        {[...Array(count).fill()].map((_, index) => (
          <SongUploadForm
            index={index}
            key={index}
            setSubmitted={setSubmitted}
            uploadType={uploadType}
          />
        ))}
        {uploadType !== "Single" && submitted && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setCount((count) => count + 1)}
              text={"Add More"}
            ></Button>
          </div>
        )}

        {/* <form className="flex flex-col w-full items-center mt-3">
        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          {fields.map((item) => (
            <InputField {...item} />
          ))}

          <aside>
            <h6>Previously Released</h6>
            <input
              type="radio"
              name="prev-Released"
              id="yes"
              checked={previouslyReleased}
              onChange={(e) => setPreviouslyReleased(true)}
            />{" "}
            <label htmlFor="yes">Yes</label>
            <br />
            <input
              type="radio"
              name="prev-Released"
              id="no"
              checked={!previouslyReleased}
              onChange={(e) => setPreviouslyReleased(false)}
            />{" "}
            <label htmlFor="no">No</label>
          </aside>
        </div>

        <Button type={"submit"} text="submit"></Button>
      </form> */}
      </div>
      <div className="flex justify-center mt-5">
        <Button text={"Save and Next"}></Button>
      </div>
    </>
  );
};

export default SongUpload;
