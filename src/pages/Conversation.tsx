import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import NewMessage from "../components/forms/NewMessage";
import ProfilePicture from "../components/ui/ProfilePicture";

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

  useEffect(() => {
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
        setError("No conversation found.");
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

  const firstMessage = messages.length > 0;

  return (
    <div className="flex flex-col justify-between h-full w-full">
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
      {messages &&
        messages.map((message) => (
          <p>
            {message.authorName}: {message.content}
          </p>
        ))}
      <NewMessage
        recipient={recipient.username ?? ""}
        firstMessage={firstMessage}
        conversationId={messages[0].conversationId}
      />
    </div>
  );
};

export default Conversation;
