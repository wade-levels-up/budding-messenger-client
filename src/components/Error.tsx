import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-xl">Oh no... This route doesn't exist!</h1>
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

export default Error;
