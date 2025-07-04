import Button from "./Button";

const DashSideNav = () => {
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const smallDeviceButtonStyle =
    "pl-3 pr-3 p-2 text-lime-600 rounded hover:bg-white hover:cursor-pointer focus:bg-white active:bg-white";

  return (
    <>
      <nav className="z-2 p-2 lg:rounded-xl row-span-full border-t-2 lg:border-r-2 border-solid border-lime-300">
        <ul className="flex lg:flex-col gap-4 p-2 justify-evenly">
          <li>
            <Button
              text="Profile"
              customIcon="user"
              ariaLabel="Profile"
              hideText
              customStyle={smallDeviceButtonStyle}
              fullWidth
            />
          </li>
          <li>
            <Button
              text="Friends"
              customIcon="friends"
              ariaLabel="Friends"
              hideText
              customStyle={smallDeviceButtonStyle}
              fullWidth
            />
          </li>
          <li>
            <Button
              text="Conversations"
              customIcon="conversations"
              ariaLabel="Conversations"
              hideText
              customStyle={smallDeviceButtonStyle}
              fullWidth
            />
          </li>
          <li>
            <Button
              text="View All Users"
              customIcon="userGroup"
              ariaLabel="View All Users"
              hideText
              customStyle={smallDeviceButtonStyle}
              fullWidth
            />
          </li>
          <li>
            <Button
              text="Sign Out"
              customIcon="signOut"
              ariaLabel="Sign Out"
              hideText
              customStyle={smallDeviceButtonStyle}
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
