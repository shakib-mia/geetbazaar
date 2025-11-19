import React from "react";
import RequireAuth from "./RequireAuth";
// import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileVerification from "./pages/ProfileVerification/ProfileVerification";
import YoutubeOac from "./pages/YoutubeOac/YoutubeOac";
import YoutubeClaimRelease from "./pages/YoutubeClaimRelease/YoutubeClaimRelease";
import PromotionalTool from "./pages/PromotionalTool/PromotionalTool";
import VideoDistribution from "./pages/VideoDistribution/VideoDistribution";
import LinkFacebookAndInstagramProfile from "./pages/LinkFacebookAndInstagramProfile/LinkFacebookAndInstagramProfile";
import FbInstaWhitelisting from "./pages/FbInstaWhitelisting/FbInstaWhitelisting";
import YoutubeVideoTakedown from "./pages/YoutubeVideoTakedown/YoutubeVideoTakedown";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import SignupDetails from "./pages/SignupDetails/SignupDetails";
import OngoingProjects from "./pages/OngoingProjects/OngoingProjects";
import PreviousProjects from "./pages/PreviousProjects/PreviousProjects";
import Profile from "./pages/Profile/Profile";
import Revenue from "./pages/Revenue/Revenue";
import RevenueForm from "./pages/RevenueForm/RevenueForm";
// import SongUpload from "./pages/SongUpload/SongUpload";
import Home from "./pages/Home/Home";
import Payment from "./pages/Payment/Payment";
// import Pricing from "./pages/Plans/Plans";
// import layer from "./assets/icons/navbar/layers.webp";
import Plans from "./pages/Plans/Plans";
import YearlyPlan from "./pages/YearlyPlan/YearlyPlan";
import SongUploadNew from "./pages/SongUploadNew/SongUploadNew";
import SongUploadForm from "./components/SongUploadForm/SongUploadForm";
import { GoGraph } from "react-icons/go";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import { BsFileMusicFill, BsGraphUpArrow, BsUpload } from "react-icons/bs";
import AlbumUpload from "./pages/AlbumUpload/AlbumUpload";
import Settings from "./pages/Settings/Settings";
import { SlCloudUpload } from "react-icons/sl";
import AllSongs from "./pages/AllSongs/AllSongs";
import { LiaItunesNote } from "react-icons/lia";
import { GoTag } from "react-icons/go";
// import { LuHome, LuUserCheck2 } from "react-icons/lu";
import { FaUserCheck, FaWpforms } from "react-icons/fa";
import KYC from "./pages/KYC/KYC";
import { IoMdAnalytics, IoMdHome } from "react-icons/io";
import Analytics from "./components/Analytics/Analytics";
import BulkUpload from "./pages/BulkUpload/BulkUpload";
import SocialLinks from "./pages/SocialLinks/SocialLinks";
import { FaArrowsSplitUpAndLeft, FaCrown } from "react-icons/fa6";
import { TbDeviceMobileHeart } from "react-icons/tb";
import CrbtCodes from "./pages/CrbtCodes/CrbtCodes";
import RoyaltySplit from "./pages/RoyaltySplit/RoyaltySplit";
import FreshProfile from "./pages/FreshProfile/FreshProfile";
import Pitch from "./pages/Pitch/Pitch";
import CustomPlan from "./pages/CustomPlan/CustomPlan";
import HomeV2 from "./pages/HomeV2/HomeV2";
import Accounts from "./pages/Accounts/Accounts";
import VerifyOtp from "./pages/VerifyOtp/VerifyOtp";
import ResetPasswordOtp from "./pages/ResetPasswordOtp/ResetPasswordOtp";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import RevenueFormNew from "./pages/RevenueFormNew/RevenueFormNew";

export const backendUrl = "https://musicx-be-byy1.vercel.app/";
// export const backendUrl = "http://localhost:5000/";
export const currencyAPI = "https://api.frankfurter.app/latest";

