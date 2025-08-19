import React from "react";
import Uploads from "../../components/Uploads/Uploads";
import AccountBalance from "../../components/AccountBalance/AccountBalance";
import UserCard from "../../components/UserCard/UserCard";
import HomeAnalytics from "../../components/HomeAnalytics/HomeAnalytics";
import UserSuggestions from "../../components/UserSuggestions/UserSuggestions";

const Home = () => {
  // console.log(userData);
  // console.log(
  //   (userData.lifetimeRevenue - (userData.lifetimeDisbursed || 0)).toFixed(2)
  // );

  return (
    <div className="pt-6 p-0 2xl:p-0 2xl:mt-7">
      {/* <div className="grid grid-cols-1 2xl:grid-cols-3 justify-between space-y-4 2xl:space-y-0 2xl:gap-x-2 text-black">
        <UserCard />
        <Uploads />
        <AccountBalance />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-2 gap-2">
        <div className="w-full lg:col-span-2 bg-black rounded-lg">
          <HomeAnalytics />
        </div>
      </div> */}

      <div className="grid lg:grid-cols-3 gap-4">
        <aside className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UserCard />
          <Uploads />

          <div className="col-span-2">
            <HomeAnalytics />
          </div>
        </aside>

        <aside className="h-full">
          <AccountBalance />
        </aside>
      </div>
    </div>
  );
};

export default Home;
