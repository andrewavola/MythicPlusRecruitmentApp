import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMessage } from "../features/messages/messageSlice";
function MessageForm({ conversation, sender }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    const convData = {
      conversationID: conversation,
      sender: sender,
      text: message,
    };

    dispatch(createMessage(convData));
    setMessage("");
  };

  const isSendButtonDisabled = message.trim() === "";
  return (
    <div className="chatBoxBottom">
      <textarea
        className="chatMessageInput"
        placeholder="Send a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div id=""></div>
      <button
        type="submit"
        className="chatSubmitButton"
        onClick={sendMessage}
        disabled={isSendButtonDisabled}
      >
        Send
      </button>
    </div>
  );
}

export default MessageForm;
