import { useMemo } from "react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import $ from "jquery";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import Construction from "./pages/Construction/Construction";
import "react-toastify/dist/ReactToastify.css";
import { backendUrl, currencyAPI, routes } from "./constants";
import BottomBar from "./components/BottomBar/BottomBar";
import { ProfileContext } from "./contexts/ProfileContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { PlanContext } from "./contexts/PlanContext";
import "sweetalert2/src/sweetalert2.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollTop/ScrollTop";
import Lenis from "lenis";
import initializeGA from "./analytics";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import Construction from "./pages/Construction/Construction";

import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [userData, setUserData] = useState({});
  // const [userData, setUserData] = useState(
  //   JSON.parse(sessionStorage.getItem("user")) || {}
  // );

  // console.log();
  const [prevRoute, setPrevRoute] = useState("");
  const [profileData, setProfileData] = useState({});
  const [uId, setUId] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [tokenDetails, setTokenDetails] = useState({});
  const [foundRequested, setFoundRequested] = useState({});
  const [refetch, setRefetch] = useState(true);
  const [recordLabels, setRecordLabels] = useState([]);
  const [currencies, setCurrencies] = useState(1);
  // const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [dollarRate, setDollarRate] = useState(0);
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [updated, setUpdated] = useState(false);
  // const [sessionDuration, setSessionDuration] = useState(0);
  const [albumToggled, setAlbumToggled] = useState(false);

  const existingUsers = useMemo(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  }, []);
  const [loggedInUsers, setLoggedInUsers] = useState(existingUsers);

  /* Working api calls starts here */
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (token && window.location.pathname !== "/login") {
      const config = {
        headers: {
          token,
        },
      };
      axios
        .get(backendUrl + "token-time", config)
        .then(({ data }) => setTokenDetails(data))
        .catch((err) => {
          if (err.response.status === 401) {
            setToken("");
            sessionStorage.removeItem("token");
            toast.error("Token has expired", {
              position: "bottom-center",
            });
            window.location.href = "/login";
          }
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const config = {
        headers: {
          token,
        },
      };
      axios
        .get(backendUrl + "record-labels", config)
        .then(({ data }) => setRecordLabels(data))
        .catch((err) => {
          // console.log(err.response);
          if (err?.response?.status === 401) {
            setToken("");
            sessionStorage.removeItem("token");
            // toast.error("Token has expired", {
            //   position: "bottom-center",
            // });
            // navigate("/login");
            window.location.href = "/login";
          }
        });
    }
  }, [token, refetch]);

  const store = {
    userData,
    setUserData,
    prevRoute,
    setPrevRoute,
    profileData,
    setProfileData,
    token,
    setToken,
    uId,
    setUId,
    tokenDetails,
    dollarRate,
    foundRequested,
    refetch,
    setRefetch,
    recordLabels,
    currencies,
    // timeStamp,
    loginTime,
    setLoginTime,
    logoutTime,
    setLogoutTime,
    updated,
    setUpdated,
    albumToggled,
    setAlbumToggled,
    loggedInUsers,
    setLoggedInUsers,
  };

  useEffect(() => {
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };

    if (token) {
      axios.get(backendUrl + `getUserData`, config).then(({ data }) => {
        if (data?.data !== null) {
          setUserData(data.data);

          // Safe data select koro
          const safeUserData = {
            email: data.data.emailId || data.data.user_email,
            firstName: data.data.first_name,
            lastName: data.data.last_name,
            image: data.data.display_image,
          };

          // Existing users ke load koro

          // Check koro jei user already ache ki na
          const userExists = existingUsers.some(
            (user) => user.email === safeUserData.email
          );

          if (!userExists) {
            existingUsers.push(safeUserData);

            localStorage.setItem("users", JSON.stringify(existingUsers));
            setLoggedInUsers(existingUsers);
          }
        } else {
          // navigate("/signup-details");
        }
      });
    }
  }, [token, updated, refetch, existingUsers]);

  useEffect(() => {
    if (userData.user_email) {
      axios
        .get(backendUrl + "check-requested/" + userData.user_email)
        .then(({ data }) => setFoundRequested(data));
    }
  }, [userData, refetch]);

  const [planStore, setPlanStore] = useState({
    planName: userData.yearlyPlanStartDate?.length
      ? "Yearly Plan"
      : location.search?.split("?")[1],
    price: userData.yearlyPlanStartDate
      ? 249900
      : location.search?.split("?")[2],
  });

  useEffect(() => {
    axios
      .get("https://ipinfo.io/103.111.225.127?token=1ea4859427fd67")
      .then(({ data }) => setCountry(data.country));
  }, []);

  // useEffect(() => {
  //   // Initialize Lenis
  //   const lenis = new Lenis({
  //     autoRaf: true,
  //     lerp: 0.1,
  //   });

  //   // Listen for the scroll event and log the event data
  //   lenis.on("scroll", (e) => {
  //     console.log(e);
  //   });
  // }, []);

  // Fetch dollar rate when country changes
  useEffect(() => {
    const fetchDollarRate = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/INR"
        );
        const data = await response.json();
        setDollarRate(data.rates.USD);
      } catch (error) {
        console.error("Error fetching dollar rate:", error);
      }
    };

    if (userData.billing_country !== "India") {
      fetchDollarRate();
    }
  }, [userData.billing_country]);

  useEffect(() => {
    /* Working api calls ends here */
    setPlanStore({
      planName: userData.yearlyPlanStartDate?.length
        ? "Yearly Plan"
        : location.search?.split("?")[1],
      price: userData.yearlyPlanStartDate
        ? 249900
        : location.search?.split("?")[2],
    });
  }, [userData]);

  /* Working api calls ends here */

  useEffect(() => {
    axios
      .get(`${currencyAPI}?base=INR`)
      .then(({ data }) => setCurrencies(data.rates.USD));

    // const lenis = new Lenis();

    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);

    // return () => {
    //   // Clean up
    //   lenis.destroy();
    // };
  }, []);

  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <React.Fragment>
      <ScrollToTop />
      {/* <Construction /> */}
      {country === "PK" ? (
        <div className="w-full h-full flex justify-center items-center text-interactive-light-destructive-focus text-heading-5">
          this service is not available for your region
        </div>
      ) : (
        <BrowserRouter>
          <ProfileContext.Provider value={store}>
            <PlanContext.Provider value={{ planStore, setPlanStore }}>
              {location.pathname !== "/login" &&
                location.pathname !== "/signup" &&
                location.pathname !== "/forgot-password" &&
                location.pathname !== "/signup-details" &&
                location.pathname !== "/verify-otp" &&
                !location.pathname.includes("/verify-otp/reset") &&
                !location.pathname.includes("/reset-password") &&
                !location.pathname.includes("payment") &&
                !location.pathname.includes("share") && (
                  <>
                    {/* {store.token && <Sidebar />} */}
                    {<Navbar />}
                  </>
                )}
              <div className={`container lg:px-0`}>
                <Routes>
                  {routes.map(({ page, path }, key) => (
                    <Route key={key} path={path} element={page} />
                  ))}
                </Routes>
              </div>
              <ToastContainer />
            </PlanContext.Provider>
          </ProfileContext.Provider>
        </BrowserRouter>
      )}

      <div id="modal-root"></div>
    </React.Fragment>
  );
}

export default App;
