import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserCard from "../components/ui/UserCard";
import { useEffect } from "react";
import type { Friend, UserData } from "../types/types";

const Friends = () => {
  const [mutualFriends, setMutualFriends] = useState<Friend[]>([]);
  const [userFriends, setUserFriends] = useState<Friend[]>([]);
  const [allUsers, setAllUsers] = useState<Friend[]>([]);
  const [error, setError] = useState("");

  const { userData, getUserData, setRecipient } = useOutletContext<{
    userData: UserData;
    getUserData: () => void;
    setRecipient: (recipient: Friend) => void;
  }>();

  const { friendsOf } = userData;
  const loggedInUsername = localStorage.getItem("username");

  useEffect(() => {
    const retrieveUserFriends = async () => {
      try {
        const response = await fetch("http://localhost:3000/friends", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
          setError("Unable to retrieve users friends");
          return;
        }

        const data = await response.json();
        setUserFriends(data.friends);
      } catch {
        console.error("Unable to retrieve users friends");
      }
    };

    retrieveUserFriends();
  }, []);

  useEffect(() => {
    const mutualFriends: Friend[] = [];
    const findMutualFriends = () => {
      userFriends.forEach((friend) => {
        friendsOf.forEach((friendOf: Friend) => {
          if (friend.username === friendOf.username) {
            mutualFriends.push(friend);
          }
        });
      });
    };
    findMutualFriends();
    setMutualFriends(mutualFriends);
  }, [userFriends, friendsOf]);

  useEffect(() => {
    try {
      getUsers();
    } catch {
      setError("Cannot retrieve users.");
    }
    getUserData();
  }, [getUserData]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
    });

    if (!response) {
      setError("Cannot retrieve users.");
      return;
    }

    const data = await response.json();
    setAllUsers(data.safeUsersData);
  };

  return (
    <>
      <h2 className="text-lg">Friends</h2>
      <ul className="flex flex-col items-center lg:flex-row flex-wrap gap-6 w-full p-4">
        {mutualFriends?.map((friend) => {
          return (
            <UserCard
              key={friend.username}
              user={friend}
              auxFn={setRecipient}
              friendCard={true}
            />
          );
        })}
      </ul>
      <h3 className="text-lg">Friend Requests</h3>
      {/* If users are a friendOf the logged in user but the logged in user isn't a friend of theirs show them in Friend Requests */}
      <ul className="flex flex-col items-center lg:flex-row flex-wrap gap-6 w-full p-4">
        {allUsers?.map((user) => {
          if (
            user.friendsOf.some(
              (friends) => friends.username === loggedInUsername
            ) &&
            !mutualFriends.some(
              (mutualFriend) => mutualFriend.username === user.username
            )
          ) {
            return (
              <UserCard
                key={user.username}
                user={user}
                auxFn={setRecipient}
                getUsers={getUsers}
              />
            );
          }
        })}
      </ul>
      {error && (
        <div className="mb-2 bg-red-300 p-1 rounded">
          <p className="text-center text-pretty">{error}</p>
        </div>
      )}
    </>
  );
};

export default Friends;
