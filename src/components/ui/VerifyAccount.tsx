import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-xl">Account Verified!</h1>
      <p>Click the button below to return home.</p>
      <button
        className="bg-lime-600 text-white p-2 pl-4 pr-4 rounded-xl hover:bg-lime-500 hover:cursor-pointer"
        onClick={navigateHome}
      >
        Home
      </button>
    </div>
  );
};

export default VerifyAccount;
