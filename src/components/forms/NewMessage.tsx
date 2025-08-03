import { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
import Sentiment from "sentiment";

type NewMessageParams = {
  recipient?: string;
  conversationId: number | undefined;
  getConversations: () => void;
};

const NewMessage = ({
  recipient,
  conversationId,
  getConversations,
}: NewMessageParams) => {
  const [message, setMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const sentiment = new Sentiment();
  const tone = Number(sentiment.analyze(message).score.toFixed(0));

  useEffect(() => {
    if (!socketRef.current) {
      const token = localStorage.getItem("token");
      socketRef.current = io("http://localhost:3000", {
        auth: { token },
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected!");
      });

      socketRef.current.on("error", (err) => {
        toast(`❌ ${err.message}`);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    if (conversationId) {
      socket.emit("join conversation", String(conversationId));
    }

    const handler = () => {
      getConversations();
    };
    socket.on("refresh", handler);

    return () => {
      socket.off("refresh", handler);
      if (conversationId) {
        socket.emit("leave conversation", String(conversationId));
      }
    };
  }, [conversationId, getConversations]);

  const sendNewMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!socketRef.current) return;
    const sender = localStorage.getItem("username");

    if (!conversationId) return toast("🚫 Invalid conversation ID");
    if (!sender) return toast("🚫 Can't find token of user to send from");

    socketRef.current.emit("chat message", {
      conversationId: conversationId,
      content: message,
      sender: sender,
    });

    setMessage("");
  };

  const createNewConversation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sender = localStorage.getItem("username");

    if (!sender) return toast("🚫 Can't find token of user to send from");
    if (!recipient) return toast("🚫 Message missing recipient");

    try {
      const response = await fetch(`http://localhost:3000/conversations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender, recipient, content: message }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast(`❌  ${data.message}`);
        return;
      }

      setMessage("");
      getConversations();
    } catch {
      toast("😔 Network error. Please try again.");
    }
  };

  return (
    <>
      <form
        className="w-full"
        onSubmit={conversationId ? sendNewMessage : createNewConversation}
      >
        <ul className="flex gap-2 w-full items-center">
          <li className="flex w-full justify-end items-center">
            <label className="hidden" htmlFor="openingMessage">
              Message:
            </label>
            <input
              className="bg-white p-2 w-full rounded-xl max-w-xl"
              type="text"
              minLength={1}
              maxLength={200}
              placeholder="Aa"
              id="openingMessage"
              name="openingMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </li>
          <li className="text-right">
            <Button type="submit" text="Submit" ariaLabel="Submit" />
          </li>
          <li
            title="Message tone"
            className="absolute top-[-20px] right-[0px] text-2xl"
          >
            {!tone && <span>😐</span>}
            {tone < 0 && <span>😡</span>}
            {tone > 0 && <span>😃</span>}
          </li>
        </ul>
      </form>
    </>
  );
};

export default NewMessage;
