import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header>
        <h1>Budding Messenger</h1>
      </header>
      <main className="flex flex-col">
        <Outlet />
        <h2>Here are some other links</h2>
        <nav>
          <ul>
            <li>
              <Link to="dashboard">Dashboard page</Link>
            </li>
          </ul>
        </nav>
      </main>
      <footer>Made by Wade</footer>
    </>
  );
};

export default Home;
