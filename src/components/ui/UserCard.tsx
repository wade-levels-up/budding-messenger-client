import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import defaultProfilePicture from "../../assets/default_profile_picture.jpg";
import Button from "./Button";
import type { Friend } from "../../types/types";
import { toast } from "react-toastify";

type UserCardProps = {
  user: Friend;
  friendCard?: boolean;
  auxFn?: (value: Friend) => void | undefined;
  getUsers?: () => void;
};

const userCardStyle =
  "animate-fade-in-slow relative bg-blue-100/30 rounded-md flex flex-col w-full max-w-[250px] shadow-lg hover:bg-blue-100 hover:cursor-pointer items-center gap-1 border border-lime-500 py-2 px-1";
const customButtonStyle =
  "bg-lime-600 max-w-[50px] text-white py-1 w-full px-2 hover:bg-lime-500 focus:bg-lime-500 active:bg-lime-500 hover:cursor-pointer transition-colors";

const UserCard = ({ user, friendCard = false, auxFn }: UserCardProps) => {
  const navigate = useNavigate();

  const { getUserData } = useOutletContext<{
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

      const notify = (msg: string) => toast(msg);

      notify(`Friend request sent to ${recipient}`);
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
          className="rounded-full w-24 h-24 object-cover hover:outline-2 hover:outline-lime-400 hover:animate-pulse"
          src={
            user.profile_picture_path
              ? `${user.profile_picture_path}?t=${Date.now()}`
              : defaultProfilePicture
          }
          loading="lazy"
          onClick={() =>
            navigate(`/dashboard/profile?username=${user.username}`)
          }
        ></img>
        <div className="flex flex-col w-full justify-between p-1">
          <span className="text-center flex flex-col text-blue-500">
            {user.username}
          </span>
          <div className="flex w-full justify-center mt-2 bg-white/30 rounded-md p-1 gap-1">
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
                }}
                customStyle={customButtonStyle}
              />
            ) : (
              <Button
                icon="faUserXmark"
                ariaLabel={`Remove ${user.username} as a friend`}
                func={() => {
                  removeFriend(user.username);
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
