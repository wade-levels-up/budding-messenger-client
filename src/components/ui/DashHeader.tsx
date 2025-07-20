type DashHeaderProps = {
  username: string;
};

const DashHeader = ({ username }: DashHeaderProps) => {
  return (
    <>
      <header className="z-2 flex gap-2 flex-col items-center justify-center border-b-2 border-solid border-lime-300 p-2">
        <h1 className="font-[Walter_Turncoat] text-3xl lg:text-4xl">
          {username}
        </h1>
      </header>
    </>
  );
};

export default DashHeader;
