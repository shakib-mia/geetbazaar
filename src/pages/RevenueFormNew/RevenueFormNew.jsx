import React, { useContext, useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import SelectOptions from "../../components/SelectOptions/SelectOptions";
import axios from "axios";
import FileDropzone from "../../components/FileDropZone/FileDropZone";
import { backendUrl } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import Button from "../../components/Button/Button";

const RevenueFormNew = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const { token } = useContext(ProfileContext);
  const [panUrl, setPanUrl] = useState("");
  const [aadharUrl, setAadharUrl] = useState("");
  const [gstUrl, setGstUrl] = useState("");
  const [cancelledUrl, setCancelledUrl] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form data state to track all inputs
  const [formData, setFormData] = useState({
    vendorName: "",
    invoiceNumber: "",
    address: "",
    streetName: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    panNumber: "",
    cinNumber: "",
    totalValue: "",
    bankName: "",
    branch: "",
    accountType: "",
    ifscCode: "",
    beneficiaryName: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
    }));
  }, [selectedCountry]);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/states")
      .then(({ data }) => setCountries(data.data))
      .catch((err) => console.log(err));
  }, []);

  const imageUploading = async (urlbody, imageFile, setfile) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const response = await axios.post(`${backendUrl + urlbody}`, formData, {
        headers: {
          token: sessionStorage.getItem("token") || token,
        },
      });
      const { data } = response;
      if (data.url) {
        setfile(data.url);
        return data.url;
      }
    } catch (err) {
      setError("Error uploading file: " + err.message);
      return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (accountNumber !== confirmAccountNumber) {
      setError("Account numbers don't match");
      return;
    }

    // Check if required uploads are present
    if (!panUrl || !aadharUrl || !cancelledUrl || !signatureUrl) {
      setError("Please upload all required documents");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Prepare the payload
      const payload = {
        ...formData,
        accountNumber,
        documents: {
          panCard: panUrl,
          aadharCard: aadharUrl,
          cancelledCheque: cancelledUrl,
          signature: signatureUrl,
          gst: gstUrl || null,
        },
      };

      console.log(payload);
      // Send data to backend
      // const response = await axios.post(
      //   `${backendUrl}/api/revenue/withdraw`,
      //   payload,
      //   {
      //     headers: {
      //       token: sessionStorage.getItem("token") || token,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // if (response.data.success) {
      //   setSuccess(true);
      //   // Reset form or redirect as needed
      // } else {
      //   setError(response.data.message || "Failed to submit form");
      // }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while submitting the form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-6 text-white">
      {success && (
        <div className="p-4 mb-4 bg-green-700 text-white rounded max-w-4xl mx-auto">
          Form submitted successfully!
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 bg-red-700 text-white rounded max-w-4xl mx-auto">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-5 bg-gray-800 max-w-4xl mx-auto w-full"
      >
        <h3 className="text-heading-3-bold text-gray-200">Revenue Withdraw</h3>
        <p className="text-[20px] mt-2 mb-4">
          Please fill the form out to initiate the request
        </p>

        <section>
          <h5 className="text-heading-5-bold mb-1">Vendor Details</h5>

          <div className="grid grid-cols-2 gap-2">
            <InputField
              type="text"
              label="Vendor Name"
              name="vendorName"
              onChange={handleInputChange}
              value={formData.vendorName}
              required
            />
            <InputField
              type="text"
              label="Invoice Number"
              name="invoiceNumber"
              onChange={handleInputChange}
              value={formData.invoiceNumber}
              required
            />
          </div>

          <div className="mt-0">
            <InputField
              type="text"
              label="Address"
              name="address"
              onChange={handleInputChange}
              value={formData.address}
              required
            />
          </div>

          <div className="grid grid-cols-2 mt-0 gap-2">
            <InputField
              type="text"
              label="Street Name"
              name="streetName"
              onChange={handleInputChange}
              value={formData.streetName}
              required
            />
            <InputField
              type="text"
              label="Landmark"
              name="landmark"
              onChange={handleInputChange}
              value={formData.landmark}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-0">
            <div className="grid grid-cols-2 gap-2">
              <InputField
                type="text"
                label="Pin Code"
                name="pinCode"
                onChange={handleInputChange}
                value={formData.pinCode}
                required
              />
              <InputField
                type="text"
                label="City"
                name="city"
                onChange={handleInputChange}
                value={formData.city}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SelectOptions
                label={"State"}
                name="state"
                id={"state"}
                required={true}
                placeholder={
                  selectedCountry.length
                    ? "Select your state"
                    : "Select Your Country First"
                }
                options={
                  selectedCountry.length
                    ? countries
                        .find((item) => item.name === selectedCountry)
                        ?.states.map((item) => item.name)
                    : []
                }
                onChange={handleInputChange}
                value={formData.state}
              />
              <SelectOptions
                label="Select a Country"
                options={countries.map((item) => item.name)}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    country: e.target.value,
                    state: "", // Reset state when country changes
                  }));
                }}
                value={selectedCountry}
                placeholder="Choose a country"
                required={true}
                name="country"
                hideRequired={true}
              />
            </div>
          </div>
        </section>

        <section className="mt-2">
          <h5 className="text-heading-5-bold mb-1">Invoice Details</h5>

          <div className="grid grid-cols-2 gap-x-2">
            <InputField
              name="invoiceDate"
              label="Invoice Date"
              id="invoiceDate"
              type="date"
              value={formData.invoiceDate}
              disabled={true}
              parentClassName=""
            />

            <InputField
              name="panNumber"
              label="PAN Number"
              id="panNumber"
              type="text"
              required={true}
              parentClassName="w-full"
              note="If you don't have a PAN card, type N/A"
              onChange={handleInputChange}
              value={formData.panNumber}
            />

            <InputField
              name="cinNumber"
              label="CIN Number"
              id="cinNumber"
              type="text"
              required={true}
              parentClassName="w-full"
              onChange={handleInputChange}
              value={formData.cinNumber}
            />

            <InputField
              name="totalValue"
              label="Total Value"
              id="totalValue"
              type="text"
              required={true}
              parentClassName="w-full"
              onChange={handleInputChange}
              value={formData.totalValue}
            />
          </div>
        </section>

        <section className="mt-2">
          <h5 className="text-heading-5-bold mb-1">Bank Details</h5>

          <div className="grid grid-cols-2 gap-x-2">
            <InputField
              name="bankName"
              label="Name of the Bank"
              id="bankName"
              required={true}
              type="text"
              onChange={handleInputChange}
              value={formData.bankName}
            />
            <InputField
              name="branch"
              label="Branch"
              id="branch"
              type="text"
              required={true}
              onChange={handleInputChange}
              value={formData.branch}
            />
          </div>

          <div className="grid grid-cols-3 gap-x-2">
            <SelectOptions
              name="accountType"
              placeholder="Account Type"
              required={true}
              id="accountType"
              type="text"
              options={["Savings", "Current"]}
              onChange={handleInputChange}
              value={formData.accountType}
            />
            <InputField
              name="ifscCode"
              label="IFSC"
              id="ifscCode"
              type="text"
              required={true}
              onChange={handleInputChange}
              value={formData.ifscCode}
            />
            <InputField
              name="beneficiaryName"
              label="Beneficiary Name"
              id="beneficiaryName"
              type="text"
              required={true}
              onChange={handleInputChange}
              value={formData.beneficiaryName}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              name="accountNumber"
              label="Account Number"
              id="accountNumber"
              type="number"
              required={true}
              onChange={(e) => setAccountNumber(e.target.value)}
              value={accountNumber}
            />
            <aside>
              <InputField
                name="confirmAccountNumber"
                label="Confirm Account Number"
                id="confirmAccountNumber"
                type="number"
                onChange={(e) => setConfirmAccountNumber(e.target.value)}
                value={confirmAccountNumber}
                required={true}
              />
              {accountNumber !== confirmAccountNumber &&
                accountNumber &&
                confirmAccountNumber && (
                  <p className="text-button text-interactive-dark-destructive-active mt-1 pl-1">
                    Account Number Didn't match
                  </p>
                )}
            </aside>
          </div>
        </section>

        <section className="mt-2">
          <h5 className="text-heading-5-bold mb-3">Document Upload</h5>

          <div className="grid grid-cols-4 gap-1">
            <FileDropzone
              label="Aadhaar Card"
              onFileSelect={(e) =>
                imageUploading("upload-aadhar-cards", e, setAadharUrl)
              }
              allowedTypes={["application/pdf", "image/png", "image/jpeg"]}
            />
            <FileDropzone
              label="PAN Card"
              onFileSelect={(e) =>
                imageUploading("upload-pan-cards", e, setPanUrl)
              }
              allowedTypes={["application/pdf", "image/png", "image/jpeg"]}
            />
            <FileDropzone
              label="Cancelled Cheque"
              onFileSelect={(e) =>
                imageUploading("upload-pan-cards", e, setCancelledUrl)
              }
              allowedTypes={["application/pdf", "image/png", "image/jpeg"]}
            />
            <FileDropzone
              label="Signature"
              onFileSelect={(e) =>
                imageUploading("upload-pan-cards", e, setSignatureUrl)
              }
              allowedTypes={["application/pdf", "image/png", "image/jpeg"]}
            />
          </div>
        </section>

        <Button className="mt-5" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default RevenueFormNew;
