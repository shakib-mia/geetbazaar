import axios from "axios";
import { useState, useRef, useEffect, useContext } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { backendUrl } from "../../constants";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { ProfileContext } from "../../contexts/ProfileContext";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // [{request, response}]
  const messagesEndRef = useRef(null);
  const [query, setQuery] = useState("");
  const { token } = useContext(ProfileContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    axios
      .get(backendUrl + "chat/history", {
        headers: { token },
      })
      .then(({ data }) => {
        setMessages(data);
      });
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = e.target.request.value.trim();
    if (!userMessage) return;

    // Add user message
    setMessages((prev) => [...prev, { request: userMessage, response: "..." }]);
    e.target.reset();

    try {
      // Fetch preprocessed JSON from backend
      const { data: projectData } = await axios.post(
        backendUrl + "chat/context",
        {
          message: userMessage,
        }
      );

      // console.log("Project Data: ", projectData);

      if (!projectData[0]) throw new Error("Empty project data");

      // For small model: combine JSON as single context
      const context = JSON.stringify(projectData[0]); // full project JSON as string
      console.log(context);

      // Prepare simplified prompt
      const prompt = `You are a GeetBazaar-only assistant. Use the following JSON project data to answer **upload-related questions only**.

Project JSON:
${JSON.stringify(projectData[0])}

RULES:
1. If the user's question is about uploading songs or albums, generate a **complete step-by-step guide** covering ALL pages and fields in the JSON (Album Details, Platforms, Audio, Preview, Distribution).
2. **Rephrase instructions** each time; do not copy exact sentences from "startInstruction".
3. Handle **conditional fields** correctly (e.g., if Content Type is Film, include Film Banner, Producer, Actor, Director, Release Date; if album, include Add More and Finish buttons; if single, skip album-only fields).
4. Include **all details for fields**: file uploads, dropdown selections, text inputs, multi-selects, buttons, checkboxes, etc.
5. Maintain **step-by-step numbered format**.
6. If the user's question is **unrelated to JSON or uploading**, reply: "I can only answer GeetBazaar upload questions."
7. NEVER mention external websites, links, or general instructions outside this JSON.

User Question:
${userMessage}
`;

      // Send single request to Ollama 0.5B
      const response = await fetch("http://localhost:11434/v1/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "phi3:mini",
          prompt,
          max_tokens: 700,
          temperature: 0,
        }),
      });

      if (!response.ok) throw new Error("Model API error");

      const data = await response.json();
      const botResponse = data?.choices?.[0]?.text?.trim() || "No answer";

      // Update last message with bot response
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].response = botResponse;
        return updated;
      });
    } catch (err) {
      console.error("Chat error:", err.message);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].response =
          "There’s an error. Please try again.";
        return updated;
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("send").click();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Box */}
      {isOpen && (
        <div className="bg-white max-w-[20vw] rounded-2xl shadow-xl w-80 h-96 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-interactive-light text-white px-3 py-2 shadow-lg absolute top-0 left-0 w-full rounded-t-2xl">
            <h2 className="text-sm font-semibold">Chat with us</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:text-gray-200 transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 pt-7 overflow-y-auto bg-surface-white-surface-1 text-sm text-black-secondary space-y-3 max-h-[50vh]">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                Start a conversation...
              </p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className="space-y-2">
                  {/* User Request */}
                  <div className="flex justify-end">
                    <div className="max-w-[70%] bg-interactive-light text-white p-[14px] rounded-[28px] rounded-br-none break-words">
                      {msg.request}
                    </div>
                  </div>

                  {/* Bot Response */}
                  {msg.response && (
                    <div className="flex justify-start">
                      <div className="max-w-[70%] bg-gray-200 text-gray-800 p-[14px] rounded-[28px] rounded-bl-none break-words">
                        {msg.response}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="border-t p-2 flex gap-1 items-center"
          >
            {/* <textarea
              name="request"
              placeholder="Type a message..."
              required
              className="flex-1 resize-none text-sm px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-light"
              onKeyDown={handleKeyDown}
              onChange={(e) => setQuery(e.target.value)}
            /> */}
            <InputField
              textarea
              className="resize-none border rounded-lg border-interactive-light-disabled p-2"
              placeholder="Type a message..."
              name="request"
              onKeyDown={handleKeyDown}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              id="send"
              disabled={!query.length}
              type="submit"
              className="px-2 !py-1 !mt-0 bg-interactive-light text-white rounded-lg text-sm hover:bg-interactive-light-dark transition-colors"
            >
              Send
            </Button>
            {/* <button
              type="submit"
              id="send"
              className="ml-2 bg-interactive-light text-white px-3 py-2 rounded-lg text-sm hover:bg-interactive-light-dark transition-colors"
            >
              Send
            </button> */}
          </form>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-interactive-light text-white rounded-full w-5 h-5 hover:w-[96px] px-2 hover:aspect-auto shadow-lg hover:bg-interactive-light-dark transition-all duration-500 flex items-center overflow-hidden"
        >
          <FiMessageCircle
            size={22}
            className="transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
          />
          <span className="ml-0 w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-out group-hover:ml-1 group-hover:w-[40px] group-hover:opacity-100">
            Chat
          </span>
        </button>
      )}
    </div>
  );
}
