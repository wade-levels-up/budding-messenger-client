import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-xl">Oh no... This page doesn't exist!</h1>
      <p>Click below to return home or go back to where you came from.</p>
      <div className="flex gap-2">
        <Button
          text="Back"
          func={() => navigate(-1)}
          ariaLabel="Back"
          icon="faBackward"
        />
        <Button text="Home" href="/" ariaLabel="Home" icon="faHouseChimney" />
      </div>
    </div>
  );
};

export default Error;
