import { useEffect, useState, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import NewMessage from "../components/forms/NewMessage";
import ProfilePicture from "../components/ui/ProfilePicture";
import Message from "../components/ui/Message";

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
  console.log("Conversation component mounted");
  const { recipient } = useOutletContext<{ recipient: Recipient }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loggedInUsersName = localStorage.getItem("username");
  let conversationId: number | undefined = undefined;

  if (messages.length > 0) {
    conversationId = messages[0].conversationId;
  }

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

      if (!recipient.username) {
        navigate("/dashboard");
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
  }, [conversations, recipient, navigate]);

  // Scrolls to end of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      onLoad={() => window.scrollTo(0, document.body.scrollHeight)}
      className="flex flex-col justify-between h-full w-full relative"
    >
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
      <div className="flex flex-col w-full gap-3 py-4 px-2">
        {messages &&
          messages.map((message, index) => {
            return (
              <div
                key={index}
                className={`flex w-full grow ${
                  loggedInUsersName === message.authorName && "justify-end"
                }`}
              >
                <Message
                  authorName={message.authorName}
                  content={message.content}
                />
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky gap-2 bottom-0 flex">
        <NewMessage
          recipient={recipient.username ?? ""}
          conversationId={conversationId}
          getConversations={getConversations}
        />
      </div>
    </div>
  );
};

export default Conversation;
