import Button from "./Button";

const Error = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-xl">Oh no... This route doesn't exist!</h1>
      <p>Click the button below to return home.</p>
      <Button text="Home" href="/" />
    </div>
  );
};

export default Error;
