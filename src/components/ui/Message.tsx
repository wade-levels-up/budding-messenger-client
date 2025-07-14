type MessageProps = {
  authorName: string;
  content: string;
};

const loggedInUsersName = localStorage.getItem("username");

const Message = ({ authorName, content }: MessageProps) => {
  const messageStyle = `${
    loggedInUsersName === authorName ? "bg-lime-200" : "bg-lime-300"
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
