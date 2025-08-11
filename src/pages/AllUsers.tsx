import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserCard from "../components/ui/UserCard";
import type { Friend, UserData } from "../types/types";

const AllUsers = () => {
  const [users, setUsers] = useState<UserData[] | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const { userData, setRecipient, getUsers } = useOutletContext<{
    userData: UserData;
    setRecipient: (recipient: Friend) => void;
    getUsers: () => void;
  }>();
  const { friendsOf } = userData;
  const loggedInUsername = localStorage.getItem("username");

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        {
          method: "GET",
        }
      );

      if (!response.ok) setError("Cannot retrieve users");

      const data = await response.json();
      setUsers(data.safeUsersData);
    };
    getUsers();
  }, []);

  const handleSearchByUsername = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch((e.target as HTMLInputElement).value);
  };

  const filteredUsers = users?.filter((user) => {
    if (search) {
      return (
        user.username !== loggedInUsername &&
        user.username.toLowerCase().includes(search.toLowerCase())
      );
    }
    return user.username !== loggedInUsername;
  });

  const orderedUsers = filteredUsers?.sort((a, b) => {
    const nameA = a.username.toUpperCase();
    const nameB = b.username.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return (
    <>
      <div className="relative animate-fade-in-slow max-w-[1000px] flex flex-col items-center w-full">
        <h2 className="text-lg">All Users</h2>
        <div className="flex gap-2 items-center justify-start w-fit p-2 rounded-xl bg-lime-400/30 backdrop-blur-xs">
          <label htmlFor="search">Search by username: </label>
          <input
            className="bg-white py-1 px-2 rounded-xl"
            id="search"
            name="search"
            type="text"
            onChange={handleSearchByUsername}
            value={search}
          />
        </div>
        <ul className="flex justify-center lg:justify-start overflow-auto flex-wrap gap-6 w-full px-2 py-3">
          {error && <li>{error}</li>}
          {orderedUsers &&
            orderedUsers.map((user) => {
              let mutualFriend = false;
              friendsOf.forEach((friend) => {
                if (friend.username === user.username) {
                  mutualFriend = true;
                }
              });
              if (user.verified === true) {
                return (
                  <UserCard
                    key={user.username}
                    friendCard={mutualFriend}
                    user={user}
                    auxFn={setRecipient}
                    getUsers={getUsers}
                  />
                );
              } else {
                return null;
              }
            })}
        </ul>
      </div>
    </>
  );
};

export default AllUsers;
