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
    "hover:cursor-pointer hover:bg-blue-300 w-full text-white bg-blue-500 px-2 py-1 rounded-lg";

  return (
    <>
      <div className="bg-white/10 flex flex-col items-center gap-2 rounded-xl shadow-2xl pt-2 pb-4 px-3 w-full max-w-[800px]">
        <h2 className="text-lg text-center">Group Chats</h2>
        {conversations.length > 0 ? (
          <h3>Click to enter chat</h3>
        ) : (
          <p>Looks like you don't have any group chats yet!</p>
        )}
        <ul className="flex max-w-[400px] flex-col gap-2 w-full">
          {conversations.map((c, index) => (
            <li className={conversationCardStyle} key={index}>
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GroupConversations;
