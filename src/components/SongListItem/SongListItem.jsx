import React, { useContext, useState } from "react";
import { FaMusic } from "react-icons/fa";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { PlanContext } from "../../contexts/PlanContext";
import Swal from "sweetalert2";
import { RiEditBoxLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import EditSong from "../EditSong/EditSong";
import { CiStreamOff } from "react-icons/ci";
import { createPortal } from "react-dom"; // Import React Portal
import Takedown from "../Takedown/Takedown";
import dummyAlbumArt from "./../../assets/images/amogh-sympathy.webp";

const SongListItem = ({
  songName,
  status,
  price,
  planName,
  Album,
  ArtistName,
  ISRC,
  UPC,
  _id,
  Song,
  songData,
  albumArt,
}) => {
  const { setPlanStore } = useContext(PlanContext);
  const navigate = useNavigate();
  const [editId, setEditId] = useState("");
  const [takedownId, setTakedownId] = useState("");
  const location = useLocation();
  console.log({
    songName,
    status,
    price,
    planName,
    Album,
    ArtistName,
    ISRC,
    UPC,
    _id,
    Song,
    songData,
    albumArt,
  });

  return (
    <>
      {/* Render modals using React Portal */}
      {editId.length > 0 &&
        createPortal(
          <EditSong setEditId={setEditId} songData={songData} />,
          document.getElementById("modal-root") // The ID of the div in your index.html
        )}
      {takedownId.length > 0 &&
        createPortal(
          <Takedown setEditId={setTakedownId} songData={songData} />,
          document.getElementById("modal-root") // The ID of the div in your index.html
        )}
      {/* <div className="flex flex-col items-center gap-2">
        <div className="relative group w-full">
          <img
            className="rounded-lg"
            src={albumArt || dummyAlbumArt}
            alt="album art"
          />
          <div className="absolute z-[9999] top-0 left-0 flex gap-1 text-heading-6 items-center w-full h-full justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition">
            <RiEditBoxLine
              className="cursor-pointer"
              onClick={() =>
                Song ? setEditId(_id) : navigate(`/edit-song/${_id}`)
              }
              title="Edit"
              data-tooltip-id={"edit" + _id}
              data-tooltip-content={`Edit`}
              data-tooltip-place="top"
            />
            <Tooltip id={"edit" + _id} />

            <CiStreamOff
              className="cursor-pointer text-interactive-light-destructive-focus text-heading-5"
              title="Takedown"
              data-tooltip-id={"takedown" + _id}
              data-tooltip-content={`Takedown`}
              data-tooltip-place="top"
              onClick={() => setTakedownId(_id)}
            />
            <Tooltip id={"takedown" + _id} />
          </div>
        </div>
        <h6 className="text-heading-6 text-black">{Song || songName}</h6>
      </div> */}
      <div className="flex relative group gap-2 flex-col lg:flex-row h-full">
        <aside
          className={`${
            location.pathname === "/" ? "w-full h-full" : "w-full lg:w-fit"
          }`}
        >
          <img
            src={albumArt || dummyAlbumArt}
            alt="album art"
            className="w-full"
          />
        </aside>
        <aside
          className={`${
            location.pathname === "/"
              ? "absolute w-full h-full bg-black text-white rounded-lg backdrop-blur bg-opacity-60 justify-center flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity"
              : ""
          }`}
        >
          <h5
            className={`text-heading-5-bold mb-2 ${
              location.pathname === "/" && "text-center"
            }`}
          >
            {Song || songName}
          </h5>

          <div>
            <p>Album: {Album}</p>
            <p>Artist: {ArtistName}</p>
            <p>ISRC: {ISRC}</p>
            <p>UPC: {UPC}</p>
          </div>

          <div className="flex items-center gap-1 mt-2">
            <RiEditBoxLine
              className="cursor-pointer text-heading-6"
              onClick={() =>
                Song ? setEditId(_id) : navigate(`/edit-song/${_id}`)
              }
              title="Edit"
              data-tooltip-id={"edit" + _id}
              data-tooltip-content={`Edit`}
              data-tooltip-place="top"
            />
            <Tooltip id={"edit" + _id} />

            <CiStreamOff
              className="cursor-pointer text-interactive-light-destructive-focus text-heading-5"
              title="Takedown"
              data-tooltip-id={"takedown" + _id}
              data-tooltip-content={`Takedown`}
              data-tooltip-place="top"
              onClick={() => setTakedownId(_id)}
            />
            <Tooltip id={"takedown" + _id} />
          </div>
        </aside>
      </div>

      {status === "pending" && (
        <Button
          containerClassName={"mx-auto"}
          disabled={price === "0"}
          onClick={() => {
            price > 0 && navigate(`/payment?price=${price}?id=${_id}`);
            setPlanStore({ planName, price });
          }}
        >
          Pay Now
        </Button>
      )}

      {status === "paid" && (
        <Button
          containerClassName={"mx-auto"}
          disabled={price === "0"}
          onClick={() => {
            Swal.fire("Success");
          }}
        >
          Refund
        </Button>
      )}
    </>
  );
};

export default SongListItem;
