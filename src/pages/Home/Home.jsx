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
      <div className="grid grid-cols-1 2xl:grid-cols-3 justify-between space-y-4 2xl:space-y-0 2xl:gap-x-2 text-white 2xl:h-[27rem]">
        <UserCard />

        {/* <div className="shadow-[0_0_20px_#333] p-2 2xl:p-4 rounded-2xl">
          <div className="flex flex-col 2xl:flex-row items-center 2xl:items-end justify-center w-full 2xl:justify-between">
            {userData.display_image ? (
              <img
                src={userData.display_image}
                className="rounded-full w-7/12 mb-0 aspect-square object-cover"
                alt=""
              />
            ) : (
              <div className="backdrop-blur-2xl aspect-square w-5/12">
                <img src={profile} className="rounded-full mb-0" alt="" />
              </div>
            )}
            <div className="flex justify-center 2xl:justify-end w-full">
              <Button
                text="Visit Profile"
                onClick={() => navigate("/profile")}
                className={"!w-1/2"}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-center 2xl:justify-start gap-2 2xl:gap-3">
              <div className="flex gap-2 items-center">
                <h5 className="text-heading-5">
                  {userData.first_name} {userData.last_name}
                  <div className="border border-grey-dark hidden 2xl:block"></div>
                </h5>
              </div>
            </div>
            <p className="text-button  uppercase mt-2 mb-1 text-center 2xl:text-left">
              {userData["short-bio"]}
            </p>
            <p className=" text-subtitle-2 text-center 2xl:text-left">
              {userData.bio}
            </p>
          </div>
        </div> */}

        {/* <div> <AccountBalance /></div> */}
        <Uploads />
        {/* <RecordLabels /> */}
        {/* <div className="pt-2"> */}
        <AccountBalance />
        {/* </div> */}
      </div>

      {/* <div className="flex flex-col 2xl:flex-row mt-2 w-full gap-2 text-grey-dark">
        <AccountHistory />
        <Notifications />
      </div> */}

      <div className="flex flex-col lg:flex-row mt-2 gap-2">
        <div className="w-full lg:w-2/3 bg-black rounded-lg">
          <HomeAnalytics />
        </div>
        <div className="w-full lg:w-1/3 card-shadow text-white p-4 bg-black rounded-lg">
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
