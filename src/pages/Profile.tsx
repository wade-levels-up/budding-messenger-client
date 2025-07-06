import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../components/ui/Button";

type UserData = {
  username: string;
  bio: string;
  joined: string;
  profile_picture_path: string;
};

const Profile = () => {
  const [userData, getUserData] = useOutletContext<[UserData, () => void]>();
  const { username, bio, profile_picture_path } = userData;
  const [updatingBio, setUpdatingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (bio) {
      setNewBio(bio);
    }
  }, [bio]);

  const handleBioInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/me/bio", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newBio }),
    });

    if (!response.ok) {
      setError(`Unable to update Bio`);
      return;
    }

    setUpdatingBio(false);
    getUserData();
  };

  return (
    <>
      <h2 className="text-center">{username}'s Profile Page</h2>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 p-3">
        <div className="relative">
          <img
            className="border-inset border-3 border-lime-200 shadow-md max-w-[300px]"
            src={
              profile_picture_path || "src/assets/default_profile_picture.jpg"
            }
            alt={`${username}'s Profile Picture`}
          />
          <div className="absolute bottom-[0px] right-[10px]">
            <Button icon="faUserPen" ariaLabel="Update Profile Picture" />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <h3 className="text-xl">Bio</h3>
            <Button
              text="Update Bio"
              func={() => setUpdatingBio(!updatingBio)}
              ariaLabel="Update Bio"
              icon="faPen"
            />
          </div>
          <hr />
          {updatingBio ? (
            <form onSubmit={handleFormSubmit}>
              <ul>
                <li>
                  <label htmlFor="bio"></label>
                  <textarea
                    name="bio"
                    id="bio"
                    placeholder="Tell us about yourself"
                    rows={5}
                    cols={30}
                    value={newBio}
                    onChange={handleBioInput}
                  ></textarea>
                </li>
                {error && (
                  <li className="mb-2 bg-red-300 p-1 rounded">
                    <p className="text-center text-pretty">{error}</p>
                  </li>
                )}
                <li className="text-center">
                  <Button text="Submit" type="submit" ariaLabel="Submit" />
                </li>
              </ul>
            </form>
          ) : (
            <p>
              {bio ||
                `Hmm... Looks like you haven't written a Bio yet. Click Update Bio to write one!`}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
