import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams || !searchParams.get("token")) {
      navigate("/");
    }
  });

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-xl">Account Verified!</h1>
      <p>Click the button below to return home.</p>
      <Button text="Home" href="/" />
    </div>
  );
};

export default VerifyAccount;
