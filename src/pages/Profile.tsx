import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../components/ui/Button";
import ProfilePicture from "../components/ui/ProfilePicture";
import defaultProfilePicture from "../assets/default_profile_picture.jpg";
import UpdatePictureModal from "../components/ui/UpdatePictureModal";
import Bio from "../components/forms/Bio";

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
  const [updatingPic, setUpdatingPic] = useState(false);
  const [error, setError] = useState("");

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
            <Bio
              userBio={bio}
              getUserData={getUserData}
              setUpdatingBio={setUpdatingBio}
            />
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
