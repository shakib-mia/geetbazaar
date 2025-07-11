import React, { useState } from "react";
import chat from "./../../assets/icons/chat.webp";
import avatar from "../../assets/icons/avatar.webp";
import sendIcon from "../../assets/icons/send-icon.webp";

const Chat = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    if (e.target.chat.value.trim() !== "") {
      const newMessage = {
        id: new Date().getTime(),
        content: e.target.chat.value,
        timestamp: new Date().toLocaleString(),
        type: "query",
      };
      setMessages([...messages, newMessage]);
    }

    document.getElementById("messageSection").scrollTop = 1500;
    // console.log(document.getElementById("messages").offsetHeight);
    e.target.reset();
  };

  return (
    <div
      className="fixed bottom-4 z-[9999] right-4"
      onMouseEnter={() => setShowChatBox(true)}
      // onMouseLeave={() => setShowChatBox(false)}
    >
      {/* <div className="relative"> */}
      <img src={chat} alt="chat" className="cursor-pointer" />

      {showChatBox && (
        <div className="relative" onMouseLeave={() => setShowChatBox(false)}>
          <div
            className="absolute px-3 py-2 bottom-0 right-0 w-[376px] h-[327px] bg-grey-light shadow-lg rounded-3xl overflow-y-auto"
            id="messageSection"
          >
            <div className="relative h-full">
              {/* messages */}

              <div className="pb-6" id="messages">
                {messages.map(({ content }, id) => (
                  <p
                    key={id}
                    className="bg-primary mt-1 p-1 rounded-full text-white w-fit ml-auto"
                  >
                    {content}
                  </p>
                ))}
              </div>
              {/* input */}
              <div className="fixed bottom-5 w-full">
                <div className="w-fit">
                  <form
                    onSubmit={submit}
                    className="bg-white p-1 w-[114%] rounded-full flex justify-between items-center"
                  >
                    <img src={avatar} alt="" />
                    <input
                      type="text"
                      name="chat"
                      className="w-full px-1 focus:outline-none"
                    />
                    <label htmlFor="input">
                      <img src={sendIcon} alt="" />
                    </label>
                    <input type="submit" className="hidden" id="input" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
