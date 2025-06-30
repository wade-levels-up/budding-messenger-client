import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";

const Home = () => {
  const [returningUser, setReturningUser] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (username && token) {
      setUsername(username);
      setReturningUser(true);
    }
  }, [returningUser, username]);

  return (
    <>
      <header>
        <h1 className="text-center text-4xl mb-6">🌱 Budding Messenger</h1>
      </header>
      <main className="flex grow justify-center flex-col items-center gap-6">
        {returningUser ? (
          <>
            <h2 className="text-xl">Welcome back {username}!</h2>
            <p className="text-center">
              Click the button below to go to your dashboard
            </p>
            <Button text="Dashboard" href="/dashboard" />
          </>
        ) : (
          <Outlet />
        )}
      </main>
      <footer>Made by Wade</footer>
    </>
  );
};

export default Home;
