import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faArrowPointer,
  faSeedling,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

type ButtonProps = {
  text?: string;
  type?: "button" | "submit" | "reset";
  func?: () => void;
  href?: string;
  fullWidth?: boolean;
  customStyle?: string;
  customIcon?: string;
  ariaLabel?: string;
};

const Button = ({
  text,
  type = "button",
  func,
  href,
  fullWidth,
  customStyle,
  customIcon,
  ariaLabel,
}: ButtonProps) => {
  const width = fullWidth ? "w-full" : "w-fit";
  const tailwindButtonStyle = `inline-flex items-center ${width} gap-2 bg-lime-600 hover:bg-lime-500 focus:bg-lime-500 active:bg-lime-500 hover:cursor-pointer pl-4 pr-4 pb-1 text-white rounded-lg mb-2`;
  const navigate = useNavigate();

  let icon;

  if (text) {
    if (text.toLowerCase() === "home")
      icon = <FontAwesomeIcon icon={faHouseChimney} />;
    if (text.toLowerCase() === "submit")
      icon = <FontAwesomeIcon icon={faArrowPointer} />;
    if (text.toLowerCase() === "sign up")
      icon = <FontAwesomeIcon icon={faSeedling} />;
    if (text.toLowerCase() === "dashboard")
      icon = <FontAwesomeIcon icon={faUser} />;
  }

  let customIconComponent;

  if (customIcon === "eye") {
    customIconComponent = <FontAwesomeIcon icon={faEye} />;
  }
  if (customIcon === "eyeSlash") {
    customIconComponent = <FontAwesomeIcon icon={faEyeSlash} />;
  }

  const handleClick = () => {
    if (href) {
      if (func) func();
      navigate(href);
    } else if (func) {
      func();
    }
  };

  return (
    <button
      onClick={handleClick}
      type={type}
      className={customStyle || tailwindButtonStyle}
      aria-label={ariaLabel}
    >
      {text} {icon} {customIconComponent}
    </button>
  );
};

export default Button;
