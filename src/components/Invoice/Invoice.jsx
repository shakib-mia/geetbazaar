import React, { forwardRef, useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

const Invoice = forwardRef(({ formBody, gst, ruIndian, paypal }, ref) => {
  const { userData } = useContext(ProfileContext);
  // console.log(formBody);
  // console.log(parseFloat(formBody.taxableValue) * 0.18);
  // console.log(formBody);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  // console.log();
  const accountBalance = parseFloat(
    userData.lifetimeRevenue - (userData.lifetimeDisbursed || 0)
  ).toFixed(2);
  const data = [
    {
      sr_no: 1,
      productName: `Royalty for the month of ${
        months[date.getMonth()]
      } ${new Date().getFullYear()}`,
      sac: formBody.serviceAccount,
      taxableValue: formBody.taxableValue || 0,
      cgst: {
        rate: 9,
        amount: (parseFloat(formBody.taxableValue) * 0.09).toFixed(2),
      },
      sgst: {
        rate: 9,
        amount: (parseFloat(formBody.taxableValue) * 0.09).toFixed(2),
      },
      igst: {
        rate: 18,
        amount: (parseFloat(formBody.taxableValue) * 0.18).toFixed(2),
      },
      total: gst
        ? formBody.state === "West Bengal"
          ? parseFloat(formBody.taxableValue) +
            Math.round(2 * parseFloat(formBody.taxableValue) * 0.09)
          : parseFloat(formBody.taxableValue) +
            Math.round(parseFloat(formBody.taxableValue) * 0.18)
        : formBody.taxableValue,
    },
  ];

  // console.log(formBody.taxableValue);

  function numberToWords(num) {
    if (num === 0) return "zero";

    const words = [];

    const singleDigits = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const twoDigits = [
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tensMultiple = [
      "ten",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    function convertToWords(n, suffix = "") {
      // `Converting ${n}`; // Debug output
      let str = "";
      if (n > 19) {
        str +=
          tensMultiple[Math.floor(n / 10) - 1] +
          (n % 10 > 0 ? " " + singleDigits[(n % 10) - 1] : "");
      } else if (n > 9) {
        str += twoDigits[n - 11];
      } else if (n > 0) {
        str += singleDigits[n - 1];
      }

      return str ? str + (suffix ? " " + suffix : "") : "";
    }

    // Crore
    if (num >= 10000000) {
      words.push(convertToWords(Math.floor(num / 10000000), "crore"));
      num %= 10000000;
    }

    // Lakh
    if (num >= 100000) {
      words.push(convertToWords(Math.floor(num / 100000), "lakh"));
      num %= 100000;
    }

    // Thousand
    if (num >= 1000) {
      words.push(convertToWords(Math.floor(num / 1000), "thousand"));
      num %= 1000;
    }

    // Hundred
    if (num >= 100) {
      words.push(convertToWords(Math.floor(num / 100), "hundred"));
      num %= 100;
    }

    // Ten and ones
    if (num > 0) {
      words.push(convertToWords(num));
    }

    return words.join(" ").trim();
  }

  // console.log(numberToWords(111321)); // Output: "one thousand two hundred thirty four"

  /***************
   * 
   * 
   * 
   
   
   
   
   
   IGST IS NOT APPLICABLE WHEN THE STATE IS WEST BENGAL

   
   
   
   
   
   
   ****************/

  console.log(
    (
      parseFloat(accountBalance) +
      parseFloat((accountBalance * 0.18).toFixed(2))
    ).toFixed(2)
  );

  return (
    <div
      className="bg-white w-[800px] h-[1120px] rounded-lg"
      id="invoice"
      ref={ref}
    >
      <div className="p-3">
        <p>
          <b>Vendor Name -</b> {formBody.vendorName}
        </p>

        <p>
          <b>Address -</b> {formBody.address}, {formBody.streetName},{" "}
          {formBody.pinCode}, {formBody.city}
        </p>

        {gst && (
          <p>
            <b>GSTIN Number -</b> {formBody.gstinNumber}
          </p>
        )}
      </div>

      <div className="mt-1">
        <div className="border-y border-surface-white-line h-5">
          <h5 className="text-heading-5-bold text-primary-dark text-center">
            {gst && "TAX"} INVOICE
          </h5>
        </div>

        <div className="flex p-3 pr-0 border-b border-surface-white-line">
          <div className="w-4/5 font-bold text-subtitle-2">
            {/* <p>Whether Tax is paid Reverse Charge Basis - Yes/ No</p> */}
            <p>Invoice Number - {formBody.invoiceNumber}</p>
            <p>Invoice Date - {formBody.invoiceDate}</p>
            <p>PAN Number - {formBody.panNumber}</p>
            <p>CIN Number - {formBody.cinNumber}</p>
            <p>State - {formBody.state}</p>
            {/* <p>State Code - 19</p> */}
          </div>
          <div className="w-1/5 border border-surface-white-line h-fit border-r-0 divide-y divide-surface-white-line text-subtitle-2 font-bold">
            <p className="p-1">Original for Recipient</p>
            <p className="p-1">Duplicate for Supplier</p>
          </div>
        </div>

        <div className="flex divide-x divide-surface-white-line border-b border-surface-white-line">
          <div className="w-7/12 px-3 py-2 font-bold text-subtitle-2">
            <p>Name - GeetBazaar </p>
            <p>Address - Cooch Behar - 736165</p>
            {/* <br />
            <br /> */}
            <p>GSTIN Number - 19BHDPC1438D1ZU</p>
            <p>PAN Number - BHDPC1438D</p>
            <p>State - West Bengal</p>
            {/* <p>State Code - 27</p> */}
          </div>
          {gst && (
            <div className="w-5/12 p-3 text-subtitle-2 font-bold">
              Place of Supply - {formBody.state}
            </div>
          )}
        </div>

        <div className="flex flex-col divide-y divide-surface-white-line border-b border-surface-white-line">
          <div
            className={`grid ${
              gst
                ? formBody.state === "West Bengal"
                  ? "grid-cols-6"
                  : "grid-cols-5"
                : "grid-cols-3"
            } px-3 divide-x divide-surface-white-line text-subtitle-2 font-bold`}
          >
            <div className="text-center flex items-center justify-center">
              Sr. No
            </div>
            <div className="text-center flex items-center justify-center">
              Name of the Product/ Service
            </div>
            {/* <div className="text-center flex items-center justify-center">
              Service Accounting Code (SAC)
            </div> */}
            {gst && (
              <div className="text-center flex items-center justify-center">
                Taxable Value
              </div>
            )}
            {gst && (
              <>
                {formBody.state === "West Bengal" && (
                  <>
                    <div className="text-center flex flex-col items-center justify-center">
                      CGST <br />
                      <div className="border-t border-surface-white-line h-full grid grid-cols-2 divide-x divide-surface-white-line w-full">
                        <p className="flex items-center justify-center">Rate</p>
                        <p className="flex items-center justify-center">
                          Amount
                        </p>
                      </div>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center">
                      SGST <br />
                      <div className="border-t border-surface-white-line h-full grid grid-cols-2 divide-x divide-surface-white-line w-full">
                        <p className="flex items-center justify-center">Rate</p>
                        <p className="flex items-center justify-center">
                          Amount
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {formBody.state !== "West Bengal" && (
                  <div className="text-center flex flex-col items-center justify-center">
                    IGST <br />
                    <div className="border-t border-surface-white-line h-full grid grid-cols-2 divide-x divide-surface-white-line w-full">
                      <p className="flex items-center justify-center">Rate</p>
                      <p className="flex items-center justify-center">Amount</p>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="text-center flex items-center justify-center">
              Total{" "}
            </div>
          </div>

          {data.map(
            ({
              sr_no,
              productName,
              sac,
              taxableValue,
              cgst,
              sgst,
              igst,
              total,
            }) => (
              <div
                className={`grid ${
                  gst
                    ? formBody.state === "West Bengal"
                      ? "grid-cols-6"
                      : "grid-cols-5"
                    : "grid-cols-3"
                } px-3 divide-x divide-surface-white-line text-subtitle-2 font-bold`}
              >
                <div className="text-center flex items-center justify-center">
                  {sr_no}
                </div>
                <div className="text-center flex items-center justify-center">
                  {productName}
                </div>
                {/* <div className="text-center flex items-center justify-center">
                  {sac || "N/A"}
                </div> */}
                {gst && (
                  <div className="text-center flex items-center justify-center">
                    {taxableValue}
                  </div>
                )}

                {gst && (
                  <>
                    {formBody.state === "West Bengal" && (
                      <>
                        <div className="border-t border-surface-white-line h-full grid grid-cols-2 divide-x divide-surface-white-line w-full">
                          <p className="flex items-center justify-center">
                            {cgst.rate}%
                          </p>
                          <p className="flex items-center justify-center">
                            {cgst.amount}
                          </p>
                        </div>

                        <div className="border-t border-surface-white-line h-full grid grid-cols-2 divide-x divide-surface-white-line w-full">
                          <p className="flex items-center justify-center">
                            {sgst.rate}%
                          </p>
                          <p className="flex items-center justify-center">
                            {sgst.amount}
                          </p>
                        </div>
                      </>
                    )}

                    {formBody.state !== "West Bengal" && (
                      <div className="border-t border-surface-white-line h-full grid grid-cols-2 divide-x divide-surface-white-line w-full">
                        <p className="flex items-center justify-center">
                          {igst.rate}%
                        </p>
                        <p className="flex items-center justify-center">
                          {igst.amount}
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div className="text-center flex items-center justify-center">
                  {total}
                </div>
              </div>
            )
          )}
        </div>

        <div className="text-subtitle-2 font-bold">
          <div className="flex flex-wrap divide-x divide-y divide-surface-white-line border-b border-surface-white-line">
            <div className="p-3 w-7/12">
              Total Invoice amount in words:
              {/* <br /> */}
              <div className="capitalize">
                {numberToWords(
                  gst
                    ? formBody.state === "West Bengal"
                      ? parseInt(formBody.taxableValue) +
                        Math.round(2 * parseInt(formBody.taxableValue) * 0.09)
                      : parseInt(formBody.taxableValue) +
                        Math.round(parseInt(formBody.taxableValue) * 0.18)
                    : parseInt(formBody.taxableValue)
                )}{" "}
              </div>
              Rupees{" "}
              <span className="capitalize">
                {numberToWords(
                  gst
                    ? formBody.state === "West Bengal"
                      ? accountBalance +
                        (2 * (accountBalance * 0.09)).toFixed(2).split(".")[1]
                      : (
                          parseFloat(accountBalance) +
                          parseFloat((accountBalance * 0.18).toFixed(2))
                        )
                          .toFixed(2)
                          .split(".")[1]
                    : accountBalance.split(".")[1]
                )}
              </span>{" "}
              Paisa only
            </div>
            <div className="w-5/12 flex flex-col divide-y divide-surface-white-line !border-t-0">
              {/* +++++++++++++++++++++++  HIDE FOR NON GST   ++++++++++++++++++++++++++ */}

              {gst && (
                <div className="grid grid-cols-2 divide-x divide-surface-white-line">
                  <p className="p-1">Total amount before tax</p>
                  <p className="p-1">{accountBalance}</p>
                </div>
              )}
              {gst && formBody.state === "West Bengal" && (
                <>
                  <div className="grid grid-cols-2 divide-x divide-surface-white-line">
                    <p className="p-1">Add - CGST</p>
                    <p className="p-1">
                      {gst ? (accountBalance * 0.09).toFixed(2) : "NA"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-surface-white-line">
                    <p className="p-1">Add - SGST</p>
                    <p className="p-1">
                      {gst ? (accountBalance * 0.09).toFixed(2) : "NA"}
                    </p>
                  </div>
                </>
              )}
              {gst && formBody.state !== "West Bengal" && (
                <div className="grid grid-cols-2 divide-x divide-surface-white-line">
                  <p className="p-1">Add - IGST</p>
                  <p className="p-1">
                    {gst ? (accountBalance * 0.18).toFixed(2) : "NA"}
                  </p>
                </div>
              )}
              {gst && (
                <div className="grid grid-cols-2 divide-x divide-surface-white-line">
                  <p className="p-1">Total Amount - GST</p>{" "}
                  {/* (cgst +sgst) / igst */}
                  <p className="p-1">
                    {formBody.state === "West Bengal"
                      ? 2 * (accountBalance * 0.09).toFixed(2)
                      : (accountBalance * 0.18).toFixed(2)}
                  </p>
                </div>
              )}
              {gst && (
                <div className="grid grid-cols-2 divide-x divide-surface-white-line">
                  <p className="p-1">Total Amount after tax</p>
                  <p className="p-1">
                    {gst
                      ? formBody.state === "West Bengal"
                        ? accountBalance +
                          (2 * (accountBalance * 0.09)).toFixed(2)
                        : (
                            parseFloat(accountBalance) +
                            parseFloat((accountBalance * 0.18).toFixed(2))
                          ).toFixed(2)
                      : accountBalance}
                  </p>{" "}
                  {/*total amount before tax + total gst*/}
                </div>
              )}
              {/* <div className="grid grid-cols-2 divide-x divide-surface-white-line">
                <p className="p-1">GST Payable on Reverse Charge</p>
                <p className="p-1"></p>
              </div> */}
            </div>
          </div>

          <div className="flex flex-wrap divide-x divide-surface-white-line border-b border-surface-white-line">
            <div className="px-3 pt-2 w-7/12">
              {ruIndian ? (
                <>
                  <p>Bank Details :</p>
                  <p>
                    Name of the Bank -{" "}
                    <span className="uppercase">{formBody.bankName}</span>
                  </p>
                  <p>
                    Branch -{" "}
                    <span className="uppercase">{formBody.branch}</span>
                  </p>
                  <p>
                    Beneficiary Name -{" "}
                    <span className="uppercase">
                      {formBody.beneficiaryName}
                    </span>
                  </p>
                  <p>
                    Account Type -{" "}
                    <span className="uppercase">{formBody.accountType}</span>
                  </p>
                  <p>
                    Account Number -{" "}
                    <span className="uppercase">{formBody.accountNumber}</span>
                  </p>
                  <p>
                    IFSC -{" "}
                    <span className="uppercase">{formBody.ifscCode}</span>
                  </p>
                </>
              ) : paypal ? (
                <div className="flex gap-1">
                  <p>PayPal Email Address :</p>
                  <p>{formBody.paypalEmailAddress}</p>
                </div>
              ) : (
                <>
                  <p>Bank Details :</p>
                  <p>
                    Name of the Bank -{" "}
                    <span className="uppercase">{formBody.bankName}</span>
                  </p>
                  <p>
                    Branch -{" "}
                    <span className="uppercase">{formBody.branch}</span>
                  </p>
                  <p>
                    Beneficiary Name -{" "}
                    <span className="uppercase">
                      {formBody.beneficiaryName}
                    </span>
                  </p>
                  <p>
                    Account Type -{" "}
                    <span className="uppercase">{formBody.accountType}</span>
                  </p>
                  <p>
                    Account Number -{" "}
                    <span className="uppercase">{formBody.accountNumber}</span>
                  </p>
                  <p>
                    IFSC -{" "}
                    <span className="uppercase">{formBody.ifscCode}</span>
                  </p>
                </>
              )}
            </div>
            <div className="w-5/12 flex flex-col p-1">
              <p className="text-center">
                Certified that the Particulars given above are true & correct
              </p>
              <p>
                For - {userData.first_name} {userData.last_name}
              </p>
              <p>Authorised Signatory -</p>

              <div
                className={`${
                  formBody.state === "West Bengal"
                    ? "mt-1 w-1/2"
                    : "mt-2 w-10/12"
                } mx-auto border-surface-white-line border-b pb-1`}
              >
                <img
                  src={formBody.signatureUrl}
                  className="h-[155px] mx-auto"
                  alt="signature"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Invoice;
