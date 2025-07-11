import axios from "axios";
import React, { useContext, useEffect } from "react";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";

const NotificationSidebar = ({
  setNotificationDropdownOpen,
  notificationDropdownOpen,
}) => {
  const { token, refetch } = useContext(ProfileContext);
  const [notifications, setNotifications] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: { token },
    };

    axios
      .get(`${backendUrl}notifications`, config)
      .then(({ data }) => {
        setNotifications(data.reverse());
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [refetch, token, navigate]);

  // Mark a notification as read
  const markAsRead = (_id, notification) => {
    if (!notification.read) {
      notification.read = true;
      delete notification._id;

      axios
        .put(backendUrl + "notifications/" + _id, notification)
        .then(({ data }) => console.log(data));
    }
  };

  const markAllAsRead = (_id, notification) => {
    notifications.map((notification) =>
      markAsRead(notification._id, notification)
    );
  };

  return (
    <>
      <div
        onClick={() => setNotificationDropdownOpen(false)} // Close dropdown when clicking the backdrop
        className={`fixed inset-0 bg-[#000] z-[99999] w-screen h-screen transition-opacity hidden lg:block ${
          notificationDropdownOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed block ${
          notificationDropdownOpen ? "right-0" : "-right-full"
        } transition-[right] top-0 w-[500px] h-screen bg-gray-800 text-white shadow-lg rounded-lg overflow-y-auto overflow-x-hidden z-[999999]`}
      >
        <div className="flex justify-end p-1">
          <button
            className="bg-interactive-light text-white p-1 rounded disabled:bg-interactive-light-disabled disabled:cursor-not-allowed"
            onClick={markAllAsRead}
            disabled={notifications.every((notification) => notification.read)}
          >
            mark all as read
          </button>
        </div>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-700 flex gap-1 items-center ${
                notification.read ? "opacity-50" : "opacity-100"
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
                  {new Date(notification.date * 1000).getMonth() + 1}/
                  {new Date(notification.date * 1000)
                    .getFullYear()
                    .toString()
                    .slice(-2)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-2">No new notifications</div>
        )}
      </div>
    </>
  );
};

export default NotificationSidebar;
