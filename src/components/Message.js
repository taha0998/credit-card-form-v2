import { useState } from "react";
import Loading from "./Loading";

const Message = ({ isLoading, setIsLoading }) => {
  const [messageContent, setMessageContent] = useState(
    "Please enter your credit card details"
  );
  return (
    <div className="message-container">
      {isLoading ? (
        <Loading setIsLoading={setIsLoading} setMessageContent={setMessageContent} />
      ) : (
        <h3>{messageContent}</h3>
      )}
    </div>
  );
};

export default Message;
