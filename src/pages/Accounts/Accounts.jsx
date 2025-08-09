import React from "react";
import AccountBalance from "../../components/AccountBalance/AccountBalance";
import AccountHistory from "../../components/AccountHistory/AccountHistory";

const Accounts = () => {
  return (
    <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-2">
      {/* <div className="w-1/5 text-black"> */}
      <AccountBalance />
      {/* </div> */}
      <AccountHistory />
    </div>
  );
};

export default Accounts;
