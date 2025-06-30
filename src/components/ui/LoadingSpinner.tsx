import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = () => {
  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xl animate-wiggle">Loading...</p>
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="text-5xl text-lime-400 animate-spin"
        />
      </div>
    </>
  );
};

export default LoadingSpinner;
