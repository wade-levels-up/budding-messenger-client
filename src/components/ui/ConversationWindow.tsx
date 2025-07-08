import NewMessage from "../forms/NewMessage";
import { useLocation } from "react-router-dom";

const ConversationWindow = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const recipient = params.get("recipient");

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <h2 className="text-xl text-center">New Message to {recipient}</h2>
      <NewMessage />
    </div>
  );
};

export default ConversationWindow;
