import React, { useContext, useState } from "react";
import AuthBody from "../AuthBody/AuthBody";
import EditSongForm from "../EditSongForm/EditSongForm";
import { backendUrl, config } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { toast } from "react-toastify";

const EditSong = ({ setEditId, songData }) => {
  const [updatedData, setUpdatedData] = useState(songData);
  //   const [editId, setEditId] = useState("");
  // console.log(updatedData);

  const { userData, token } = useContext(ProfileContext);
  // alert(token);

  const edit = (e) => {
    e.preventDefault();

    updatedData.emailId = userData.emailId;
    updatedData.updated = false;
    updatedData.requested = true;

    const config = {
      headers: {
        token,
      },
    };

    if (Object.keys(updatedData).includes("approved")) {
      delete updatedData.approved;
    }

    // console.log(updatedData);

    axios
      .post(backendUrl + "edit-song", updatedData, config)
      .then(({ data }) => {
        if (data.insertedId.length > 0) {
          setEditId("");
          toast.success("Edit Request Submitted for Review", {
            position: "bottom-center",
          });
        }
      });
  };

  const newFormData = { ...updatedData };

  delete newFormData.uniqueKey;
  delete newFormData.availablePlatforms;
  delete newFormData.jioTunes;
  delete newFormData.bsnl;
  delete newFormData.airtel;
  delete newFormData.vi;
  delete newFormData["youtube-topic-video"];
  delete newFormData["youtube-content-id"];
  delete newFormData.musixmatch;
  // delete newFormData.musixmatch;
  delete newFormData.LyricFind;
  delete newFormData.rejected;
  delete newFormData.updated;
  delete newFormData.status;
  delete newFormData.reason;
  delete newFormData.payment_id;
  delete newFormData.requested;
  delete newFormData.hold;
  delete newFormData["transaction-id"];
  delete newFormData.orderId;
  delete newFormData.order_id;
  delete newFormData.artists;
  // delete newFormData.ISRC;
  delete newFormData.paid;
  delete newFormData.transactionId;
  // delete newFormData.ISRC;
  // delete newFormData.selectedPlatforms;
  delete newFormData._id;
  delete newFormData.publisher;
  delete newFormData.recordLabel;
  delete newFormData.artWork;
  delete newFormData.albumType;
  delete newFormData.songUrl;
  // delete newFormData.ISRC;
  delete newFormData.contentType;
  delete newFormData.startMinutes;
  delete newFormData.startMinutes2;
  delete newFormData.startSeconds;
  delete newFormData.startSeconds2;
  delete newFormData.albumTitle;
  delete newFormData.description;
  delete newFormData.genre;
  delete newFormData.subGenre;
  delete newFormData.mood;
  delete newFormData.releaseDate;
  delete newFormData.liveDate;
  delete newFormData.time;
  delete newFormData.userEmail;
  delete newFormData.price;
  delete newFormData.planName;
  delete newFormData.signature;
  delete newFormData.accepted;
  delete newFormData.parentalAdvisory;
  delete newFormData.songs;
  delete newFormData.S;
  delete newFormData.splitAvailable;
  delete newFormData.splitDetails;
  delete newFormData.likes;
  delete newFormData.dislikes;
  delete newFormData.userId;
  delete newFormData.revenue;

  // console.log(updatedData);

  return (
    <AuthBody
      heading="Edit Song"
      onSubmit={edit}
      className="backdrop-blur fixed top-0 left-0 z-[99999999999]"
      id="edit-song"
      closeIcon={true}
      handleClose={() => setEditId("")}
      whiteContainerClass="h-3/4 relative lg:!w-1/2 !mx-auto overflow-y-auto overflow-x-hidden"
    >
      <EditSongForm updatedData={newFormData} setUpdatedData={setUpdatedData} />
    </AuthBody>
  );
};

export default EditSong;
