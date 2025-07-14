import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import NewMessage from "../components/forms/NewMessage";
import ProfilePicture from "../components/ui/ProfilePicture";
import Button from "../components/ui/Button";

type Recipient = {
  username: string;
  profile_picture_path: string;
  joined: string;
};

type Conversation = {
  id: number;
  users: User[];
  messages: string[];
  lastMessage: string;
  createdAt: string;
};

type User = {
  username: string;
};

type Message = {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
  conversationId: number;
};

const Conversation = () => {
  const { recipient } = useOutletContext<{ recipient: Recipient }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState("");

  const getConversations = async () => {
    try {
      const response = await fetch("http://localhost:3000/conversations", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        setError("Unable to retrieve conversation");
        return;
      }

      const data = await response.json();

      setConversations(data.conversations);
    } catch {
      setError("Unable to retrieve conversation");
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    const getConversationMessages = async () => {
      const loggedInUsername = localStorage.getItem("username");
      if (!loggedInUsername) {
        setError("No current user found.");
        return;
      }

      const conversationWithRecipientAndUser = conversations.find(
        (conversation) => {
          if (!Array.isArray(conversation.users)) return false;
          const usernames = conversation.users.map(
            (user: User) => user.username
          );
          return (
            usernames.includes(recipient.username) &&
            usernames.includes(loggedInUsername)
          );
        }
      );

      if (!conversationWithRecipientAndUser) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/conversations/${conversationWithRecipientAndUser.id}/messages`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          setError("Unable to retrieve conversation messages *(");
          return;
        }

        const data = await response.json();
        setMessages(data.conversationMessages);
      } catch {
        setError("Unable to retrieve conversation messages");
      }
    };

    if (conversations.length > 0) {
      getConversationMessages();
    }
  }, [conversations, recipient]);

  let conversationId;
  if (messages.length > 0) {
    conversationId = messages[0].conversationId;
  }

  return (
    <div className="flex flex-col justify-between h-full w-full relative">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-xl text-center">
          Conversation with {recipient.username}
        </h2>
        <ProfilePicture
          src={recipient.profile_picture_path}
          alt={recipient.username}
        />
      </div>
      {error && (
        <span className="mb-2 bg-red-300 p-1 rounded">
          <p className="text-center text-pretty">{error}</p>
        </span>
      )}
      <div className="grid grid-cols-[1fr_1fr] auto-rows-max w-full gap-3 py-8 px-4">
        {messages &&
          messages.map((message, index) => {
            return (
              <div
                key={index}
                className={`bg-lime-200 px-3 py-2 rounded-xl w-fit ${
                  message.authorName === recipient.username
                    ? "bg-lime-300 col-start-1 col-span-2 max-w-[50%]"
                    : `bg-lime-200 col-start-2`
                }`}
              >
                <span className="text-blue-500">{message.authorName}</span>
                <hr className="text-blue-500" />
                <p>{message.content}</p>
              </div>
            );
          })}
      </div>
      <div className="sticky gap-2 bottom-0 flex">
        <NewMessage
          recipient={recipient.username ?? ""}
          conversationId={conversationId}
          getConversations={getConversations}
        />
        <Button
          icon="faArrowsRotate"
          customStyle="flex bg-lime-600 text-white p-2 justify-center items-center rounded-xl z-2 top-0 right-0 hover:cursor-pointer hover:bg-lime-500"
          ariaLabel="Refresh Conversation / Send and Receive messages"
          func={getConversations}
        />
      </div>
    </div>
  );
};

export default Conversation;
