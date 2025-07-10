import { useState } from "react";
import Button from "../ui/Button";

type NewMessageParams = {
  recipient: string;
  firstMessage: boolean;
  conversationId: number;
};

const NewMessage = ({
  recipient,
  firstMessage,
  conversationId,
}: NewMessageParams) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageSent(false);
    const sender = localStorage.getItem("username");
    if (!recipient || !localStorage.getItem("token") || !sender) {
      setError("Message must have a recipient!");
      return;
    }

    if (recipient === sender) {
      setError(
        `Talking to yourself is a sign of madness you know? Error: Can't send message to self`
      );
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
        setError("Failed to send message.");
        return;
      }

      setMessage("");
      setError("");
      setMessageSent(true);
    } catch {
      setError("Network error. Please try again.");
    }
  };

  if (messageSent) {
    return <span className="text-center text-xl">Message sent!</span>;
  }

  return (
    <>
      {error && (
        <span className="mb-2 bg-red-300 p-1 rounded">
          <p className="text-center text-pretty">{error}</p>
        </span>
      )}
      <form className="w-full" onSubmit={handleSubmit}>
        <ul className="flex gap-2 w-full items-center">
          <li className="flex w-full justify-end items-center">
            <label className="hidden" htmlFor="openingMessage">
              Message:
            </label>
            <input
              className="bg-white p-2 w-full rounded-xl max-w-xl"
              type="text"
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
