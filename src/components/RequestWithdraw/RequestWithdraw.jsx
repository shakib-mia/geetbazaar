import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";

const RequestWithdraw = () => {
  const { userData, foundRequested, token, setRefetch } =
    useContext(ProfileContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or validate data
    if (userData && foundRequested !== undefined) {
      setLoading(false); // Data has been loaded
    }
  }, [userData, foundRequested]);
  console.log(userData);

  const handleRevenueWithdraw = () => {
    if (userData.kycFilled) {
      const config = {
        headers: { token },
      };

      axios.get(backendUrl + "withdrawal-request", config).then(({ data }) => {
        if (data.insertedId) {
          setRefetch((ref) => !ref);
          toast.success("Withdrawal Request Submitted Successfully");
        }
      });
    } else {
      navigate("/revenue-form");
    }
  };

  console.log(
    foundRequested,
    loading,
    userData.lifetimeDisbursed,
    userData.lifetimeRevenue
  );
  // console.log(
  //   loading || // Disable the button while loading
  //     (
  //       (userData.lifetimeRevenue?.toFixed(2) || 0) -
  //       (userData.lifetimeDisbursed?.toFixed(2) || 0)
  //     ).toFixed(2) < 1000 ||
  //     (foundRequested !== null && foundRequested._id)
  // );
  return (
    <Button
      onClick={handleRevenueWithdraw}
      disabled={
        loading || // Disable the button while loading
        (
          (userData.lifetimeRevenue?.toFixed(2) || 0) -
          (userData.lifetimeDisbursed?.toFixed(2) || 0)
        ).toFixed(2) < 1000 ||
        (foundRequested !== null && foundRequested._id)
      }
      // variant={"confirmation"}
      className={
        "bg-interactive-light-confirmation-focus disabled:hover:!bg-interactive-light-confirmation-disabled !shadow-interactive-light-confirmation-focus hover:!bg-interactive-light-confirmation-hover"
      }
      // disabled={false}
      text={
        foundRequested !== null && foundRequested._id
          ? "Already Requested"
          : `Request${loading ? "ing" : ""} Withdraw`
      }
    ></Button>
  );
};

export default RequestWithdraw;
