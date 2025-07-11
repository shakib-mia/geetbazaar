import React, { useContext, useRef, useState } from "react";
import InputField from "../../components/InputField/InputField";
import axios from "axios";
import Button from "../../components/Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { backendUrl, config } from "../../constants";
import Invoice from "../../components/Invoice/Invoice";
import SelectOptions from "../../components/SelectOptions/SelectOptions";
import generatePDF, { usePDF } from "react-to-pdf";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RevenueForm() {
  const navigate = useNavigate();
  const [gst, setGst] = useState(false);
  const [ruIndian, setRuIndian] = useState(false);
  const [aadharCard, setAadharCard] = useState("");
  const [aadharUrl, setAadharUrl] = useState("");
  const [panUrl, setPanUrl] = useState("");
  const [gstUrl, setGstUrl] = useState("");
  const [cancelledUrl, setCancelledUrl] = useState("");
  const [panCard, setPanCard] = useState("");
  const [gstCertificate, setGstCertificate] = useState("");
  const [cancelledCheque, setCancelledCheque] = useState("");
  const [signature, setSignature] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const { token, userData, refetch, setRefetch } = useContext(ProfileContext);
  const [confirmed, setConfirmed] = useState(false);
  const [state, setState] = useState("");
  const invoiceRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [formBody, setFormBody] = useState({});
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [paypal, isPaypal] = useState(false);

  // console.log(data);

  const aadharCardhandle = (e) => {
    e.preventDefault();
    e.target.files[0] && setAadharCard(URL.createObjectURL(e.target.files[0]));
  };
  const panCardhandle = (e) => {
    e.preventDefault();
    e.target.files[0] && setPanCard(URL.createObjectURL(e.target.files[0]));
  };
  const gsthandle = (e) => {
    e.preventDefault();
    e.target.files[0] &&
      setGstCertificate(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0]);
  };
  const cancelledChequehandle = (e) => {
    e.preventDefault();
    e.target.files[0] &&
      setCancelledCheque(URL.createObjectURL(e.target.files[0]));
  };

  // console.log(accountNumber.length);

  const signatureHandle = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    // console.log(reader);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      // img.onload = () => {
      //   // Set image dimensions
      //   console.log({ width: img.width, height: img.height });
      //   if (img.width <= 276 && img.height <= 118) {
      //     //   alert("perfect");
      //   } else {
      //     toast.error("Image should be less than or equal 276 X 118 pixels", {
      //       position: "bottom-center",
      //     });
      //   }
      // };
      //   img.src = e.target.result;
    };
    // e.target.files[0] && reader.readAsDataURL(e.target.files[0]);
    e.target.files[0] && setSignature(URL.createObjectURL(e.target.files[0]));
  };

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
        return data.url; // This value is now being returned by the promise that `imageUploading` returns
      }
    } catch (err) {
      // err.message;
      return null; // In case of error, return null or handle it as per your error handling logic
    }
  };

  const FormHandle = async (e) => {
    e.preventDefault();
    const form = e.target;

    const vendorName = form.vendorName.value;
    const invoiceNumber = form.invoiceNumber.value;
    const invoiceDate = form.invoiceDate.value;
    const address = form.address.value;
    const streetName = form.streetName.value;
    const landMark = form.landMark.value;
    const pinCode = form.pinCode.value;
    const city = form.city.value;
    const state = form.state.value;
    const gstinNumber = form.gctinNumber?.value;
    // const placeOfSupply = form.placeOfSupply.value;
    const cinNumber = form.cinNumber.value;
    const serviceAccount = form.serviceAccount?.value;
    const panNumber = form.panNumber.value;
    const taxableValue = form.taxableValue.value;
    const cgstAmount = form.cgstAmount?.value;
    const sgstAmount = form.sgstAmount?.value;
    const igstAmount = form.igstAmount?.value;
    const totalAmount = form.totalAmount.value;
    // const totalAmountWord = form.totalAmountWord.value;
    const bankName = form.bankName?.value;
    const branch = form.branch?.value;
    const accountType = form.accountType?.value;
    const ifscCode = form.ifscCode?.value;
    const beneficiaryName = form.beneficiaryName?.value;
    const accountNumber = form.accountNumber?.value;
    const confirmAccountNumber = form.confirmAccountNumber?.value;
    const AadharCard = form.aadharCard?.files[0];
    const PanCardFile = form.panCard?.files[0];
    const GstFile = gst && form.gst?.files[0];
    const cancelledChequeFile = form.cancelledCheque?.files[0];
    const signatureFile = form.signature?.files[0];
    // console.log(taxableValue);

    const aadharCardUrl = await imageUploading(
      "upload-aadhar-cards",
      AadharCard,
      setAadharUrl
    );

    const panCardUrl = await imageUploading(
      "upload-pan-cards",
      PanCardFile,
      setPanUrl
    );
    const gstCertUrl =
      gst &&
      (await imageUploading("upload-gst-certificate", GstFile, setGstUrl));
    const cancelledChequeUrl = await imageUploading(
      "upload-cancelled-cheques",
      cancelledChequeFile,
      setCancelledUrl
    );

    const signatureUrl = await imageUploading(
      "upload-signature",
      signatureFile,
      setSignatureUrl
    );

    // console.log(aadharUrl);
    const body = {
      vendorName,
      invoiceNumber,
      invoiceDate,
      address,
      streetName,
      landMark,
      pinCode,
      city,
      state,
      gstinNumber,
      placeOfSupply,
      cinNumber,
      serviceAccount,
      panNumber,
      taxableValue,
      cgstAmount,
      sgstAmount,
      igstAmount,
      totalAmount,
      // totalAmountWord,
      bankName,
      branch,
      accountType,
      ifscCode,
      beneficiaryName,
      accountNumber,
      userName: userData.partner_name,
      emailId: userData.emailId,
      confirmAccountNumber,
      aadharUrl: aadharCardUrl,
      panUrl: panCardUrl,
      gstUrl: gst ? gstCertUrl : "",
      cancelledChequeUrl,
      signatureUrl,
      paypalEmailAddress: e.target.paypalEmail?.value,
    };

    setFormBody(body);

    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };

    // body;
    setConfirmed(true);
  };

  const handlePdf = async () => {
    const pdf = await generatePDF(targetRef, {
      filename: `Invoice_of_${userData.first_name}_${userData.last_name}.pdf`,
    });

    const formData = new FormData();
    formData.append("file", pdf.output("blob"));

    const config = {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    };

    const { data } = await axios.post(
      "https://localhost:5000/store-invoice",
      formData,
      config
    );
    // console.log(data);
    const newBody = { ...formBody, pdfUrl: data.pdfUrl };
    // console.log(newBody);

    axios
      .post(`${backendUrl}withdrawal-request`, newBody, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        // console.log(data);
        if (data.acknowledged) {
          // e.target.reset();
          setAadharCard("");
          setPanCard("");
          setGst("");
          setCancelledCheque("");

          setConfirmed(false);
          setRefetch(!refetch);
          toast.success("Withdrawal Request Placed Successfully", {
            position: "bottom-center",
          });
          navigate("/");
        }
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <>
      <section
        className={`w-full lg:w-5/6 mx-auto my-4 text-grey-dark ${
          confirmed && "overflow-y-hidden"
        }`}
      >
        <form
          onSubmit={FormHandle}
          className="px-3 md:px-[4rem] w-full md:mx-auto rounded-md shadow-xl text-white"
        >
          <div className="pt-[4rem]">
            <div className=" mb-3">
              <h1 className="text-heading-4-bold pb-1">Revenue Withdraw</h1>
              <h1>Please fill the form out to initiate the request</h1>
            </div>
            <div className="flex flex-col gap-1">
              <section>
                <h1>Are you registered under the CGST 2017 ?</h1>
                <label className="mr-2">
                  <input
                    className="mr-2"
                    // checked
                    type="radio"
                    onClick={() => {
                      setGst(true);
                      setRuIndian(true);
                    }}
                    required
                    name="cgst"
                  />
                  Yes
                </label>
                <label className="mr-2">
                  <input
                    className="mr-2"
                    type="radio"
                    onClick={() => setGst(false)}
                    required
                    name="cgst"
                  />
                  No
                </label>
              </section>
              <section>
                <h1>Are you a resident of India?</h1>
                <label className="mr-2">
                  <input
                    className="mr-2"
                    type="radio"
                    onClick={() => setRuIndian(true)}
                    required={!gst}
                    // checked={gst || ruIndian}
                    name="indian"
                  />
                  Yes
                </label>
                <label>
                  <input
                    className="mr-2"
                    type="radio"
                    onClick={() => setRuIndian(false)}
                    required={!gst}
                    disabled={gst}
                    name="indian"
                  />
                  No
                </label>
              </section>

              {!ruIndian && (
                <section>
                  <h1>I want to receive my payment through:</h1>
                  <label className="mr-2">
                    <input
                      className="mr-2"
                      type="radio"
                      onClick={() => isPaypal(true)}
                      required={!gst}
                      // checked={gst || ruIndian}
                      name="paypal"
                    />
                    PayPal
                  </label>
                  <label>
                    <input
                      className="mr-2"
                      type="radio"
                      onClick={() => isPaypal(false)}
                      required={!gst}
                      // disabled={gst}
                      name="paypal"
                    />
                    Bank Transaction
                  </label>
                </section>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <h4 className="text-heading-4-bold">Vendor Details</h4>
            <div className="flex flex-col md:flex-row gap-3">
              <InputField
                name={"vendorName"}
                label={"Vendor Name"}
                id={"vandorName"}
                type={"text"}
                required={true}
                parentClassName={"w-full md:w-2/4"}
              />
              <InputField
                name={"invoiceNumber"}
                label={"Invoice Number"}
                id={"invoiceNumber"}
                type={"text"}
                required={true}
                parentClassName={"w-full md:w-1/4"}
              />
              <InputField
                name={"invoiceDate"}
                label={"Invoice Date"}
                id={"invoiceDate"}
                type={"date"}
                // required={true}
                value={
                  new Date().getFullYear() +
                  "-" +
                  String(new Date().getMonth() + 1).padStart(2, "0") +
                  "-" +
                  String(new Date().getDate()).padStart(2, "0")
                }
                disabled={true}
                parentClassName={"w-full md:w-1/4"}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <InputField
                name={"address"}
                label={"Address"}
                id={"address"}
                required={true}
                type={"address"}
                parentClassName={"w-full md:w-2/4"}
              />
              <InputField
                name={"streetName"}
                label={"Street Name"}
                id={"streetName"}
                type={"address"}
                required={true}
                parentClassName={"w-full md:w-1/4"}
              />
              <InputField
                name={"landMark"}
                label={"Land Mark"}
                id={"landMark"}
                type={"text"}
                // required={gst}
                parentClassName={"w-full md:w-1/4"}
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <InputField
                name={"pinCode"}
                label={"Pin Code"}
                id={"pinCode"}
                type={"number"}
                required={true}
                parentClassName={"w-full md:w-1/4"}
              />
              <InputField
                name={"city"}
                label={"City"}
                id={"city"}
                required={true}
                type={"address"}
                parentClassName={"w-full md:w-2/4"}
              />
              {ruIndian ? (
                <SelectOptions
                  label={"State"}
                  name="state"
                  onChange={(e) => setState(e.target.value)}
                  options={[
                    "Andaman and Nicobar Islands",
                    "Andhra Pradesh",
                    "Arunachal Pradesh",
                    "Assam",
                    "Bihar",
                    "Chandigarh",
                    "Chhattisgarh",
                    "Dadra and Nagar Haveli",
                    "Daman and Diu",
                    "Delhi",
                    "Goa",
                    "Gujarat",
                    "Haryana",
                    "Himachal Pradesh",
                    "Jammu & Kashmir",
                    "Jharkhand",
                    "Karnataka",
                    "Kerala",
                    "Ladakh",
                    "Lakshadweep",
                    "Madhya Pradesh",
                    "Maharashtra",
                    "Manipur",
                    "Meghalaya",
                    "Mizoram",
                    "Nagaland",
                    "Odisha",
                    "Puducherry",
                    "Punjab",
                    "Rajasthan",
                    "Sikkim",
                    "Tamil Nadu",
                    "Telangana",
                    "Tripura",
                    "Uttarakhand",
                    "Uttar Pradesh",
                    "West Bengal",
                  ]}
                  id={"state"}
                  required={true}
                  parentClassName={"w-full md:w-1/4"}
                />
              ) : (
                <InputField
                  type={"text"}
                  id={"state"}
                  name={"state"}
                  label={"State" + (ruIndian ? "*" : "")}
                  required={true}
                  parentClassName={"w-full md:w-1/4"}
                />
              )}
            </div>
            {gst && (
              <div className="flex gap-3 flex-col md:flex-row mt-6">
                <InputField
                  name={"gctinNumber"}
                  label={"GSTIN Number"}
                  id={"gctinNumber"}
                  type={"text"}
                  parentClassName={"w-full md:w-2/4"}
                  required={true}
                />
                <InputField
                  name={"placeOfSupply"}
                  label={"Place of Supply"}
                  id={"placeOfSuppl"}
                  type={"text"}
                  disabled={true}
                  value={state}
                  onChange={(e) => setPlaceOfSupply(e.target.value)}
                  parentClassName={gst ? "w-full md:w-2/4" : "w-full"}
                  required={true}
                />
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-3">
              <InputField
                name={"cinNumber"}
                label={"CIN Number"}
                id={"cinNumber"}
                type={"text"}
                // required={gst}
                parentClassName={`${
                  gst ? "w-full md:w-2/4" : paypal ? "w-1/2" : "w-full"
                }`}
              />
              {!gst && !ruIndian && paypal && (
                <InputField
                  type={"text"}
                  label={"PayPal Email Address"}
                  placeholder={"Enter PayPal Email Here"}
                  parentClassName={"w-1/2"}
                  required={paypal}
                  // onChange={e => setFormBody({...formd})}
                  name={"paypalEmail"}
                />
              )}
              {gst && (
                <InputField
                  name={"serviceAccount"}
                  label={"Service Accounting Number (SAC)"}
                  id={"serviceAccount"}
                  type={"number"}
                  parentClassName={"w-full md:w-2/4"}
                  required={true}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
              <InputField
                name={"panNumber"}
                label={"PAN Number"}
                id={"panNumber"}
                type={"text"}
                required={true}
                parentClassName={"w-full"}
                note={"If you don't have a PAN card, type N/A"}
              />

              <InputField
                name={"totalAmount"}
                label={gst ? "Taxable Value" : "Total Value"}
                id={"taxableValue"}
                type={"number"}
                required={false}
                value={(
                  userData.lifetimeRevenue -
                    (userData.lifetimeDisbursed || 0) || 0
                ).toFixed(2)}
                disabled={true}
                parentClassName={"w-full"}
              />
            </div>

            {!paypal && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField
                    name={"bankName"}
                    label={"Name of the Bank"}
                    id={"bankName"}
                    required={true}
                    type={"text"}
                    // parentClassName={"w-full md:w-1/2"}
                  />
                  <InputField
                    name={"branch"}
                    label={"Branch"}
                    id={"branch"}
                    type={"text"}
                    required={true}
                    // parentClassName={"w-1/2"}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <SelectOptions
                    name={"accountType"}
                    label={"Account Type"}
                    required={true}
                    id={"accountType"}
                    type={"text"}
                    options={["Savings", "Current"]}
                    onChange={(e) => setAccountType(e.target.value)}
                    // parentClassName={"w-1/3"}
                  />
                  <InputField
                    name={"ifscCode"}
                    label={"IFSC"}
                    id={"ifscCode"}
                    type={"text"}
                    required={true}
                    // parentClassName={"w-1/3"}
                  />
                  <InputField
                    name={"beneficiaryName"}
                    label={"Beneficiary Name"}
                    id={"beneficiaryName"}
                    type={"text"}
                    required={true}
                    // parentClassName={"w-1/3"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField
                    name={"accountNumber"}
                    label={"Account Number"}
                    id={"accountNumber"}
                    type={"number"}
                    required={true}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    // parentClassName={"w-full"}
                  />
                  <aside>
                    <InputField
                      name={"confirmAccountNumber"}
                      label={"Confirm Account Number"}
                      id={"confirmAccountNumber"}
                      type={"number"}
                      onChange={(e) => setConfirmAccountNumber(e.target.value)}
                      required={true}
                      // parentClassName={"w-full"}
                    />
                    {accountNumber !== confirmAccountNumber && (
                      <p className="text-button text-interactive-dark-destructive-active mt-1 pl-1">
                        Account Number Didn't match
                      </p>
                    )}
                  </aside>
                </div>
              </>
            )}
            <div className="flex flex-wrap justify-center w-full mx-auto">
              <div className="w-1/2 md:w-1/4 p-1 flex flex-col justify-between">
                <label
                  className="text-grey mb-1 flex justify-between"
                  htmlFor="aadharCard"
                >
                  Aadhaar Card (Both Side) / Govt. ID
                  <span className="text-interactive-light-destructive-focus text-button !font-light">
                    Required
                  </span>
                </label>
                <div className="w-full aspect-square border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center overflow-hidden">
                  <label htmlFor="aadharCard">
                    {aadharCard.length ? (
                      <img
                        className="w-full mx-auto rounded-xl object-cover"
                        src={aadharCard}
                        alt=""
                      />
                    ) : (
                      <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                        +
                      </p>
                    )}
                    <input
                      className="hidden"
                      name="aadharCard"
                      id="aadharCard"
                      required
                      type="file"
                      onChange={aadharCardhandle}
                    />{" "}
                  </label>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 flex flex-col justify-between p-1">
                <label
                  className="text-grey mb-1 text-paragraph-1 flex justify-between"
                  htmlFor="panCard"
                >
                  PAN Card
                  {ruIndian ? (
                    <span className="text-interactive-light-destructive-focus text-button !font-light">
                      Required
                    </span>
                  ) : (
                    <span className="text-button !font-light">Optional</span>
                  )}
                </label>
                <div className="w-full aspect-square border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center overflow-hidden">
                  <label htmlFor="panCard">
                    {panCard.length ? (
                      <img
                        className="w-full mx-auto rounded-xl object-cover"
                        src={panCard}
                        alt=""
                      />
                    ) : (
                      <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                        +
                      </p>
                    )}
                    <input
                      className="hidden"
                      name="panCard"
                      id="panCard"
                      type="file"
                      required={ruIndian}
                      onChange={panCardhandle}
                    />{" "}
                  </label>
                </div>
              </div>
              {paypal || (
                <div className="w-1/2 md:w-1/4 flex flex-col justify-between p-1">
                  <label
                    className="text-grey mb-1 flex justify-between"
                    htmlFor="cancelledCheque"
                  >
                    <p>Cancelled Cheque</p>
                    <span className="text-interactive-light-destructive-focus text-button !font-light">
                      Required
                    </span>
                  </label>
                  <div className="w-full aspect-square border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center overflow-hidden">
                    <label htmlFor="cancelledCheque">
                      {cancelledCheque.length ? (
                        <img
                          className="w-full object-cover mx-auto rounded-xl"
                          src={cancelledCheque}
                          alt=""
                        />
                      ) : (
                        <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                          +
                        </p>
                      )}
                      <input
                        className="hidden"
                        name="cancelledCheque"
                        id="cancelledCheque"
                        type="file"
                        required
                        onChange={cancelledChequehandle}
                      />{" "}
                    </label>
                  </div>
                </div>
              )}
              {gst && (
                <div className="w-1/2 md:w-1/4 aspect-square flex flex-col justify-between p-1">
                  <label
                    className="text-grey mb-1 flex justify-between"
                    htmlFor="GovtID"
                  >
                    <p>GST certificate</p>
                    <span className="text-interactive-light-destructive-focus text-button !font-light">
                      Required
                    </span>
                  </label>
                  <div className="w-full aspect-square border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center overflow-hidden">
                    <label htmlFor="gst">
                      {gstCertificate.length ? (
                        <img
                          className="w-full object-cover mx-auto rounded-xl"
                          src={gstCertificate}
                          alt=""
                        />
                      ) : (
                        <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                          +
                        </p>
                      )}
                      <input
                        className="hidden"
                        name="gst"
                        id="gst"
                        type="file"
                        required={true}
                        onChange={gsthandle}
                      />{" "}
                    </label>
                  </div>
                </div>
              )}

              <div className="w-1/2 md:w-1/4 p-1 flex flex-col justify-between aspect-square">
                <div className="w-full mx-auto">
                  <label
                    className="text-grey text-subtitle-1 flex justify-between"
                    htmlFor="signature"
                  >
                    <p>Signature</p>
                    <span className="text-interactive-light-destructive-focus text-button !font-light">
                      Required
                    </span>
                  </label>
                </div>
                <div className="w-full aspect-square border-dashed border-4 border-grey rounded-[5px] cursor-pointer flex items-center justify-center overflow-hidden">
                  <label htmlFor="signature">
                    {signature.length ? (
                      <img
                        className="w-full object-cover mx-auto rounded-xl"
                        src={signature}
                        alt=""
                      />
                    ) : (
                      <p className="inline-block text-center text-heading-5-bold cursor-pointer">
                        +
                      </p>
                    )}
                    <input
                      className="hidden"
                      name="signature"
                      id="signature"
                      type="file"
                      required={true}
                      onChange={signatureHandle}
                    />{" "}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="py-4 text-center">
            <Button type={"submit"} disabled={false}>
              Save and Next
            </Button>
          </div>
        </form>
      </section>

      {confirmed && (
        <div className="fixed top-0 left-0 backdrop-blur w-screen h-screen z-[9999] flex justify-center overflow-x-auto overflow-y-auto">
          <div className="bg-white w-[800px] h-[1119px] my-7 shadow-2xl rounded-lg relative">
            <button
              className="absolute -right-5 -top-5 text-heading-4"
              onClick={() => setConfirmed(false)}
            >
              &times;
            </button>
            <Invoice
              paypal={paypal}
              gst={gst}
              formBody={formBody}
              ruIndian={ruIndian}
              ref={targetRef}
            />

            <div className="flex justify-center">
              <Button
                type={"success"}
                text={"confirm"}
                parentClassName={"w-fit mt-3"}
                onClick={handlePdf}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RevenueForm;
