import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faArrowPointer,
  faSeedling,
  faUser,
  faEye,
  faEyeSlash,
  faUserGroup,
  faComments,
  faFaceSmile,
  faRightFromBracket,
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
  hideText?: boolean;
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
  hideText,
}: ButtonProps) => {
  const width = fullWidth ? "w-full" : "w-fit";
  const tailwindButtonStyle = `inline-flex items-center ${width} gap-2 bg-lime-600 hover:bg-lime-500 focus:bg-lime-500 active:bg-lime-500 hover:cursor-pointer pl-4 pr-4 p-1 text-white rounded-lg mb-2`;
  const navigate = useNavigate();

  let icon;
  const iconSize = "xl";

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
    customIconComponent = <FontAwesomeIcon icon={faEye} size={iconSize} />;
  }
  if (customIcon === "eyeSlash") {
    customIconComponent = <FontAwesomeIcon icon={faEyeSlash} size={iconSize} />;
  }
  if (customIcon === "userGroup") {
    customIconComponent = (
      <FontAwesomeIcon icon={faUserGroup} size={iconSize} />
    );
  }
  if (customIcon === "conversations") {
    customIconComponent = <FontAwesomeIcon icon={faComments} size={iconSize} />;
  }
  if (customIcon === "friends") {
    customIconComponent = (
      <FontAwesomeIcon icon={faFaceSmile} size={iconSize} />
    );
  }
  if (customIcon === "user") {
    customIconComponent = <FontAwesomeIcon icon={faUser} size={iconSize} />;
  }
  if (customIcon === "signOut") {
    customIconComponent = (
      <FontAwesomeIcon icon={faRightFromBracket} size={iconSize} />
    );
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
      title={text}
    >
      {!hideText && text} {icon} {customIconComponent}
    </button>
  );
};

export default Button;
