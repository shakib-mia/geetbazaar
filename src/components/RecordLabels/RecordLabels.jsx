import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa6";
import { createPortal } from "react-dom";
import CreateRecordLabel from "../CreateRecordLabel/CreateRecordLabel";
import AuthBody from "../AuthBody/AuthBody";
import RecordLabelCreationMethod from "../RecordLabelCreationMethod/RecordLabelCreationMethod";
import UploadRecordLabel from "../UploadRecordLabel/UploadRecordLabel";

const RecordLabels = () => {
  const [labels, setLabels] = useState([]);
  const { token } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [method, setMethod] = useState("form");
  const [openItemModal, setOpenItemModal] = useState(-1);

  //   console.log(token);

  useEffect(() => {
    const config = {
      headers: {
        token,
      },
    };

    axios
      .get(backendUrl + "record-labels", config)
      .then(({ data }) => setLabels(data))
      .catch((err) => navigate("/login"));
  }, []);

  return (
    <div
      className={`w-full rounded-2xl card-shadow p-4 pt-0 text-white relative overflow-y-auto`}
    >
      {openModal &&
        createPortal(
          <AuthBody
            // onSubmit={edit}
            className="backdrop-blur fixed top-0 left-0 z-[99999999999]"
            id="edit-song"
            closeIcon={true}
            handleClose={() => setOpenModal(false)}
            whiteContainerClass="relative lg:!w-1/2 !mx-auto overflow-y-auto overflow-x-hidden"
          >
            <h5
              className={
                "text-heading-5-bold 2xl:text-heading-4-bold text-white mb-3 text-center"
              }
            >
              Create A New Record Label
            </h5>
            <RecordLabelCreationMethod method={method} setMethod={setMethod} />

            {method === "form" ? <CreateRecordLabel /> : <UploadRecordLabel />}
          </AuthBody>,
          document.getElementById("modal-root")
        )}

      {openItemModal > -1 &&
        createPortal(
          <AuthBody
            className="backdrop-blur fixed top-0 left-0 z-[99999999999]"
            id="edit-song"
            closeIcon={true}
            handleClose={() => setOpenItemModal(-1)}
            whiteContainerClass="relative lg:!w-1/3 !mx-auto overflow-y-auto overflow-x-hidden"
          >
            <h5 className="text-heading-5-bold text-white mb-3 text-center">
              {labels[openItemModal]}
            </h5>
            {/* Include a form or something if needed */}
          </AuthBody>,
          document.getElementById("modal-root")
        )}

      <h4 className="text-heading-4-bold sticky top-0 pt-4 pb-2 left-0 z-10">
        Record Labels
      </h4>
      <ul className="flex flex-col gap-1">
        {labels.map((item, key) => (
          <li
            key={key}
            className="shadow-[0_8px_16px_#111] hover:shadow-[0_8px_8px_#111] p-1 rounded cursor-pointer"
            onClick={() => setOpenItemModal(key)}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className={"absolute left-0 right-0 px-4 mx-auto bottom-4 w-full"}>
        <Button onClick={() => setOpenModal(true)}>
          <FaPlus />
          Create a New One
        </Button>
      </div>
    </div>
  );
};

export default RecordLabels;
