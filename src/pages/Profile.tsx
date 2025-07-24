import { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import ProfilePicture from "../components/ui/ProfilePicture";
import defaultProfilePicture from "../assets/default_profile_picture.jpg";
import UpdatePictureModal from "../components/ui/UpdatePictureModal";
import Bio from "../components/forms/Bio";
import { format } from "date-fns";

type UserData = {
  username: string;
  bio: string;
  joined: string;
  profile_picture_path: string;
  friends: UserData[];
};

const Profile = () => {
  const { userData, getUserData } = useOutletContext<{
    userData: UserData;
    getUserData: () => void;
  }>();
  console.log(userData);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const queryUsername = query.get("username");

  const { username, bio, profile_picture_path } = userData;
  const [anotherUsersData, setAnotherUsersData] = useState<UserData | null>(
    null
  );
  const [updatingBio, setUpdatingBio] = useState(false);
  const [updatingPic, setUpdatingPic] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!queryUsername) {
      setAnotherUsersData(null);
      return;
    }

    const getAnotherUsersData = async () => {
      setAnotherUsersData(null);

      const response = await fetch(
        `http://localhost:3000/users/${queryUsername}`
      );

      if (!response.ok) {
        setError("Unable to retrieve profile information");
        return;
      }

      const data = await response.json();
      if (!data.userData) {
        setError("Unable to retrieve profile information");
        return;
      }

      setAnotherUsersData(data.userData);
    };

    getAnotherUsersData();
  }, [queryUsername]);

  return (
    <>
      <div className="flex flex-col items-start max-w-[800px] w-full p-3">
        <h2 className="text-center text-xl w-full">
          {anotherUsersData && `${anotherUsersData.username}'s`} Profile Page
        </h2>
        {!anotherUsersData && (
          <UpdatePictureModal
            error={error}
            getUserData={getUserData}
            setError={setError}
            updatingPic={updatingPic}
            setUpdatingPic={setUpdatingPic}
          />
        )}
        <div className="flex flex-col w-full  lg:flex-row items-center lg:items-start gap-6 py-3">
          <div className="relative">
            {anotherUsersData ? (
              <ProfilePicture
                src={
                  anotherUsersData.profile_picture_path
                    ? `${anotherUsersData.profile_picture_path}?t=${Date.now()}` // Cache-busting string - adding Date as a query parameter force retrieval of the updated file
                    : defaultProfilePicture
                }
                alt={`${anotherUsersData.username}'s Profile Picture`}
              />
            ) : (
              <ProfilePicture
                src={
                  profile_picture_path
                    ? `${profile_picture_path}?t=${Date.now()}` // Cache-busting string - adding Date as a query parameter force retrieval of the updated file
                    : defaultProfilePicture
                }
                alt={`${username}'s Profile Picture`}
              />
            )}
            {!anotherUsersData && (
              <div className="p-2 flex absolute z-2 right-1 bottom-3 items-center justify-end rounded-xl">
                <Button
                  icon="faCamera"
                  func={() => {
                    setUpdatingPic(true);
                  }}
                  ariaLabel="Update Profile Picture"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full bg-lime-200 rounded-xl p-3 items-center">
              <h3 className="text-xl">Bio</h3>
              {!updatingBio && !anotherUsersData && (
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
              <p className="p-2 text-pretty hyphens-auto">
                {anotherUsersData
                  ? anotherUsersData.bio ||
                    `Looks like ${anotherUsersData.username} hasn't written a bio yet...`
                  : bio || `Looks like a bio hasn't been written yet...`}
              </p>
            )}
          </div>
        </div>
        <h4 className="text-xl w-full bg-lime-200 rounded-xl p-3">
          Information
        </h4>
        <div className="p-2">
          <span>
            Joined date:{" "}
            {anotherUsersData
              ? format(new Date(anotherUsersData.joined), "do 'of' MMMM yyyy")
              : format(new Date(userData.joined), "do 'of' MMMM yyyy")}
          </span>
        </div>
      </div>
    </>
  );
};

export default Profile;
