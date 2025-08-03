type MessageProps = {
  authorName: string;
  content: string;
  messageStyle: string;
};

const Message = ({ authorName, content, messageStyle }: MessageProps) => {
  return (
    <>
      <div
        className={`${messageStyle} border-1 flex flex-col shadow-md px-3 py-2 rounded-xl w-fit`}
      >
        <span className="text-blue-500">{authorName}</span>
        <p>{content}</p>
      </div>
    </>
  );
};

export default Message;
