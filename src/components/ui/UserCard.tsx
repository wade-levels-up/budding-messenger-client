import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import defaultProfilePicture from "../../assets/default_profile_picture.jpg";
import Button from "./Button";
import type { Friend, UserData } from "../../types/types";

type UserCardProps = {
  user: Friend;
  friendCard?: boolean;
  auxFn?: (value: Friend) => void | undefined;
  getUsers?: () => void;
};

const userCardStyle =
  "flex w-full max-w-2xs shadow-lg hover:bg-blue-100 hover:cursor-pointer items-center gap-4 border border-lime-500 p-1 rounded-l-full";
const customButtonStyle =
  "bg-lime-600 text-white w-full px-2 hover:bg-lime-500 focus:bg-lime-500 active:bg-lime-500 hover:cursor-pointer transition-colors";

const UserCard = ({ user, friendCard = false, auxFn }: UserCardProps) => {
  const navigate = useNavigate();

  const { getUserData } = useOutletContext<{
    userData: UserData;
    getUserData: () => void;
  }>();

  const addFriend = async (recipient: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/friends/${recipient}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok) {
        return;
      }

      getUserData();
    } catch (error) {
      console.error(error);
    }
  };

  const removeFriend = async (recipient: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/friends/${recipient}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok) {
        return;
      }

      getUserData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <li className={userCardStyle} key={user.username}>
        <img
          className="rounded-full w-24 h-24 object-cover"
          src={
            user.profile_picture_path
              ? `${user.profile_picture_path}?t=${Date.now()}`
              : defaultProfilePicture
          }
        ></img>
        <div className="flex w-full justify-between p-1">
          <span className="flex flex-col justify-center text-blue-500">
            {user.username}
          </span>
          <div className="flex flex-col items-center justify-end gap-2">
            <Button
              icon="faUser"
              ariaLabel={`View ${user.username}'s Profile Page`}
              func={() =>
                navigate(`/dashboard/profile?username=${user.username}`)
              }
              customStyle={customButtonStyle}
            />
            <Button
              ariaLabel={`Chat with ${user.username}`}
              func={() => {
                auxFn?.(user);
                navigate("/dashboard/conversation");
              }}
              icon="faComment"
              customStyle={customButtonStyle}
            />
            {!friendCard ? (
              <Button
                icon="faUserPlus"
                ariaLabel={`Request to be Friends with ${user.username}`}
                func={() => {
                  addFriend(user.username);
                  navigate("/dashboard/friends");
                }}
                customStyle={customButtonStyle}
              />
            ) : (
              <Button
                icon="faUserXmark"
                ariaLabel={`Remove ${user.username} as a friend`}
                func={() => {
                  removeFriend(user.username);
                  navigate("/dashboard/friends");
                }}
                customStyle={customButtonStyle}
              />
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default UserCard;
