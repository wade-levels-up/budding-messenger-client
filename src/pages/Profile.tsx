import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../components/ui/Button";
import ProfilePicture from "../components/ui/ProfilePicture";
import defaultProfilePicture from "../assets/default_profile_picture.jpg";
import UpdatePictureModal from "../components/ui/UpdatePictureModal";

type UserData = {
  username: string;
  bio: string;
  joined: string;
  profile_picture_path: string;
};

const Profile = () => {
  const { userData, getUserData } = useOutletContext<{
    userData: UserData;
    getUserData: () => void;
  }>();
  const { username, bio, profile_picture_path } = userData;
  const [updatingBio, setUpdatingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [error, setError] = useState("");
  const [updatingPic, setUpdatingPic] = useState(false);

  useEffect(() => {
    if (bio) {
      setNewBio(bio);
    }
  }, [bio]);

  const handleBioInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  const handleBioFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <h2 className="text-center text-xl">Profile Page</h2>
      <UpdatePictureModal
        error={error}
        getUserData={getUserData}
        setError={setError}
        updatingPic={updatingPic}
        setUpdatingPic={setUpdatingPic}
      />
      <div className="flex flex-col w-full max-w-[55ch] lg:flex-row items-center lg:items-start gap-6 p-3">
        <div className="relative">
          <ProfilePicture
            src={
              profile_picture_path
                ? `${profile_picture_path}?t=${Date.now()}` // Cache-busting string - adding Date as a query parameter force retrieval of the updated file
                : defaultProfilePicture
            }
            alt={`${username}'s Profile Picture`}
          />
          <div className="p-2 flex absolute z-2 right-1 bottom-3 items-center justify-end rounded-xl">
            <Button
              icon="faCamera"
              func={() => {
                setUpdatingPic(true);
              }}
              ariaLabel="Update Profile Picture"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between bg-lime-200 rounded-xl p-3 items-center">
            <h3 className="text-xl">Bio</h3>
            {!updatingBio && (
              <Button
                func={() => setUpdatingBio(!updatingBio)}
                ariaLabel="Update Bio"
                icon="faPen"
              />
            )}
          </div>
          {updatingBio ? (
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
                  <Button
                    icon="faCheck"
                    type="submit"
                    ariaLabel="Submit Changes"
                  />
                </li>
              </ul>
            </form>
          ) : (
            <p className="p-2 text-pretty">
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
