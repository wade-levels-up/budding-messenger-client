import { useState, useEffect } from "react";
import type { ConversationData } from "../types/types";
import { toast } from "react-toastify";

const GroupConversations = () => {
  const [conversations, setConversations] = useState<ConversationData[]>([]);

  const getConversations = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/conversations/group_conversation",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok) {
        toast("Unable to retrieve conversation");
        return;
      }

      const data = await response.json();

      setConversations(data.conversations);
    } catch {
      toast("Unable to retrieve conversation");
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  const conversationCardStyle =
    "hover:cursor-pointer text-white bg-blue-500 px-2 py-1 rounded-lg";

  return (
    <>
      <h2>Group Conversations</h2>
      <ul className="flex flex-wrap w-full">
        {conversations.map((c, index) => (
          <li className={conversationCardStyle} key={index}>
            {c.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default GroupConversations;
