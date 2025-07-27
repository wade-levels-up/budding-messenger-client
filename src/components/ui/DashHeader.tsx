import { useState } from "react";
import Button from "./Button";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";

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
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  // Listen for drag end events
  useDndMonitor({
    onDragEnd(event) {
      if (
        event.over &&
        event.over.id === "droppable" &&
        event.active.data.current
      ) {
        const userData = event.active.data.current as DroppedUser;
        setDroppedUsers((prev) =>
          prev.some((u) => u.username === userData.username)
            ? prev
            : [...prev, userData]
        );
      }
    },
  });

  return (
    <>
      <header className="flex flex-col gap-2 relative z-2 justify-center border-b-2 border-solid border-lime-300 p-2">
        <h1 className="text-center font-[Walter_Turncoat] text-3xl lg:text-4xl">
          {username}
        </h1>
        <div className="absolute top-[10px] right-2">
          <Button
            icon={creatingGroupChat ? "faXmark" : "faUsers"}
            func={() => {
              setCreatingGroupChat(!creatingGroupChat);
              setDroppedUsers([]);
            }}
            ariaLabel={
              creatingGroupChat
                ? "Cancel Creating Group Chat"
                : "Create Group Chat"
            }
            customStyle="bg-blue-600 hover:cursor-pointer flex items-center justify-center text-white p-[6px] w-[50px] rounded-xl"
          />
        </div>
        {creatingGroupChat && (
          <fieldset
            ref={setNodeRef}
            className={`flex flex-col justify-end w-full h-fit border-2 border-blue-600 ${
              isOver && "animate-pulse"
            } bg-blue-100/70 shadow-md px-1 rounded-xl py-2`}
          >
            <legend className="text-xs text-white bg-blue-600 rounded-md px-2 py-[1px] ml-2 lg:ml-6">
              Creating Group Chat
            </legend>
            {droppedUsers.length === 0 && (
              <p className="text-black/50 text-sm w-full text-center">
                Add users by dragging them here.
              </p>
            )}
            <ul className="relative flex gap-3 flex-wrap lg:justify-center px-2">
              {droppedUsers.map((user) => (
                <li key={user.username} className="flex flex-col items-center">
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
                    ariaLabel="Create Group Chat"
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
