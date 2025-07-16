import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import UserCard from "../components/ui/UserCard";
import { useEffect } from "react";

type Friend = {
  username: string;
  profile_picture_path: string;
  joined: string;
  bio: string;
};

type UserData = {
  friends: Friend[];
  friendsOf: Friend[];
};

type Recipient = {
  username: string;
  profile_picture_path: string;
  joined: string;
};

const Friends = () => {
  const [mutualFriends, setMutualFriends] = useState<Friend[]>([]);
  const [userFriends, setUserFriends] = useState<Friend[]>([]);
  const { userData, setRecipient } = useOutletContext<{
    userData: UserData;
    setRecipient: (recipient: Recipient) => void;
  }>();
  const { friendsOf } = userData;

  useEffect(() => {
    const retrieveUserFriends = async () => {
      try {
        const response = await fetch("http://localhost:3000/friends", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
          throw new Error("Unable to retrieve users friends");
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

  return (
    <>
      <h2 className="text-lg">Friends</h2>
      <ul className="flex flex-col items-center lg:flex-row flex-wrap gap-6 w-full p-4">
        {mutualFriends &&
          mutualFriends.map((friend) => {
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
    </>
  );
};

export default Friends;
