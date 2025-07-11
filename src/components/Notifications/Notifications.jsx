import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, refetch } = useContext(ProfileContext);
  const [modifiedCount, setModifiedCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer visibility
  const navigate = useNavigate();

  useEffect(() => {
    setError(null); // Reset error state on component mount or token change
    const config = {
      headers: { token },
    };

    axios
      .get(`${backendUrl}notifications`, config)
      .then(({ data }) => {
        setNotifications(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch notifications.");
        setLoading(false);
        navigate("/login");
      });

    // Cleanup on unmount
    return () => {
      setLoading(false);
    };
  }, [refetch]);

  const markAsRead = (_id, notification) => {
    if (!notification.read) {
      delete notification._id;
      notification.read = true;

      axios
        .put(backendUrl + "notifications/" + _id, notification)
        .then(({ data }) =>
          setModifiedCount(modifiedCount + data.modifiedCount)
        );
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle the drawer visibility
  };

  return (
    <>
      {/* Notification Drawer Button */}
      <button
        onClick={toggleDrawer}
        className="fixed top-4 right-4 p-3 rounded-full bg-primary text-white shadow-lg"
      >
        Notifications
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-dark-gray transition-transform duration-300 ease-in-out ${
          isDrawerOpen
            ? "transform translate-x-0"
            : "transform translate-x-full"
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="flex justify-between text-white p-4">
          <h4 className="text-heading-4-bold">Notifications</h4>
          <button onClick={toggleDrawer} className="text-white">
            Close
          </button>
        </div>

        {loading ? (
          <p>Loading notifications...</p>
        ) : error ? (
          <p>{error}</p>
        ) : notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-1 p-4">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className={`text-paragraph-1 p-1 rounded cursor-pointer flex text-white gap-1 ${
                  notification.read ? "shadow-none" : "shadow-xl"
                }`}
                onClick={() => markAsRead(notification._id, notification)}
              >
                <div
                  className={`aspect-square rounded-full h-1 ${
                    notification.read
                      ? "bg-interactive-light-disabled"
                      : "bg-interactive-light"
                  }`}
                ></div>
                <div className="flex justify-between w-full">
                  <div
                    dangerouslySetInnerHTML={{ __html: notification.message }}
                    className="flex-grow"
                  ></div>
                  <div>
                    {new Date(notification.date * 1000).getDate() > 9 ? "" : 0}
                    {new Date(notification.date * 1000).getDate()}/
                    {new Date(notification.date * 1000).getMonth() > 8 ? "" : 0}
                    {new Date(notification.date * 1000).getMonth() + 1}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Notifications;
