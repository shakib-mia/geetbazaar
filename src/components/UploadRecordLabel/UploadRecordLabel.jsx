import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UploadRecordLabel = () => {
  const [file, setFile] = useState({});
  const { userData } = useContext(ProfileContext);
  const [initiated, setInitiated] = useState(false);

  // console.log(userData);

  const handleRecordLabelUpload = async (e) => {
    e.preventDefault();
    setInitiated(true);

    const formData = new FormData();

    formData.append("file", file);

    const config = {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    };

    const recordLabelFile = await axios.post(
      backendUrl + "upload-record-labels",
      formData,
      config
    );

    const body = {
      recordLabelPdf: recordLabelFile.data.url,
      emailId: userData.user_email,
    };

    axios
      .post(backendUrl + "upload-record-labels/details", body)
      .then(({ data }) => {
        if (data.insertedId) {
          setInitiated(false);

          e.target.reset();
          setFile({});
          Swal.fire({
            icon: "success",
            text: "Record Label Uploaded Successfully",
          });
        }
      });

    // console.log(recordLabelFile);
  };

  return (
    <div className={`w-full text-white relative overflow-y-auto`}>
      {/* <h4 className="text-heading-5-bold 2xl:text-heading-4-bold">
        Upload Record Labels
      </h4> */}

      <form
        action=""
        className="flex flex-col 2xl:flex-row justify-between items-center"
        onSubmit={handleRecordLabelUpload}
      >
        <InputField
          type="file"
          containerClassName={"w-full 2xl:w-9/12"}
          fieldClassName="!rounded-r-none"
          accept="application/pdf"
          id="record-label"
          placeholder={file.name || "Upload Your PDF"}
          onChange={(e) => setFile(e.target.files[0])}
          required={true}
        />

        <div className="flex justify-center w-full 2xl:w-3/12">
          <Button
            containerClassName={"w-full"}
            className={
              "inline-block !w-full justify-center !mt-0 !rounded-l-none"
            }
            type={"submit"}
            disabled={initiated || !file.name}
          >
            Upload
          </Button>
        </div>
      </form>

      <div className="text-center">
        <a
          href="https://localhost:5000/uploads/letterheads/LetterHead%20of%20New%20Record%20Label.pdf"
          download={true}
          target="_blank"
          className="underline text-interactive-light"
        >
          See a Sample
        </a>
      </div>
    </div>
  );
};

export default UploadRecordLabel;
