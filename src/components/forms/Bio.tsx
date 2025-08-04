import { useState, useEffect } from "react";
import Button from "../ui/Button";

type BioParams = {
  userBio: string;
  getUserData: () => void;
  setUpdatingBio: (value: boolean) => void;
};

const Bio = ({ userBio, getUserData, setUpdatingBio }: BioParams) => {
  const [error, setError] = useState("");
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    if (userBio) {
      setNewBio(userBio);
    }
  }, [userBio]);

  const handleBioInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  const handleBioFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/me/bio`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newBio }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      setError(`${data.message}`);
      return;
    }

    setUpdatingBio(false);
    getUserData();
  };

  return (
    <>
      <form onSubmit={handleBioFormSubmit} className="flex grow">
        <ul className="w-full">
          <li className="w-full">
            <label htmlFor="bio"></label>
            <textarea
              name="bio"
              id="bio"
              placeholder="Tell us about yourself"
              rows={8}
              value={newBio}
              onChange={handleBioInput}
              className="bg-white p-2 w-full"
            ></textarea>
          </li>
          {error && (
            <li className="mb-2 bg-red-300 p-1 rounded">
              <p className="text-center text-pretty">{error}</p>
            </li>
          )}
          <li className="flex flex-row gap-1 justify-end p-2">
            <Button
              icon="faXmark"
              func={() => setUpdatingBio(false)}
              ariaLabel="Cancel"
            />
            <Button icon="faCheck" type="submit" ariaLabel="Submit Changes" />
          </li>
        </ul>
      </form>
    </>
  );
};

export default Bio;