export const navItem = [
  {
    icon: <IoMdHome className="text-[30px]" />,
    text: "Home",
    path: "/",
  },
  // {
  //   icon: <BsGraphUpArrow className="text-[24px]" />,
  //   text: "Revenue",
  //   path: "/revenue",
  // },

  {
    icon: <BsUpload className="text-[24px]" />,
    text: "Song Upload",
    path: "/song-upload",
  },
  {
    icon: <GoTag className="text-[24px]" />,
    text: "Plans",
    path: "/plans",
  },

  {
    icon: <LiaItunesNote className="text-heading-5 text-center" />,
    text: "My Releases",
    path: "/all-songs",
  },

  // {
  //   icon: (
  //     <FaCrown className="text-heading-6 text-yellow-300 group-hover:text-black" />
  //   ),
  //   text: "Custom Plan",
  //   path: "/custom-plans",
  // },

  // {
  //   icon: <LuUserCheck2 className="text-heading-6 text-center" />,
  //   text: "KYC",
  //   path: "/kyc",
  // },

  // {
  //   icon: <BsFileMusicFill className="text-heading-6 text-center" />,
  //   text: "CRBT Codes",
  //   path: "/crbt-codes",
  // },

  // {
  //   icon: <FaArrowsSplitUpAndLeft className="text-heading-6 text-center" />,
  //   text: "Royalty Split",
  //   path: "/royalty-split",
  // },
  {
    icon: <FaWpforms className="text-[24px]" />,
    text: "Forms",
    dropdownItem: [
      { dropdownPath: "/promotional-tool", text: "Promotional Tool" },
      { dropdownPath: "/youtube-oac", text: "YouTube OAC" },
      { dropdownPath: "/youtube-claim-release", text: "YouTube Claim Release" },
      // { dropdownPath: "/video-distribution", text: "Video Distribution" },
      {
        dropdownPath: "/link-facebook-and-instagram-profile-with-songs",
        text: "Link Facebook & Instagram Profiles with Songs",
      },
      {
        dropdownPath: "/facebook-insta-whitelisting",
        text: "Facebook & Instagram Whitelisting",
      },
      // {
      //   dropdownPath: "/youtube-video-takedown",
      //   text: "YouTube Video Takedown",
      // },
      {
        dropdownPath: "/spotify-fresh-profile",
        text: "Spotify Profile Relocate",
      },

      {
        dropdownPath: "/jiosaavn-fresh-profile",
        text: "JioSaavn Profile Relocate",
      },
      {
        dropdownPath: "/apple-music-fresh-profile",
        text: "Apple Music Profile Relocate",
      },
      {
        dropdownPath: "/gaana-fresh-profile",
        text: "Gaana Profile Relocate",
      },
      {
        dropdownPath: "/pitch-for-editorial-playlist",
        text: "Pitch For Editorial Playlist",
      },
    ],
  },
];

