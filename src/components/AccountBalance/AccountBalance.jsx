import React, { useContext, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
import { RiTokenSwapFill } from "react-icons/ri";
import Tokenize from "../Tokenize/Tokenize";
import CreditTransfer from "../CreditTransfer/CreditTransfer";
import PurchaseToken from "../PurchaseToken/PurchaseToken";
import { FaCreditCard, FaShoppingCart } from "react-icons/fa";

const WithdrawalSection = () => {
  const {
    userData,
    dollarRate,
    token,
    setRefetch,
    currencyPreference,
    setCurrencyPreference,
  } = useContext(ProfileContext);
  const { lifetimeRevenue, lifetimeDisbursed } = userData;
  const [tokenize, showTokenize] = useState(false);
  const [creditTransfer, showCreditTransfer] = useState(false);

  const accountBalance =
    (lifetimeRevenue?.toFixed(2) || 0) -
    (parseFloat(lifetimeDisbursed || 0) + (userData.tokenized || 0)).toFixed(2);
  const navigate = useNavigate();

  // Currency State
  const [currency, setCurrency] = useState(
    userData.billing_country === "India" ? "INR" : "USD"
  );

  // Convert amount
  const convertToUSD = (amount) => amount * dollarRate;

  const handleWithdrawClick = () => {
    navigate("/revenue-form");
    if (userData.kycFilled) {
      const config = { headers: { token } };
      axios.get(backendUrl + "withdrawal-request", config).then(({ data }) => {
        if (data.insertedId) {
          setRefetch((ref) => !ref);
          toast.success("Withdrawal Request Submitted Successfully");
        }
      });
    } else {
      navigate("/revenue-form");
    }
  };

  const isINR = currencyPreference === "INR";
  const currencySymbol = isINR ? "₹" : "$";

  const displayRevenue = !isINR
    ? convertToUSD(lifetimeRevenue || 0).toFixed(2)
    : lifetimeRevenue?.toFixed(2) || 0;

  const numericBalance = Number(accountBalance) || 0;

  const displayWithdrawableAmount = !isINR
    ? convertToUSD(numericBalance).toFixed(2)
    : numericBalance.toFixed(2);

  return (
    <div className="w-full h-full shadow">
      <Tokenize
        showTokenize={showTokenize}
        isINR={isINR}
        tokenize={tokenize}
        accountBalance={displayWithdrawableAmount}
      />
      {creditTransfer && (
        <CreditTransfer
          showCreditTransfer={showCreditTransfer}
          creditTransfer={creditTransfer}
        />
      )}

      <div className="text-grey-dark rounded-lg card-shadow bg-white p-3 h-full">
        <h4 className="text-2xl text-heading-4-bold font-semibold mb-1">
          Withdraw
        </h4>

        <div className="mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-end justify-between">
            <aside className="col-span-2 space-y-1">
              <p className="text-heading-6">
                Lifetime Revenue: <br />
                <span className="text-heading-5-bold">
                  {currencySymbol}
                  {displayRevenue}
                </span>
              </p>
              <div className="flex gap-1">
                <p className="text-heading-6">
                  Withdrawable Amount: <br />
                  <span className="text-heading-5-bold">
                    {currencySymbol}
                    {displayWithdrawableAmount}
                  </span>
                </p>
              </div>
            </aside>

            {/* Currency Dropdown */}
            <aside>
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  localStorage.setItem("currencyPreference", e.target.value);
                  setCurrencyPreference(e.target.value);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </aside>
          </div>
        </div>
        <Button onClick={handleWithdrawClick} disabled={accountBalance < 1000}>
          <FaCreditCard />
          {accountBalance >= 1000 ? (
            "Request Withdraw"
          ) : (
            <>
              Minimum Withdrawable Amount: {isINR ? "₹" : "$"}
              {isINR ? 1000 : (dollarRate * 1000).toFixed(2)}
            </>
          )}
        </Button>

        <Button
          onClick={() => showTokenize(true)}
          disabled={parseFloat(displayWithdrawableAmount) === 0}
          styleType="outlined"
        >
          <RiTokenSwapFill /> Tokenize
        </Button>

        {/* <div className="flex justify-between gap-2"> */}
        <Button styleType="outlined" onClick={() => showCreditTransfer(true)}>
          <FaShoppingCart /> Transfer Token
        </Button>
        <PurchaseToken />

        <p className="mt-2">
          You don’t need to wait for withdrawals anymore—you can instantly
          convert your earnings into tokens and spend them directly on the
          platform. Whatever you earn from sales, royalties, or commissions can
          be turned into tokens and used to upgrade your plan, unlock premium
          features, or purchase additional services without delays or external
          transaction fees. This way, you get faster access to your funds and
          more flexibility, while also making the most out of the platform by
          reinvesting your earnings seamlessly.
        </p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default WithdrawalSection;
