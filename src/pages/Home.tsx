import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";

const Home = () => {
  const [returningUser, setReturningUser] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (username && token && token) {
      setUsername(username);
      setReturningUser(true);
    }
  }, [returningUser, username]);

  return (
    <>
      <header className="relative p-1">
        <h1 className="text-center font-[Walter_Turncoat] font-bold text-3xl pt-2">
          Budding Messenger
        </h1>
      </header>
      <main className="relative flex grow justify-center flex-col items-center gap-6 w-full">
        {returningUser ? (
          <div className="flex flex-col items-center gap-4 animate-ghost-drop">
            <h2 className="text-xl">Welcome back {username}!</h2>
            <p className="text-center">
              Click the button below to go to your dashboard
            </p>
            <Button text="Dashboard" href="/dashboard" ariaLabel="Dashboard" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <img
        className="z-0 sepia absolute w-[50vh] opacity-22 animate-fade-in-xslow"
        src="../src/assets/tree160.png"
        alt=""
      />
    </>
  );
};

export default Home;
