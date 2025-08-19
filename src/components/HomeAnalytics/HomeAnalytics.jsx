import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomeAnalytics = () => {
  const [data, setData] = useState([]);

  const { token, setToken } = useContext(ProfileContext);
  const navigate = useNavigate();
  // console.log(userData);
  useEffect(() => {
    const config = {
      headers: {
        token,
      },
    };
    axios
      .get(backendUrl + "user-revenue/monthly", config)
      .then(({ data }) => setData(data.lifetimeRevenue))
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login");
          setToken("");
          toast.error("Token has expired", {
            position: "bottom-center",
          });
        }
      });
  }, []);

  return (
    <div className="card-shadow rounded-lg p-2 pl-0">
      <h4 className="text-heading-6-bold lg:text-heading-4-bold capitalize text-black mb-2 pl-3 text-center lg:text-left">
        Month wise revenue
      </h4>
      <div className={"lg:!mr-3 ml-3 lg:ml-0 h-[200px] lg:h-[250px]"}>
        <ResponsiveContainer height={"100%"}>
          <LineChart data={data} className="w-full">
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="month" />
            {window.innerWidth > 905 ? <YAxis /> : <></>} <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#2B52DD"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HomeAnalytics;
