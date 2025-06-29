import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header>
        <h1 className="text-center text-4xl mb-6">🌱 Budding Messenger</h1>
      </header>
      <main className="flex grow justify-center flex-col">
        <Outlet />
      </main>
      <footer>Made by Wade</footer>
    </>
  );
};

export default Home;
