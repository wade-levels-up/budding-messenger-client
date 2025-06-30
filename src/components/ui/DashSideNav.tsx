import Button from "./Button";

const DashSideNav = () => {
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <nav className="z-2 p-2 lg:rounded-xl row-span-full border-t-2 lg:border-r-2 border-solid border-lime-300">
        <ul className="flex lg:flex-col gap-4 p-2 justify-evenly">
          <li>
            <Button text="Profile" fullWidth />
          </li>
          <li>
            <Button text="Friends" fullWidth />
          </li>
          <li>
            <Button text="Conversations" fullWidth />
          </li>
          <li>
            <Button text="View All Users" fullWidth />
          </li>
          <li>
            <Button
              text="Sign Out"
              func={clearLocalStorage}
              href="/"
              fullWidth
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DashSideNav;
