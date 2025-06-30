import { format, parseISO, isValid } from "date-fns";

type DashHeaderProps = {
  username: string;
  joined: string;
};

const DashHeader = ({ username, joined }: DashHeaderProps) => {
  let formattedDate = "Unknown";
  if (joined) {
    const dateObj = parseISO(joined);
    if (isValid(dateObj)) {
      formattedDate = format(dateObj, "d/M/yy");
    }
  }

  return (
    <>
      <header className="z-2 flex gap-2 flex-col items-center justify-center border-b-2 border-solid border-lime-300 p-2">
        <h1 className="text-3xl">{username}'s Dashboard</h1>
        <p className="text-xs">Member since: {formattedDate}</p>
      </header>
    </>
  );
};

export default DashHeader;