export const navPhone = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.3861 1.21065C11.7472 0.929784 12.2528 0.929784 12.6139 1.21065L21.6139 8.21065C21.8575 8.4001 22 8.69141 22 9V20C22 20.7957 21.6839 21.5587 21.1213 22.1213C20.5587 22.6839 19.7957 23 19 23H5C4.20435 23 3.44129 22.6839 2.87868 22.1213C2.31607 21.5587 2 20.7957 2 20V9C2 8.69141 2.14247 8.4001 2.38606 8.21065L11.3861 1.21065ZM10 21H14V13H10V21ZM16 21V12C16 11.4477 15.5523 11 15 11H9C8.44772 11 8 11.4477 8 12V21H5C4.73478 21 4.48043 20.8946 4.29289 20.7071C4.10536 20.5196 4 20.2652 4 20V9.48908L12 3.26686L20 9.48908V20C20 20.2652 19.8946 20.5196 19.7071 20.7071C19.5196 20.8946 19.2652 21 19 21H16Z"
        />
      </svg>
    ),
    text: "Home",
    path: "/",
  },
  {
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0429 1.29289C12.2305 1.10536 12.4848 1 12.75 1C14.1946 1 15.625 1.28452 16.9596 1.83733C18.2941 2.39013 19.5068 3.20038 20.5282 4.22183C21.5497 5.24327 22.3599 6.4559 22.9127 7.79048C23.4655 9.12506 23.75 10.5555 23.75 12C23.75 12.5523 23.3023 13 22.75 13H12.75C12.1978 13 11.75 12.5523 11.75 12V2C11.75 1.73478 11.8554 1.48043 12.0429 1.29289ZM13.75 3.05573V11H21.6943C21.6006 10.1614 21.3891 9.33849 21.065 8.55585C20.6127 7.46392 19.9497 6.47177 19.114 5.63604C18.2783 4.80031 17.2861 4.13738 16.1942 3.68508C15.4115 3.3609 14.5886 3.14949 13.75 3.05573ZM9.66657 2.43004C9.88746 2.93623 9.65618 3.52564 9.15 3.74653C7.80259 4.33452 6.61973 5.24362 5.70484 6.39436C4.78994 7.5451 4.17087 8.90244 3.90173 10.3477C3.6326 11.793 3.72161 13.2822 4.16097 14.6851C4.60033 16.088 5.37667 17.3619 6.42211 18.3955C7.46756 19.4291 8.75028 20.1908 10.1581 20.6141C11.566 21.0375 13.0561 21.1095 14.4982 20.8238C15.9403 20.5382 17.2905 19.9037 18.4307 18.9757C19.5709 18.0477 20.4664 16.8546 21.039 15.5005C21.2541 14.9919 21.8408 14.7539 22.3495 14.969C22.8582 15.1841 23.0962 15.7708 22.8811 16.2795C22.1813 17.9344 21.0867 19.3927 19.6931 20.5269C18.2995 21.6611 16.6493 22.4366 14.8868 22.7857C13.1242 23.1348 11.3029 23.0468 9.58224 22.5294C7.86153 22.0121 6.29377 21.081 5.016 19.8178C3.73823 18.5545 2.78937 16.9975 2.25238 15.2828C1.71538 13.5681 1.60659 11.748 1.93553 9.98156C2.26447 8.21513 3.02112 6.55616 4.13933 5.1497C5.25753 3.74324 6.70325 2.63212 8.35008 1.91347C8.85627 1.69258 9.44568 1.92385 9.66657 2.43004Z"
          fill="#202020"
          fillOpacity="0.8"
        />
      </svg>
    ),
    text: "Reports",
    path: "/revenue",
  },

  {
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2732_2253)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.25 2C11.9848 2 11.7304 2.10536 11.5429 2.29289C11.3554 2.48043 11.25 2.73478 11.25 3V3.17399C11.2479 3.6908 11.0948 4.19572 10.8094 4.62661C10.5241 5.0575 10.119 5.39555 9.64393 5.59914C9.55938 5.63538 9.47042 5.65969 9.37961 5.67157C8.94798 5.82272 8.48333 5.85998 8.031 5.77796C7.51 5.68349 7.02925 5.43512 6.65073 5.06486L6.64285 5.05715L6.58289 4.99711C6.49002 4.90413 6.37934 4.82998 6.25794 4.77965C6.13654 4.72933 6.00642 4.70343 5.875 4.70343C5.74358 4.70343 5.61346 4.72933 5.49206 4.77965C5.37066 4.82998 5.26037 4.90374 5.1675 4.99671L5.16671 4.9975C5.07374 5.09037 4.99998 5.20066 4.94965 5.32206C4.89933 5.44346 4.87343 5.57358 4.87343 5.705C4.87343 5.83642 4.89933 5.96654 4.94965 6.08794C4.99998 6.20934 5.07374 6.31963 5.16671 6.4125L5.23491 6.48069C5.60516 6.85921 5.85349 7.34 5.94796 7.861C6.04055 8.37163 5.98113 8.89797 5.77745 9.37478C5.59189 9.86133 5.26698 10.2827 4.84305 10.5859C4.41054 10.8952 3.89498 11.0673 3.36338 11.0797L3.34 11.08H3.25C2.98478 11.08 2.73043 11.1854 2.54289 11.3729C2.35536 11.5604 2.25 11.8148 2.25 12.08C2.25 12.3452 2.35536 12.5996 2.54289 12.7871C2.73043 12.9746 2.98478 13.08 3.25 13.08H3.42399C3.9408 13.0821 4.44572 13.2352 4.87661 13.5206C5.30601 13.8049 5.6432 14.2082 5.84701 14.6811C6.05908 15.1643 6.12211 15.6998 6.02796 16.219C5.93349 16.74 5.68512 17.2207 5.31486 17.5993L5.30715 17.6072L5.2471 17.6671C5.15413 17.76 5.07998 17.8707 5.02965 17.9921C4.97933 18.1135 4.95343 18.2436 4.95343 18.375C4.95343 18.5064 4.97933 18.6365 5.02965 18.7579C5.07998 18.8793 5.15374 18.9896 5.24671 19.0825L5.2475 19.0833C5.34037 19.1763 5.45066 19.25 5.57206 19.3003C5.69346 19.3507 5.82359 19.3766 5.955 19.3766C6.08641 19.3766 6.21654 19.3507 6.33794 19.3003C6.45934 19.25 6.56963 19.1763 6.6625 19.0833L6.73069 19.0151C7.10921 18.6448 7.59 18.3965 8.111 18.302C8.62163 18.2095 9.14796 18.2689 9.62477 18.4725C10.1113 18.6581 10.5327 18.983 10.8359 19.407C11.1452 19.8395 11.3173 20.355 11.3297 20.8866L11.33 20.91V21C11.33 21.2652 11.4354 21.5196 11.6229 21.7071C11.8104 21.8946 12.0648 22 12.33 22C12.5952 22 12.8496 21.8946 13.0371 21.7071C13.2246 21.5196 13.33 21.2652 13.33 21V20.83L13.33 20.826C13.3321 20.3092 13.4852 19.8043 13.7706 19.3734C14.055 18.944 14.4583 18.6067 14.9312 18.4029C15.4143 18.1909 15.9498 18.1279 16.469 18.222C16.99 18.3165 17.4707 18.5649 17.8493 18.9351L17.8571 18.9429L17.9171 19.0029C18.01 19.0959 18.1207 19.17 18.2421 19.2203C18.3635 19.2707 18.4936 19.2966 18.625 19.2966C18.7564 19.2966 18.8865 19.2707 19.0079 19.2203C19.1293 19.17 19.2396 19.0963 19.3325 19.0033L19.3333 19.0025C19.4263 18.9096 19.5 18.7993 19.5503 18.6779C19.6007 18.5565 19.6266 18.4264 19.6266 18.295C19.6266 18.1636 19.6007 18.0335 19.5503 17.9121C19.5 17.7907 19.4263 17.6804 19.3333 17.5875L19.2651 17.5193C18.8948 17.1408 18.6465 16.66 18.552 16.139C18.4579 15.6198 18.5209 15.0843 18.7329 14.6012C18.9367 14.1283 19.274 13.725 19.7034 13.4406C20.1343 13.1552 20.6392 13.0021 21.156 13L21.16 13L21.25 13C21.5152 13 21.7696 12.8946 21.9571 12.7071C22.1446 12.5196 22.25 12.2652 22.25 12C22.25 11.7348 22.1446 11.4804 21.9571 11.2929C21.7696 11.1054 21.5152 11 21.25 11H21.08L21.076 11C20.5592 10.9979 20.0543 10.8448 19.6234 10.5594C19.1925 10.2741 18.8545 9.86896 18.6509 9.39393C18.6146 9.30938 18.5903 9.22042 18.5784 9.12961C18.4273 8.69798 18.39 8.23332 18.472 7.781C18.5665 7.26 18.8149 6.77925 19.1851 6.40073L19.1928 6.39285L19.2529 6.3329C19.3459 6.24002 19.42 6.12934 19.4703 6.00794C19.5207 5.88654 19.5466 5.75641 19.5466 5.625C19.5466 5.49359 19.5207 5.36346 19.4703 5.24206C19.42 5.12066 19.3463 5.01037 19.2533 4.9175L19.2525 4.91671C19.1596 4.82374 19.0493 4.74998 18.9279 4.69965C18.8065 4.64933 18.6764 4.62343 18.545 4.62343C18.4136 4.62343 18.2835 4.64933 18.1621 4.69965C18.0407 4.74998 17.9304 4.82374 17.8375 4.91671L17.7693 4.98491C17.3908 5.35516 16.91 5.60349 16.389 5.69796C15.8698 5.79211 15.3343 5.72908 14.8511 5.51701C14.3782 5.3132 13.9749 4.97601 13.6906 4.54661C13.4052 4.11572 13.2521 3.6108 13.25 3.09399L13.25 3.09V3C13.25 2.73478 13.1446 2.48043 12.9571 2.29289C12.7696 2.10536 12.5152 2 12.25 2ZM10.1287 0.87868C10.6913 0.316071 11.4544 0 12.25 0C13.0456 0 13.8087 0.316071 14.3713 0.87868C14.9339 1.44129 15.25 2.20435 15.25 3V3.0875C15.2508 3.21374 15.2883 3.33704 15.3581 3.44232C15.428 3.54801 15.5274 3.63092 15.6439 3.68086L15.6538 3.68508C15.7726 3.73752 15.9044 3.75322 16.0322 3.73005C16.1586 3.70713 16.2753 3.64728 16.3677 3.55811L16.4225 3.50329C16.7011 3.22436 17.032 3.00308 17.3962 2.85211C17.7604 2.70113 18.1508 2.62343 18.545 2.62343C18.9392 2.62343 19.3296 2.70113 19.6938 2.85211C20.058 3.00308 20.3889 3.22436 20.6675 3.50329C20.9461 3.78174 21.1671 4.11233 21.3179 4.47618C21.4689 4.84037 21.5466 5.23075 21.5466 5.625C21.5466 6.01925 21.4689 6.40963 21.3179 6.77382C21.167 7.13784 20.9459 7.46857 20.6671 7.7471C20.667 7.74724 20.6672 7.74697 20.6671 7.7471L20.6119 7.80231C20.5227 7.89468 20.4629 8.01142 20.44 8.13782C20.4168 8.26561 20.4324 8.39742 20.4849 8.51624C20.5131 8.58027 20.5345 8.64692 20.5488 8.71507C20.5961 8.78479 20.6568 8.84498 20.7277 8.89195C20.833 8.96167 20.9563 8.99921 21.0825 9H21.25C22.0457 9 22.8087 9.31607 23.3713 9.87868C23.9339 10.4413 24.25 11.2043 24.25 12C24.25 12.7957 23.9339 13.5587 23.3713 14.1213C22.8087 14.6839 22.0457 15 21.25 15H21.1625C21.0363 15.0008 20.913 15.0383 20.8077 15.1081C20.702 15.178 20.6191 15.2774 20.5691 15.3939L20.5649 15.4038C20.5125 15.5226 20.4968 15.6544 20.52 15.7822C20.5429 15.9086 20.6027 16.0253 20.6919 16.1177L20.7467 16.1725C20.7466 16.1724 20.7468 16.1726 20.7467 16.1725C21.0255 16.451 21.247 16.7822 21.3979 17.1462C21.5489 17.5104 21.6266 17.9008 21.6266 18.295C21.6266 18.6892 21.5489 19.0796 21.3979 19.4438C21.2469 19.808 21.0256 20.1389 20.7467 20.4175L20.04 19.71L20.7475 20.4167C20.4689 20.6956 20.138 20.9169 19.7738 21.0679C19.4096 21.2189 19.0192 21.2966 18.625 21.2966C18.2308 21.2966 17.8404 21.2189 17.4762 21.0679C17.1122 20.917 16.7814 20.6959 16.5029 20.4171C16.5028 20.417 16.503 20.4172 16.5029 20.4171L16.4477 20.3619C16.3553 20.2727 16.2386 20.2129 16.1122 20.19C15.9844 20.1668 15.8526 20.1824 15.7338 20.2349L15.724 20.2392C15.6074 20.2891 15.508 20.372 15.4381 20.4777C15.3683 20.583 15.3308 20.7063 15.33 20.8325V21C15.33 21.7957 15.0139 22.5587 14.4513 23.1213C13.8887 23.6839 13.1257 24 12.33 24C11.5343 24 10.7713 23.6839 10.2087 23.1213C9.64607 22.5587 9.33 21.7957 9.33 21V20.9244C9.32526 20.7972 9.28327 20.6741 9.20914 20.5704C9.13326 20.4644 9.02723 20.3836 8.90482 20.3385C8.88505 20.3313 8.86551 20.3234 8.84624 20.3149C8.72742 20.2624 8.59561 20.2468 8.46782 20.27C8.34142 20.2929 8.22467 20.3527 8.1323 20.4419L8.0775 20.4967C8.07737 20.4968 8.07763 20.4966 8.0775 20.4967C7.79896 20.7755 7.46784 20.997 7.10382 21.1479C6.73963 21.2989 6.34925 21.3766 5.955 21.3766C5.56075 21.3766 5.17037 21.2989 4.80618 21.1479C4.44233 20.9971 4.11174 20.7761 3.83329 20.4975C3.55436 20.2189 3.33308 19.888 3.18211 19.5238C3.03113 19.1596 2.95343 18.7692 2.95343 18.375C2.95343 17.9808 3.03113 17.5904 3.18211 17.2262C3.33308 16.862 3.55436 16.5311 3.83329 16.2525L3.88811 16.1977C3.97728 16.1053 4.03713 15.9886 4.06005 15.8622C4.08322 15.7344 4.06758 15.6026 4.01514 15.4838L4.01081 15.474C3.96087 15.3574 3.87801 15.258 3.77232 15.1881C3.66704 15.1183 3.54374 15.0808 3.4175 15.08H3.25C2.45435 15.08 1.69129 14.7639 1.12868 14.2013C0.566071 13.6387 0.25 12.8756 0.25 12.08C0.25 11.2844 0.566071 10.5213 1.12868 9.95868C1.69129 9.39607 2.45435 9.08 3.25 9.08H3.32564C3.45283 9.07526 3.57591 9.03327 3.67955 8.95914C3.78564 8.88326 3.86644 8.77723 3.91146 8.65482C3.91874 8.63505 3.92663 8.61551 3.93514 8.59624C3.98758 8.47742 4.00322 8.34561 3.98005 8.21782C3.95713 8.09142 3.89728 7.97468 3.8081 7.88231L3.75329 7.8275C3.47436 7.54888 3.25308 7.21802 3.10211 6.85382C2.95113 6.48963 2.87343 6.09925 2.87343 5.705C2.87343 5.31075 2.95113 4.92037 3.10211 4.55618C3.25301 4.19216 3.47415 3.86143 3.75289 3.58289C4.03143 3.30415 4.36216 3.08301 4.72618 2.93211C5.09037 2.78113 5.48075 2.70343 5.875 2.70343C6.26925 2.70343 6.65963 2.78113 7.02382 2.93211C7.38802 3.08308 7.71888 3.30436 7.9975 3.58329L8.05231 3.6381C8.14468 3.72728 8.26142 3.78713 8.38782 3.81005C8.51561 3.83322 8.64742 3.81758 8.76624 3.76514C8.83027 3.73687 8.89693 3.71549 8.96507 3.70122C9.03479 3.6539 9.09498 3.59323 9.14195 3.52232C9.21167 3.41704 9.24921 3.29374 9.25 3.1675V3C9.25 2.20435 9.56607 1.44129 10.1287 0.87868ZM12.25 10C11.1454 10 10.25 10.8954 10.25 12C10.25 13.1046 11.1454 14 12.25 14C13.3546 14 14.25 13.1046 14.25 12C14.25 10.8954 13.3546 10 12.25 10ZM8.25 12C8.25 9.79086 10.0409 8 12.25 8C14.4591 8 16.25 9.79086 16.25 12C16.25 14.2091 14.4591 16 12.25 16C10.0409 16 8.25 14.2091 8.25 12Z"
            fill="#202020"
            fillOpacity="0.8"
          />
        </g>
        <defs>
          <clipPath id="clip0_2732_2253">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.25)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    text: "Settings",
    path: "/settings",
  },
];

