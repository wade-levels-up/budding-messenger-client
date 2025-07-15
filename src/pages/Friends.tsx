import { useOutletContext } from "react-router-dom";
import UserCard from "../components/ui/UserCard";

type Friend = {
  username: string;
  profile_picture_path: string;
  joined: string;
  bio: string;
};

type UserData = {
  friends: Friend[];
};

const Friends = () => {
  const { userData } = useOutletContext<{ userData: UserData }>();
  const { friends } = userData;

  return (
    <>
      <h2 className="text-lg">Friends</h2>
      <ul className="flex flex-col items-center lg:flex-row flex-wrap gap-6 w-full p-4">
        {friends &&
          friends.map((friend) => {
            return <UserCard user={friend} friendCard={true} />;
          })}
      </ul>
    </>
  );
};

export default Friends;
