type MessageProps = {
  authorName: string;
  content: string;
};

const Message = ({ authorName, content }: MessageProps) => {
  const loggedInUsersName = localStorage.getItem("username");

  const messageStyle = `${
    loggedInUsersName === authorName
      ? "bg-lime-200 border-1 border-lime-400"
      : "bg-blue-100 border-1 border-blue-400"
  } flex flex-col px-3 py-2 rounded-xl w-fit`;

  return (
    <>
      <div className={messageStyle}>
        <span className="text-blue-500">{authorName}</span>
        <p>{content}</p>
      </div>
    </>
  );
};

export default Message;
