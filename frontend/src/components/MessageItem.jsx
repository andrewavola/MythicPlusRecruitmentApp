// import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";

function MessageItem({ message, own, otherPFP }) {
  const { profilePicture } = useSelector((state) => state.auth);

  // Check if createdAt is a valid Date object
  // const createdAtDate = isValidDate(message.createdAt) ? new Date(message.createdAt) : null;

  // const formattedTime = createdAtDate
  //   ? formatDistanceToNow(createdAtDate, {
  //       addSuffix: true,
  //     })
  //   : "Invalid Date";

  return (
    <div className={own ? "message" : "message own"}>
      <div className="messageTop">
        <img src={own ? profilePicture : otherPFP} alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      {/* <div className="messageBottom">{formattedTime}</div> */}
    </div>
  );
}

// Function to check if a value is a valid Date object
// function isValidDate(date) {
//   return date instanceof Date && !isNaN(date);
// }

export default MessageItem;
