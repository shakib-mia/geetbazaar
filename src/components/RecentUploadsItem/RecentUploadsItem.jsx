import React, { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { CiStreamOff, CiStreamOn } from "react-icons/ci";
import { BsSendArrowUp } from "react-icons/bs";
import { TbCopyrightOff, TbMusicOff } from "react-icons/tb";
import { RiEditBoxLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";
import Button from "../Button/Button";
import Takedown from "../Takedown/Takedown";

const RecentUploadsItem = ({
  songData,
  // setUpdate,
  // update
}) => {
  const navigate = useNavigate();
  const { token } = useContext(ProfileContext);

  const [takedownId, setTakedownId] = useState("");

  const { songName, albumTitle, artwork, orderId, _id, price, status } =
    songData;

  return (
    <div className="grid grid-cols-2 items-center text-center gap-2 p-2 rounded-xl hover:bg-black/5 transition">
      {takedownId && <Takedown setEditId={setTakedownId} songData={songData} />}

      {/* Left side: Song artwork + info */}
      <div className="flex items-center gap-3">
        <img
          src={artwork}
          alt="artwork"
          className="w-12 h-12 rounded-md object-cover"
        />
        <div className="text-left flex-1">
          <h4 className="text-heading-5-bold truncate">{songName}</h4>
          <h6 className="text-heading-6 truncate text-gray-500">
            {albumTitle}
          </h6>
        </div>
      </div>

      {/* Right side: Actions + Status */}
      <div className="flex items-center justify-end gap-3">
        {/* Edit */}
        <div className="relative">
          <RiEditBoxLine
            className="cursor-pointer text-gray-600 hover:text-black"
            onClick={() => navigate(`/edit-song/${_id}`)}
            data-tooltip-id={`edit-${_id}`}
            data-tooltip-content="Edit Song"
          />
          <Tooltip id={`edit-${_id}`} />
        </div>

        {/* Status icons */}
        {status === "paid" && (
          <>
            <FaCheckCircle
              className="text-green-600 w-5 h-5"
              data-tooltip-id={`status-${_id}`}
              data-tooltip-content="Paid"
            />
            <Tooltip id={`status-${_id}`} />
          </>
        )}

        {status === "sent-to-stores" && (
          <>
            <BsSendArrowUp
              className="text-blue-500 w-5 h-5"
              data-tooltip-id={`status-${_id}`}
              data-tooltip-content="Sent to Stores"
            />
            <Tooltip id={`status-${_id}`} />
          </>
        )}

        {status === "streaming" && (
          <div className="flex gap-1 items-center">
            <CiStreamOn
              className="text-green-500 w-5 h-5"
              data-tooltip-id={`status-${_id}`}
              data-tooltip-content="Streaming"
            />
            <CiStreamOff
              className="text-red-600 w-5 h-5 cursor-pointer"
              onClick={() => setTakedownId(_id)}
              data-tooltip-id={`takedown-${_id}`}
              data-tooltip-content="Request Takedown"
            />
            <Tooltip id={`status-${_id}`} />
            <Tooltip id={`takedown-${_id}`} />
          </div>
        )}

        {status === "Copyright infringed" && (
          <>
            <TbCopyrightOff
              className="text-red-500 w-5 h-5"
              data-tooltip-id={`status-${_id}`}
              data-tooltip-content="Copyright Infringed"
            />
            <Tooltip id={`status-${_id}`} />
          </>
        )}

        {status === "taken-down" && (
          <>
            <TbMusicOff
              className="text-red-800 w-5 h-5"
              data-tooltip-id={`status-${_id}`}
              data-tooltip-content="Taken Down"
            />
            <Tooltip id={`status-${_id}`} />
          </>
        )}

        {/* Payment button if not free */}
        {!status && Number(price) > 0 && (
          <Button
            small
            onClick={() => navigate(`/payment?price=${price}&id=${orderId}`)}
          >
            Pay Now
          </Button>
        )}

        {/* Free submission */}
        {!status && Number(price) === 0 && (
          <p className="text-green-600 text-sm">Submitted Successfully</p>
        )}
      </div>
    </div>
  );
};

export default RecentUploadsItem;
