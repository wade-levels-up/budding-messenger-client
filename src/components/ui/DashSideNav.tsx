import Button from "./Button";

const DashSideNav = () => {
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const sideNavButtonStyle =
    "flex flex-row w-full justify-between gap-1 pl-3 pr-3 p-2 text-lime-600 rounded hover:bg-white hover:cursor-pointer focus:bg-white active:bg-white";

  return (
    <>
      <nav className="z-2 p-2 lg:rounded-xl row-span-full border-t-2 lg:border-r-2 border-solid border-lime-300">
        <ul className="flex lg:flex-col gap-4 p-2 justify-evenly">
          <li>
            <Button
              text="Profile"
              icon="faUser"
              ariaLabel="Profile"
              customStyle={sideNavButtonStyle}
              fullWidth
            />
          </li>
          <li>
            <Button
              text="Friends"
              icon="faUserGroup"
              ariaLabel="Friends"
              customStyle={sideNavButtonStyle}
              fullWidth
            />
          </li>
          <li>
            <Button
              text="Conversations"
              icon="faComments"
              ariaLabel="Conversations"
              customStyle={sideNavButtonStyle}
              fullWidth
            />
          </li>
          <li>
            <Button
              text="View All Users"
              icon="faUserGroup"
              ariaLabel="View All Users"
              customStyle={sideNavButtonStyle}
              fullWidth
            />
          </li>
          <li>
            <Button
              text="Sign Out"
              icon="faRightFromBracket"
              ariaLabel="Sign Out"
              customStyle={sideNavButtonStyle}
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