export const getVideoDistributions =
  "http://adztronaut.com/music/admin/api/getVideoDistribution";

export const getYoutubeOac =
  "http://adztronaut.com/music/admin/api/getYoutubeOac";

export const imageDomain = "https://beta.geetbazaardigital.com/admin/";

export const config = {
  headers: {
    token: sessionStorage.getItem("token"),
  },
};

export const user = JSON.parse(sessionStorage.getItem("user"));

export const routes = [
  {
    path: "/",
    page: (
      <RequireAuth>
        <Home /> {/* will be replaced by <Home /> */}
      </RequireAuth>
    ),
  },
  {
    path: "/verify-otp",
    page: (
      <>
        <VerifyOtp />
      </>
    ),
  },
  {
    path: "/verify-otp/reset",
    page: (
      <>
        <ResetPasswordOtp />
      </>
    ),
  },
  {
    path: "/reset-password",
    page: <ResetPassword />,
  },
  {
    path: "/revenue-form-new",
    page: <RevenueFormNew />,
  },
  {
    path: "/home",
    page: (
      <RequireAuth>
        <HomeV2 /> {/* will be replaced by <Home /> */}
      </RequireAuth>
    ),
  },
  {
    path: "/home",
    page: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/accounts",
    page: (
      <RequireAuth>
        <Accounts />
      </RequireAuth>
    ),
  },

  {
    path: "/bulk-upload",
    page: <BulkUpload />,
  },

  {
    path: "/all-songs",
    page: (
      <RequireAuth>
        <AllSongs />
      </RequireAuth>
    ),
  },

  {
    path: "/custom-plans",
    page: (
      <RequireAuth>
        <CustomPlan />
      </RequireAuth>
    ),
  },
  {
    path: "/analytics",
    page: <Analytics />,
  },
  {
    path: "/payment",
    page: <Payment />,
  },
  {
    path: "/plans",
    page: <Plans />,
  },
  {
    path: "/custom-plans",
    page: <CustomPlan />,
  },
  // {
  //   path: "/verified-on-resso",
  //   page: (
  //     <RequireAuth>
  //       <ProfileVerification />
  //     </RequireAuth>
  //   ),
  // },

  {
    path: "/youtube-oac",
    page: (
      <RequireAuth>
        <YoutubeOac />
      </RequireAuth>
    ),
  },
  {
    path: "/youTube-claim-release",
    page: (
      <RequireAuth>
        <YoutubeClaimRelease />
      </RequireAuth>
    ),
  },
  {
    path: "/promotional-tool",
    page: (
      <RequireAuth>
        <PromotionalTool />
      </RequireAuth>
    ),
  },
  {
    path: "/video-distribution",
    page: (
      <RequireAuth>
        <VideoDistribution />
      </RequireAuth>
    ),
  },
  {
    path: "/link-facebook-and-instagram-profile-with-songs",
    page: (
      <RequireAuth>
        <LinkFacebookAndInstagramProfile />
      </RequireAuth>
    ),
  },
  {
    path: "/facebook-insta-whitelisting",
    page: (
      <RequireAuth>
        <FbInstaWhitelisting />
      </RequireAuth>
    ),
  },
  {
    path: "/youtube-video-takedown",
    page: (
      <RequireAuth>
        <YoutubeVideoTakedown />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    page: <Login />,
  },
  {
    path: "/signup",
    page: <SignUp />,
  },
  {
    path: "/forgot-password",
    page: <ForgetPassword />,
  },
  {
    path: "/revenue-form",
    page: <RevenueForm />,
  },

  {
    path: "/signup-details",
    page: (
      // <RequireAuth>
      <SignupDetails />
      // </RequireAuth>
    ),
  },

  {
    path: "/edit-song/:_id",
    page: (
      <RequireAuth>
        <SongUploadNew />
      </RequireAuth>
    ),
  },

  {
    path: "/edit-album/:_id",
    page: (
      <RequireAuth>
        <AlbumUpload />
      </RequireAuth>
    ),
  },

  {
    path: "/projects/ongoing",
    page: (
      <RequireAuth>
        <OngoingProjects />
      </RequireAuth>
    ),
  },
  {
    path: "/projects/previous",
    page: (
      <RequireAuth>
        <PreviousProjects />
      </RequireAuth>
    ),
  },

  {
    path: "/profile",
    page: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },

  {
    path: "/profile/:id",
    page: (
      <>
        <Profile />
      </>
    ),
  },
  {
    path: "/revenue",
    page: (
      // <Construction />
      <RequireAuth>
        <Revenue />
      </RequireAuth>
    ),
  },
  {
    path: "/song-upload",
    page: (
      <RequireAuth>
        {/* <SongUpload /> */}
        {/* If need again just uncomment it and comment the other */}
        <SongUploadNew />
      </RequireAuth>
    ),
  },
  {
    path: "/album-upload",
    page: (
      <RequireAuth>
        {/* <SongUpload /> */}
        {/* If need again just uncomment it and comment the other */}
        <AlbumUpload />
      </RequireAuth>
    ),
  },
  {
    path: "/song-upload-old",
    page: <SongUploadForm />,
  },

  {
    path: "/terms-and-conditions",
    page: <TermsAndConditions />,
  },

  {
    path: "/payment-success",
    page: <PaymentSuccess />,
  },
  {
    path: "/settings",
    page: <Settings />,
  },
  {
    path: "/share/:user_id/:song_id",
    page: <SocialLinks />,
  },
  {
    path: "/kyc",
    page: <KYC />,
  },
  {
    path: "/crbt-codes",
    page: <CrbtCodes />,
  },
  {
    path: "/royalty-split",
    page: <RoyaltySplit />,
  },
  {
    path: "/spotify-fresh-profile",
    page: <FreshProfile />,
  },
  {
    path: "/jiosaavn-fresh-profile",
    page: <FreshProfile />,
  },
  {
    path: "/apple-music-fresh-profile",
    page: <FreshProfile />,
  },
  {
    path: "/gaana-fresh-profile",
    page: <FreshProfile />,
  },
  {
    path: "/pitch-for-editorial-playlist",
    page: <Pitch />,
  },
];
