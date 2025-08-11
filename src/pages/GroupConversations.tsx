import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ConversationData } from "../types/types";
import { toast } from "react-toastify";

const GroupConversations = () => {
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const navigate = useNavigate();

  const getConversations = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/conversations/group_conversation`,
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
    "flex justify-between items-center hover:cursor-pointer hover:bg-blue-300 w-full text-white bg-blue-500 px-2 py-1 rounded-lg";

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
            <li
              className={conversationCardStyle}
              key={index}
              onClick={() => {
                navigate(`/dashboard/conversation/?name=${c.name}`);
              }}
            >
              <span>{c.name}</span>
              <div className="flex -space-x-2">
                {c.users.map((u, index) => {
                  return (
                    <img
                      key={index}
                      className={`rounded-full w-[32px] lg:w-[38px] bg-white border-3 border-blue-500`}
                      src={
                        u.profile_picture_path || "/default_profile_picture.jpg"
                      }
                      alt={u.username}
                      title={u.username}
                    />
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GroupConversations;
