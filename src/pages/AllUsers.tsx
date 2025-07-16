import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserCard from "../components/ui/UserCard";

type Friend = {
  username: string;
  profile_picture_path: string;
  joined: string;
  bio: string;
};

type User = {
  username: string;
  profile_picture_path: string;
  joined: string;
  friendsOf: Friend[];
};

type Recipient = {
  username: string;
  profile_picture_path: string;
  joined: string;
};

const AllUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState("");
  const { setRecipient, userData } = useOutletContext<{
    setRecipient: (recipient: Recipient) => void;
    userData: User;
  }>();
  const { friendsOf } = userData;
  const loggedInUsername = localStorage.getItem("username");

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
      });

      if (!response) setError("Cannot retrieve users");

      const data = await response.json();
      setUsers(data.safeUsersData);
    };
    getUsers();
  }, []);

  const filteredUsers = users?.filter(
    (user) => user.username !== loggedInUsername
  );

  return (
    <>
      <h2 className="text-lg">All Users</h2>
      <ul className="flex flex-col items-center lg:flex-row flex-wrap gap-6 w-full p-4">
        {error && <li>{error}</li>}
        {filteredUsers &&
          filteredUsers.map((user) => {
            let mutualFriend = false;
            friendsOf.forEach((friend) => {
              if (friend.username === user.username) {
                mutualFriend = true;
              }
            });
            return (
              <UserCard
                key={user.username}
                friendCard={mutualFriend}
                user={user}
                auxFn={setRecipient}
              />
            );
          })}
      </ul>
    </>
  );
};

export default AllUsers;
