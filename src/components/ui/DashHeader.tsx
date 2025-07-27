import { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";

type DashHeaderProps = {
  username: string;
};

type DroppedUser = {
  username: string;
  profile_picture_path: string;
};

const DashHeader = ({ username }: DashHeaderProps) => {
  const [creatingGroupChat, setCreatingGroupChat] = useState(false);
  const [droppedUsers, setDroppedUsers] = useState<DroppedUser[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLFieldSetElement>) => {
    e.preventDefault();
    const userData = e.dataTransfer.getData("application/json");
    if (userData) {
      const user: DroppedUser = JSON.parse(userData);
      if (!droppedUsers.some((u) => u.username === user.username)) {
        if (droppedUsers.length < 3) {
          setDroppedUsers([...droppedUsers, user]);
        } else {
          toast("❌ Maximum of 4 users allowed");
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLFieldSetElement>) => {
    e.preventDefault();
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const headerButtonStyle =
    "bg-blue-600 hover:cursor-pointer flex items-center justify-center text-white p-[6px] w-[50px] rounded-md";

  return (
    <>
      <header className="flex flex-col gap-2 relative z-2 justify-center border-b-2 border-solid border-lime-300 p-2">
        <div className="flex justify-between px-2">
          <h1 className="lg:text-center font-[Walter_Turncoat] text-lg lg:text-2xl">
            {username}
          </h1>
          <div className="flex gap-[5px] top-[10px] right-1">
            <Button
              icon={creatingGroupChat ? "faXmark" : "faComments"}
              func={() => {
                setCreatingGroupChat(!creatingGroupChat);
                setDroppedUsers([]);
              }}
              ariaLabel={
                creatingGroupChat
                  ? "Cancel Creating Group Chat"
                  : "Create Group Chat"
              }
              customStyle={headerButtonStyle}
            />
            <Button
              icon="faRightFromBracket"
              ariaLabel="Sign Out"
              customStyle={headerButtonStyle}
              func={clearLocalStorage}
              href="/"
              fullWidth
              vanishingText
            />
          </div>
        </div>
        {creatingGroupChat && (
          <fieldset
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`flex flex-col justify-end w-full min-h-[99px] h-fit border-2 border-blue-600 bg-blue-100/70 shadow-md px-1 rounded-xl py-2`}
          >
            <legend className="text-xs text-white bg-blue-600 rounded-md px-2 py-[1px] ml-2 lg:ml-6">
              Creating Group Chat
            </legend>
            {droppedUsers.length === 0 && (
              <p className="text-black/50 text-sm w-full text-center">
                Add users by dragging their user card here.
              </p>
            )}
            <ul className="relative flex gap-3 flex-wrap lg:justify-center px-2">
              {droppedUsers.map((user) => (
                <li
                  key={user.username}
                  className="flex flex-col gap-1 items-center"
                >
                  <img
                    src={
                      user.profile_picture_path ||
                      "/src/assets/default_profile_picture.jpg"
                    }
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-xs">{user.username}</span>
                </li>
              ))}
              {droppedUsers.length > 0 && (
                <li className="flex absolute right-1">
                  <Button
                    icon="faCheck"
                    ariaLabel="Confirm Group Chat Creation"
                    customStyle="hover:cursor-pointer bg-blue-600 text-white px-1 py-1 rounded"
                    func={() => {
                      // TODO: handle group chat creation
                      setDroppedUsers([]);
                      setCreatingGroupChat(false);
                    }}
                  />
                </li>
              )}
            </ul>
          </fieldset>
        )}
      </header>
    </>
  );
};

export default DashHeader;
