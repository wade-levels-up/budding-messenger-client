import Button from "../components/ui/Button";

const VerifyAccount = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-xl">Account Verified!</h1>
      <p>Click the button below to return home.</p>
      <Button text="Home" href="/" />
    </div>
  );
};

export default VerifyAccount;
