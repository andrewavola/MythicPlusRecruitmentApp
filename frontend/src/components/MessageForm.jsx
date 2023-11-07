import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../features/messages/messageSlice";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MessageForm({ conversation, sender, receiver, socket }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("")
  const {_id} = useSelector((state) => state.auth.user)
 


  const sendMessage = (e) => {
    e.preventDefault()

    const convData = {
      conversationID: conversation,
      sender: sender,
      text: message,
    }
    socket.current.emit("sendMessage", {
      conversationID: conversation,
      sender: sender,
      receiverId: receiver,
      text: message,
    })

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
      <ToastContainer/>
    </div>
  );
}

export default MessageForm;
