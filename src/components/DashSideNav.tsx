const DashSideNav = () => {
  return (
    <>
      <nav className="z-2 p-2 lg:rounded-xl row-span-full border-t-2 lg:border-r-2 border-solid border-lime-300">
        <ul className="flex lg:flex-col gap-4 p-2 justify-evenly">
          <li className="hover:bg-lime-200 hover:cursor-pointer p-1">
            Profile
          </li>
          <li className="hover:bg-lime-200 hover:cursor-pointer p-1">
            Friends
          </li>
          <li className="hover:bg-lime-200 hover:cursor-pointer p-1">
            Conversations
          </li>
          <li className="hover:bg-lime-200 hover:cursor-pointer p-1">Users</li>
          <li className="hover:bg-lime-200 hover:cursor-pointer p-1">
            Sign Out
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DashSideNav;
