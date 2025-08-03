import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import NewMessage from "../components/forms/NewMessage";
import ProfilePicture from "../components/ui/ProfilePicture";
import Message from "../components/ui/Message";
import Sentiment from "sentiment";
import type { ConversationData, MessageData } from "../types/types";

const Conversation = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [conversations, setConversations] = useState<ConversationData[]>([]);

  // Extract query params from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const recipient = query.get("recipient");
  const profilePictureFromQuery = query.get("profilePicture");

  const navigate = useNavigate();

  const loggedInUsersName = localStorage.getItem("username");
  let conversationId: number | undefined = undefined;

  // Conversation ID is set by the conversation ID off retrieved messages
  if (messages.length > 0) {
    conversationId = messages[0].conversationId;
  }

  const getConversations = async () => {
    try {
      if (recipient) {
        const response = await fetch(
          `http://localhost:3000/conversations/${recipient}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) return toast("🚫 Unable to retrieve conversation");
        const data = await response.json();
        setConversations(data.conversations);
      }
    } catch {
      toast("🚫 Unable to retrieve conversation");
    }
  };

  useEffect(() => {
    getConversations();
  }, [recipient]);

  useEffect(() => {
    const getConversationMessages = async () => {
      if (!loggedInUsersName) return toast("🚫 No user found.");
      if (!recipient) return navigate("/dashboard");

      try {
        const response = await fetch(
          `http://localhost:3000/conversations/${conversations[0].id}/messages`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          toast("🚫 Unable to retrieve conversation messages");
          return;
        }

        const data = await response.json();
        setMessages(data.conversationMessages);
      } catch {
        toast("🚫 Unable to retrieve conversation messages");
      }
    };

    if (conversations.length > 0) {
      getConversationMessages();
    }
  }, [conversations, recipient, navigate, loggedInUsersName]);

  // Scrolls to end of messages
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Message Analysis & Tree Handling
  const sentiment = new Sentiment();
  let tone = 0;
  const setConversationTone = () => {
    const messageScores: number[] = [];
    messages.forEach((message) => {
      messageScores.push(
        Number(sentiment.analyze(message.content).score.toFixed(0))
      );
    });
    let totalScore = 0;
    messageScores.forEach((score) => (totalScore += score));
    tone = totalScore / messages.length;
  };
  setConversationTone();

  let treeLevel = 10;
  const setTreeLevel = () => {
    if (tone > 0.5) {
      if (messages.length < 20) treeLevel = 10;
      if (messages.length >= 20) treeLevel = 20;
      if (messages.length >= 40) treeLevel = 40;
      if (messages.length >= 80) treeLevel = 80;
      if (messages.length >= 160) treeLevel = 160;
    } else {
      treeLevel = 10;
    }
  };
  setTreeLevel();

  return (
    <>
      <div className="absolute opacity-40 h-[200px] flex justify-center top-[50%] items-end">
        <img
          src={`../../src/assets/tree${treeLevel}.png`}
          alt=""
          width="auto"
        />
      </div>
      <div
        onLoad={() => window.scrollTo(0, document.body.scrollHeight)}
        className="flex flex-col justify-between h-full w-full max-w-[800px] relative"
      >
        {/* If one on one Conversation - display recipient details */}
        {recipient && (
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-xl text-center">
              Conversation with {recipient}
            </h2>
            <ProfilePicture
              src={
                profilePictureFromQuery ||
                "/src/assets/default_profile_picture.jpg"
              }
              alt={recipient || "Profile picture"}
            />
          </div>
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
        <div className="sticky p-3 rounded-xl shadow-md bg-lime-400/10 backdrop-blur-xs gap-2 bottom-0 flex items-center justify-center">
          <NewMessage
            recipient={recipient ?? ""}
            conversationId={conversationId}
            getConversations={getConversations}
          />
        </div>
      </div>
    </>
  );
};

export default Conversation;
