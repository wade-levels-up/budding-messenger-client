import Button from "./Button";

const DashSideNav = () => {
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const sideNavButtonStyle =
    "flex bg-lime-600 flex-row w-full justify-between gap-1 pl-3 pr-3 p-2 text-white rounded hover:bg-lime-500 hover:cursor-pointer focus:bg-lime-500 active:bg-lime-500 ";

  return (
    <>
      <nav className="p-2 lg:rounded-xl row-span-full border-t-2 lg:border-r-2 border-solid border-lime-300">
        <ul className="flex lg:flex-col gap-2 sm:gap-2 md:gap-4 lg:gap-8 p-2 justify-center">
          <li>
            <Button
              text="Profile"
              icon="faUser"
              ariaLabel="Profile"
              customStyle={sideNavButtonStyle}
              fullWidth
              vanishingText
              href="/dashboard/profile"
            />
          </li>
          <li>
            <Button
              text="Friends"
              icon="faFaceSmile"
              ariaLabel="Friends"
              customStyle={sideNavButtonStyle}
              fullWidth
              vanishingText
              href="/dashboard/friends"
            />
          </li>
          <li>
            <Button
              text="Conversations"
              icon="faComments"
              ariaLabel="Conversations"
              customStyle={sideNavButtonStyle}
              fullWidth
              vanishingText
              href="/dashboard/conversations"
            />
          </li>
          <li>
            <Button
              text="View All Users"
              icon="faUserGroup"
              ariaLabel="View All Users"
              customStyle={sideNavButtonStyle}
              fullWidth
              vanishingText
              href="/dashboard/all-users"
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
              vanishingText
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DashSideNav;
