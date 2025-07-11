import React, { useContext, useRef, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { FaTimes } from "react-icons/fa";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";
import { useLocation } from "react-router-dom";
import Letterhead from "../LetterHead/LetterHead";
import Modal from "../Modal/Modal";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";

const CreateRecordLabel = ({ setShowRecordLabelForm }) => {
  const [selectedCode, setSelectedCode] = useState("91");
  // const [isPerpetual, setIsPerpetual] = useState(false);
  const { token, userData, setRefetch } = useContext(ProfileContext);
  const [recordLabelData, setRecordLabelData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const letterHeadRef = useRef(null);
  const location = useLocation();
  const [recordLabelName, setRecordLabelName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [signatoryName, setSignatoryName] = useState("");

  const generatePDF = async () => {
    const element = letterHeadRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    return pdf.output("blob");
  };

  const handleRecordLabelSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const data = {
      "Sub-Label Name": recordLabelName,
      phoneNo: phoneNo,
      status: "Requested",
      "Email ID": userData.user_email,
      address: address,
      "Start Date": startDate,
      signatoryName: signatoryName,
    };

    setRecordLabelData(data);

    try {
      // Add 1-second delay before generating the PDF
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pdfBlob = await generatePDF();
      const fileName = `LetterHead of ${data["Sub-Label Name"]}.pdf`;

      // Offer download to user
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = fileName;
      link.click();

      // Upload PDF
      const formData = new FormData();
      formData.append("file", pdfBlob, fileName);

      const res = await axios.post(backendUrl + "upload-letterhead", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });

      // Submit record label data
      const config = { headers: { token } };
      const response = await axios.post(
        backendUrl + "record-labels",
        { ...data, pdf: res.data.url },
        config
      );

      if (response.data.acknowledged) {
        e.target.reset();
        setSubmitted(false);

        Swal.fire({
          title: "Record Label Submitted Successfully",
          text: "The PDF has been downloaded and uploaded to the server.",
          icon: "success",
          customClass: {
            confirmButton: "custom-class-settings",
          },
        });

        setRefetch((ref) => !ref);
        setShowRecordLabelForm(false);
        // window.location.reload();
      }
    } catch (error) {
      toast.error(
        error.response?.data || "An error occurred. Please try again.",
        {
          position: "bottom-center",
        }
      );
    } finally {
      setSubmitted(false);
    }
  };

  // console.log(recordLabelData);

  return (
    <>
      <h4 className="text-heading-4-bold text-white text-center mb-2">
        Create A New Record Label
      </h4>
      <form onSubmit={handleRecordLabelSubmit}>
        {/* Your existing form fields */}
        <InputField
          type="text"
          placeholder="Enter Your Record Label Name Here"
          label="Record Label"
          name="recordLabelName"
          id="record-label-name"
          required
          value={recordLabelName}
          onChange={(e) => setRecordLabelName(e.target.value)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
          <InputField
            type="tel"
            placeholder="Enter your phone no. here"
            label="Phone No."
            setSelectedCode={setSelectedCode}
            name="phoneNo"
            selectedCode={selectedCode}
            id="phone-no"
            required
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />

          <InputField
            type="email"
            disabled
            placeholder="Enter your email address here"
            name="email"
            id="email"
            label="Email id"
            value={userData.user_email}
            required
          />
        </div>

        <InputField
          type="text"
          placeholder="Enter your address here"
          id="address"
          label="Address"
          name="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
          <InputField
            type="date"
            required
            name="startDate"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <InputField
            type="text"
            placeholder="Enter your signature here"
            label="Signatory Person Name"
            name="signatoryName"
            id="signature"
            required
            value={signatoryName}
            onChange={(e) => setSignatoryName(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <Button
            type={"submit"}
            text={submitted ? "Submitting..." : "Submit"}
            containerClassName={"mt-2 lg:mt-6 mx-auto"}
            disabled={submitted}
          />
        </div>

        <div className={`relative -z-[9999999999999999] opacity-0`}>
          <Modal>
            <div ref={letterHeadRef}>
              <Letterhead formData={recordLabelData} />
            </div>
          </Modal>
        </div>
      </form>
    </>
  );
};

export default CreateRecordLabel;
