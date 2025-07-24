import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { socket } from "../../utils/socketClient";

type NewMessageParams = {
  recipient: string;
  conversationId: number | undefined;
  getConversations: () => void;
};

const NewMessage = ({
  recipient,
  conversationId,
  getConversations,
}: NewMessageParams) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = () => {
      getConversations();
    };
    socket.on("refresh", handler);

    return () => {
      socket.off("refresh", handler);
    };
  }, [getConversations]);

  const sendNewMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat message", {
      conversationId: conversationId,
      content: message,
      sender: localStorage.getItem("username"),
    });

    setMessage("");
  };

  const createNewConversation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sender = localStorage.getItem("username");
    if (!recipient || !localStorage.getItem("token") || !sender) {
      toast("🚫 Message must have a recipient");
      return;
    }

    if (recipient === sender) {
      toast(`🚫 Can't send message to self`);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/conversations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender, recipient, openingMessage: message }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast("🚫 Failed to send message.");
        toast(data.message);
        return;
      }

      setMessage("");
      setError("");
      getConversations();
    } catch {
      toast("😔 Network error. Please try again.");
    }
  };

  return (
    <>
      {error && (
        <span className="mb-2 bg-red-300 p-1 rounded">
          <p className="text-center text-pretty">{error}</p>
        </span>
      )}
      <form
        className="w-full"
        onSubmit={conversationId ? sendNewMessage : createNewConversation}
      >
        <ul className="flex gap-2 w-full items-center mt-6">
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
        </ul>
      </form>
    </>
  );
};

export default NewMessage;
