import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import defaultProfilePicture from "../assets/default_profile_picture.jpg";

type User = {
  username: string;
  profile_picture_path: string;
  joined: string;
};

type Recipient = {
  username: string;
  profile_picture_path: string;
  joined: string;
};

const AllUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState("");
  const { setRecipient } = useOutletContext<{
    setRecipient: (recipient: Recipient) => void;
  }>();
  const navigate = useNavigate();
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
            return (
              <li
                className="flex w-full max-w-2xs shadow-lg hover:bg-lime-200 hover:cursor-pointer items-center gap-4 border border-lime-500 p-2 rounded-l-full"
                key={user.username}
                onClick={() => {
                  setRecipient(user);
                  navigate(`/dashboard/conversation`);
                }}
              >
                <img
                  className="rounded-full w-24 h-24 object-cover"
                  src={
                    user.profile_picture_path
                      ? `${user.profile_picture_path}?t=${Date.now()}`
                      : defaultProfilePicture
                  }
                ></img>
                <span>{user.username}</span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default AllUsers;
