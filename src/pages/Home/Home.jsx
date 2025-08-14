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
      <div className="grid grid-cols-1 2xl:grid-cols-3 justify-between space-y-4 2xl:space-y-0 2xl:gap-x-2 text-black 2xl:h-[27rem]">
        <UserCard />

        <Uploads />

        <AccountBalance />
      </div>

      {/* <div className="flex flex-col 2xl:flex-row mt-2 w-full gap-2 text-grey-dark">
        <AccountHistory />
        <Notifications />
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-2 gap-2">
        <div className="w-full lg:col-span-2 bg-black rounded-lg">
          <HomeAnalytics />
        </div>
        <div className="w-full lg:col-span-1 card-shadow text-black p-4 bg-black rounded-lg">
          <UserSuggestions />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 xl:grid-cols-2 mt-2 gap-2"> */}
      {/* <RecentUploads /> */}
      {/* <aside className="w-full"></aside> */}
      {/* <CreateRecordLabel /> */}
      {/* </div> */}
      {/* <div className="grid grid-cols-1 mt-2 gap-2 xl:grid-cols-2">
        <RecordLabels />
        <UploadRecordLabel />
      </div> */}
    </div>
  );
};

export default Home;
