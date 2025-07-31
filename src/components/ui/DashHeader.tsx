import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

type DashHeaderProps = {
  username: string;
  creatingGroupChat: boolean;
  setCreatingGroupChat: (value: boolean) => void;
  droppedUsers: DroppedUser[];
  handleSetDroppedUsers: (value: DroppedUser) => void;
  setDroppedUsers: (value: []) => void;
};

type DroppedUser = {
  username: string;
  profile_picture_path: string;
};

const DashHeader = ({
  username,
  creatingGroupChat,
  setCreatingGroupChat,
  droppedUsers,
  handleSetDroppedUsers,
  setDroppedUsers,
}: DashHeaderProps) => {
  const [groupChatName, setGroupChatName] = useState("");

  const handleDrop = (e: React.DragEvent<HTMLFieldSetElement>) => {
    e.preventDefault();
    const userData = e.dataTransfer.getData("application/json");
    if (userData) {
      const user: DroppedUser = JSON.parse(userData);
      handleSetDroppedUsers(user);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLFieldSetElement>) => {
    e.preventDefault();
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const createGroupChat = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/conversations/group_conversation`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            users: droppedUsers,
            name: groupChatName,
            creator: localStorage.getItem("username"),
          }),
        }
      );

      if (!response.ok) {
        toast("Unable to create group chat");
        return;
      }
    } catch {
      toast("Unable to create group chat");
    }
  };

  const headerButtonStyle =
    "bg-blue-600 hover:bg-blue-300 hover:cursor-pointer flex items-center justify-center text-white p-[6px] w-[50px] rounded-md";

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
              <>
                <p className="lg:block hidden text-black/50 text-sm w-full text-center">
                  Add users by dragging their user card here.
                </p>
                <p className="lg:hidden block text-black/50 text-sm w-full text-center">
                  Add users by clicking the '+' icon on their user card.
                </p>
              </>
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
                    className="w-8 h-8 bg-white/30 rounded-full"
                  />
                  <span className="text-xs">{user.username}</span>
                </li>
              ))}
            </ul>
            {droppedUsers.length > 1 && (
              <form className="flex px-2 pt-1 gap-2 justify-between items-center text-[16px] w-full">
                <div>
                  <label hidden className="pr-2" htmlFor="name">
                    Chat Name:
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Enter chat name"
                    className="bg-white max-w-[200px] px-2 py-1 rounded-md"
                    type="text"
                    minLength={1}
                    maxLength={16}
                    pattern="[^<>]*"
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                </div>
                <Button
                  text="Submit"
                  icon="faCheck"
                  ariaLabel="Confirm Group Chat Creation"
                  vanishingText
                  customStyle="hover:cursor-pointer flex gap-2 bg-blue-600 text-white px-1 py-1 rounded"
                  func={() => {
                    createGroupChat();
                    setGroupChatName("");
                    setDroppedUsers([]);
                    setCreatingGroupChat(false);
                  }}
                />
              </form>
            )}
          </fieldset>
        )}
      </header>
    </>
  );
};

export default DashHeader;
