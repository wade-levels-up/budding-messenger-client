import { useNavigate } from "react-router-dom";
import defaultProfilePicture from "../../assets/default_profile_picture.jpg";
import Button from "./Button";

type Recipient = {
  username: string;
  profile_picture_path: string;
  joined: string;
};

type UserCardProps = {
  user: Recipient;
  auxFn: (value: Recipient) => void;
};

const userCardStyle =
  "flex w-full max-w-2xs shadow-lg hover:bg-blue-100 hover:cursor-pointer items-center gap-4 border border-lime-500 p-1 rounded-l-full";

const UserCard = ({ user, auxFn }: UserCardProps) => {
  const navigate = useNavigate();
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
              ariaLabel={`Chat with ${user.username}`}
              func={() => {
                auxFn(user);
                navigate("/dashboard/conversation");
              }}
              icon="faComment"
            />
            <Button
              icon="faUser"
              ariaLabel={`View ${user.username}'s Profile Page`}
              func={() =>
                navigate(`/dashboard/user/profile?username=${user.username}`)
              }
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default UserCard;
