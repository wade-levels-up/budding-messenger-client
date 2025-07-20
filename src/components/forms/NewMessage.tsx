import { useState } from "react";
import Button from "../ui/Button";
import { toast } from "react-toastify";

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
        toast("🚫 Failed to send message.");
        return;
      }

      setMessage("");
      setError("");
    } catch {
      toast("😔 Network error. Please try again.");
    }
  };

  const createNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sender = localStorage.getItem("username");
    if (!recipient || !localStorage.getItem("token") || !sender) {
      toast("🚫 Message must have a recipient");
      return;
    }

    if (message.length < 1) {
      toast("🚫 Message must be at least 1 character long");
      return;
    }

    if (recipient === sender) {
      toast(`🚫 Can't send message to self`);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sender, content: message }),
        }
      );

      if (!response.ok) {
        setError("Failed to send message.");
        return;
      }

      setMessage("");
      setError("");
      getConversations();
    } catch {
      setError("Network error. Please try again.");
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
        onSubmit={conversationId ? createNewMessage : createNewConversation}
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
