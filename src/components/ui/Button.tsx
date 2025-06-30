import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faArrowPointer,
  faSeedling,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

type ButtonProps = {
  text?: string;
  type?: "button" | "submit" | "reset";
  func?: () => void;
  href?: string;
  fullWidth?: boolean;
};

const Button = ({
  text = "button",
  type = "button",
  func,
  href,
  fullWidth,
}: ButtonProps) => {
  const width = fullWidth ? "w-full" : "w-fit";
  const tailwindButtonStyle = `inline-flex items-center ${width} gap-2 bg-lime-600 hover:bg-lime-500 focus:bg-lime-500 active:bg-lime-500 hover:cursor-pointer pl-4 pr-4 pb-1 text-white rounded-lg mb-2`;
  const navigate = useNavigate();

  let icon;

  if (text.toLowerCase() === "home")
    icon = <FontAwesomeIcon icon={faHouseChimney} />;
  if (text.toLowerCase() === "submit")
    icon = <FontAwesomeIcon icon={faArrowPointer} />;
  if (text.toLowerCase() === "sign up")
    icon = <FontAwesomeIcon icon={faSeedling} />;
  if (text.toLowerCase() === "dashboard")
    icon = <FontAwesomeIcon icon={faUser} />;

  function handleNavigate() {
    if (func) {
      func();
    }
    if (href) {
      navigate(href);
    }
  }

  if (href) {
    return (
      <button onClick={handleNavigate} className={tailwindButtonStyle}>
        {text} {icon}
      </button>
    );
  } else {
    return (
      <button type={type} onClick={func} className={tailwindButtonStyle}>
        {text} {icon}
      </button>
    );
  }
};

export default Button;
