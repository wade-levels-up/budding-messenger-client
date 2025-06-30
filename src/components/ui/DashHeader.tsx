type DashHeaderProps = {
  username: string;
};

const DashHeader = ({ username }: DashHeaderProps) => {
  return (
    <>
      <header className="z-2 flex items-center justify-center border-b-2 border-solid border-lime-300 p-2">
        <h1 className="text-3xl">{username}'s Dashboard</h1>
      </header>
    </>
  );
};

export default DashHeader;
