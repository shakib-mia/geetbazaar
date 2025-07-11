import React, { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaMusic } from "react-icons/fa";
import { CiStreamOff, CiStreamOn } from "react-icons/ci";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { PlanContext } from "../../contexts/PlanContext";
import Swal from "sweetalert2";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import { BsSendArrowUp } from "react-icons/bs";
import { TbCopyrightOff, TbMusicOff } from "react-icons/tb";
import EditSong from "../EditSong/EditSong";
import { RiEditBoxLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import Takedown from "../Takedown/Takedown";

const RecentUploadsItem = (props) => {
  //   console.log(props);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    songName,
    orderId,
    _id,
    payment_id,
    price,
    requested,
    setUpdate,
    update,
    status,
    songData,
  } = props;
  console.log(props);
  const { token } = useContext(ProfileContext);
  const [reason, setReason] = useState("");
  const [editId, setEditId] = useState("");
  const [takedownId, setTakedownId] = useState("");
  console.log(status);

  const handleRefundRequest = () => {
    const updated = { ...props };
    delete updated.update;
    updated.reason = reason;
    // updated;
    // // console.log(updated);
    // axios.post(backendUrl + "refund", updated, config).then(({ data }) => {
    //   // if()
    //   setUpdate(!update);
    // });
  };

  const handleReason = async () => {
    const { value: reasonValue } = await Swal.fire({
      title: "Refund",
      input: "select",
      inputOptions: {
        "Reason 1": "Reason 1",
        "Reason 2": "Reason 2",
        "Reason 3": "Reason 3",
        "Reason 4": "Reason 4",
      },
      inputLabel: "Reason for Refund",
      inputPlaceholder: "Enter Refund Reason",
      confirmButtonText: "Submit",
      confirmButtonColor: "#22683E",
      inputAttributes: {
        id: "myInput",
      },
      // customButton2: "Submit",
    });

    setReason(reasonValue);
    // console.log(reason);
  };

  useEffect(() => {
    if (reason.length > 0) {
      const updated = { ...props };
      updated.reason = reason;
      delete updated.update;
      delete updated.setUpdate;
      // const isrcs = userData?.isrc?.split(",");
      const config = {
        headers: {
          token: sessionStorage.getItem("token") || token,
        },
      };

      // console.log(updated);
      axios.post(backendUrl + "refund", updated, config).then(({ data }) => {
        // if()
        setUpdate(!update);
      });
    }
  }, [reason]);

  return (
    <div className="grid grid-cols-2 items-center text-center">
      {takedownId.length > 0 && (
        <Takedown setEditId={setTakedownId} songData={songData} />
      )}

      <div className="flex gap-1">
        <img src={props.artwork} alt="art-work" className="w-7 aspect-square" />
        <aside>
          <h4 className="text-heading-4-bold">{songName}</h4>
          <h6 className="text-heading-6-bold">{props.albumTitle}</h6>

          {/* <p>{props.status}</p> */}

          <div className="flex items-center gap-1 mt-2">
            <RiEditBoxLine
              className="cursor-pointer"
              onClick={() => navigate("/edit-song/" + _id)}
              title="Edit"
              data-tooltip-id={"edit" + _id}
              data-tooltip-content={`Edit`}
              data-tooltip-place="top"
            />
            {payment_id ? (
              <p
                className="text-subtitle-1 flex gap-1 items-center justify-center capitalize w-full"
                title={payment_id}
              >
                <span
                  className={
                    status === "streaming"
                      ? "text-interactive-light"
                      : status === "paid"
                      ? "text-interactive-light-confirmation-focus"
                      : status === "sent-to-stores"
                      ? "text-interactive-light-confirmation"
                      : status === "Copyright infringed"
                      ? "text-interactive-light-destructive"
                      : status === "taken-down"
                      ? "text-interactive-dark-destructive"
                      : ""
                  }
                >
                  {status}
                </span>
                {status === "paid" ? (
                  <FaCheckCircle className="text-interactive-light-confirmation-focus" />
                ) : status === "Sent to Stores" ? (
                  <BsSendArrowUp className="text-interactive-light-confirmation" />
                ) : status === "streaming" ? (
                  <div className="flex gap-2">
                    <CiStreamOn className="text-interactive-light w-3 h-3" />
                    <CiStreamOff
                      className="text-heading-6 cursor-pointer"
                      data-tooltip-id={"takedown" + _id}
                      data-tooltip-content={`Takedown`}
                      data-tooltip-place="top"
                      onClick={() => setTakedownId(_id)}
                    />
                    <Tooltip id={"takedown" + _id} />
                  </div>
                ) : status === "Copyright infringed" ? (
                  <TbCopyrightOff className="text-interactive-light-destructive w-3 h-3" />
                ) : status === "taken-down" ? (
                  <TbMusicOff className="text-interactive-dark-destructive w-3 h-3" />
                ) : (
                  <></>
                )}
              </p>
            ) : price === "0" && !status ? (
              <p className="text-center mx-auto text-interactive-light-confirmation">
                Submitted Successfully
              </p>
            ) : status ? (
              <p
                className={`text-center capitalize mx-auto ${
                  status === "Copyright infringed"
                    ? "text-interactive-light-destructive"
                    : status === "Sent to Stores"
                    ? "text-interactive-light-confirmation"
                    : status === "streaming"
                    ? "text-interactive-light"
                    : status === "taken-down"
                    ? "text-interactive-dark-destructive"
                    : ""
                }`}
              >
                {status.includes("-") ? status.split("-").join(" ") : status}
              </p>
            ) : price ? (
              <Button
                containerClassName={"mx-auto"}
                small={true}
                onClick={() => {
                  navigate(`/payment?price=${price}?id=${orderId}`);
                  // setPlanStore({ planName, price });
                }}
              >
                Pay Now
              </Button>
            ) : (
              <p className="mx-auto">{status}</p>
            )}
          </div>
        </aside>
      </div>
      {/* {editId.length > 0 && <EditSong setEditId={setEditId} songData={props} />} */}
      {/* <div className="flex gap-1 items-center">
        <FaMusic />
        <div>{songName}</div>
      </div>
      <aside className="flex items-center">
        <RiEditBoxLine
          className="cursor-pointer"
          onClick={() => navigate("/edit-song/" + _id)}
          title="Edit"
          data-tooltip-id={"edit" + _id}
          data-tooltip-content={`Edit`}
          data-tooltip-place="top"
        />
        {payment_id ? (
          <p
            className="text-subtitle-1 flex gap-1 items-center justify-center capitalize w-full"
            title={payment_id}
          >
            <span
              className={
                status === "streaming"
                  ? "text-interactive-light"
                  : status === "paid"
                  ? "text-interactive-light-confirmation-focus"
                  : status === "sent-to-stores"
                  ? "text-interactive-light-confirmation"
                  : status === "Copyright infringed"
                  ? "text-interactive-light-destructive"
                  : status === "taken-down"
                  ? "text-interactive-dark-destructive"
                  : ""
              }
            >
              {status}
            </span>
            {status === "paid" ? (
              <FaCheckCircle className="text-interactive-light-confirmation-focus" />
            ) : status === "Sent to Stores" ? (
              <BsSendArrowUp className="text-interactive-light-confirmation" />
            ) : status === "streaming" ? (
              <div className="flex gap-2">
                <CiStreamOn className="text-interactive-light w-3 h-3" />
                <CiStreamOff
                  className="text-heading-6 cursor-pointer"
                  data-tooltip-id={"takedown" + _id}
                  data-tooltip-content={`Takedown`}
                  data-tooltip-place="top"
                  onClick={() => setTakedownId(_id)}
                />
                <Tooltip id={"takedown" + _id} />
              </div>
            ) : status === "Copyright infringed" ? (
              <TbCopyrightOff className="text-interactive-light-destructive w-3 h-3" />
            ) : status === "taken-down" ? (
              <TbMusicOff className="text-interactive-dark-destructive w-3 h-3" />
            ) : (
              <></>
            )}
          </p>
        ) : price === "0" && !status ? (
          <p className="text-center mx-auto text-interactive-light-confirmation">
            Submitted Successfully
          </p>
        ) : status ? (
          <p
            className={`text-center capitalize mx-auto ${
              status === "Copyright infringed"
                ? "text-interactive-light-destructive"
                : status === "Sent to Stores"
                ? "text-interactive-light-confirmation"
                : status === "streaming"
                ? "text-interactive-light"
                : status === "taken-down"
                ? "text-interactive-dark-destructive"
                : ""
            }`}
          >
            {status.includes("-") ? status.split("-").join(" ") : status}
          </p>
        ) : price ? (
          <Button
            containerClassName={"mx-auto"}
            small={true}
            onClick={() => {
              navigate(`/payment?price=${price}?id=${orderId}`);
              // setPlanStore({ planName, price });
            }}
          >
            Pay Now
          </Button>
        ) : (
          <p className="mx-auto">{status}</p>
        )}
      </aside> */}

      {/* {status === "taken-down" || status === "copyright-infringed" ? (
        <></>
      ) : (
        location.pathname !== "/home" && (
          <Button
            containerClassName={
              "mx-auto focus:border-interactive-light-destructive-focus"
            }
            disabled={requested}
            small={true}
            onClick={handleReason}
            // containerClassName=''
            className={
              "bg-interactive-light-destructive hover:!bg-interactive-light-destructive-hover focus:!bg-interactive-light-destructive-focus active:!bg-interactive-light-destructive-active disabled:hover:!bg-interactive-light-destructive-disabled disabled:!bg-interactive-light-destructive-disabled"
            }
            type={"destructive"}
          >
            Refund
          </Button>
        )
      )} */}
    </div>
  );
};

export default RecentUploadsItem;
