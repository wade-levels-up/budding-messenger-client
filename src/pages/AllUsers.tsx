import { useEffect, useState } from "react";

type User = {
  username: string;
  profile_picture_path: string;
  joined: string;
};

const AllUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState("");

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

  return (
    <>
      <h2 className="text-lg">All Users</h2>
      <ul className="flex flex-wrap gap-6 w-full p-4">
        {error && <li>{error}</li>}
        {users &&
          users.map((user) => {
            return (
              <li
                className="flex w-full shadow-lg hover:bg-lime-200 hover:cursor-pointer items-center gap-4 border border-lime-500 p-2 rounded-xl"
                key={user.username}
              >
                <img
                  className="rounded-full w-24 h-24"
                  src={user.profile_picture_path}
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
