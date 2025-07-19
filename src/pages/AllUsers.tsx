import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserCard from "../components/ui/UserCard";
import type { Friend, UserData } from "../types/types";

const AllUsers = () => {
  const [users, setUsers] = useState<UserData[] | null>(null);
  const [error, setError] = useState("");
  const { userData, setRecipient, getUsers } = useOutletContext<{
    userData: UserData;
    setRecipient: (recipient: Friend) => void;
    getUsers: () => void;
  }>();
  const { friendsOf } = userData;
  const loggedInUsername = localStorage.getItem("username");

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
      });

      if (!response.ok) setError("Cannot retrieve users");

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
      <div className="animate-fade-in-slow flex flex-col items-center w-full">
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
                  getUsers={getUsers}
                />
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default AllUsers;
