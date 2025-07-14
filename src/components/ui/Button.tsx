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
  faPen,
  faUserPen,
  faCheck,
  faXmark,
  faBackward,
  faCamera,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

type ButtonProps = {
  text?: string;
  type?: "button" | "submit" | "reset";
  func?: () => void;
  href?: string;
  fullWidth?: boolean;
  customStyle?: string;
  icon?: string;
  ariaLabel?: string;
  vanishingText?: boolean;
};

const buttonIcons = {
  faArrowPointer,
  faComments,
  faEye,
  faEyeSlash,
  faFaceSmile,
  faHouseChimney,
  faRightFromBracket,
  faSeedling,
  faUser,
  faUserGroup,
  faPen,
  faUserPen,
  faCheck,
  faXmark,
  faBackward,
  faCamera,
  faArrowsRotate,
};

const Button = ({
  text,
  type = "button",
  func,
  href,
  fullWidth,
  customStyle,
  icon,
  ariaLabel,
  vanishingText,
}: ButtonProps) => {
  const width = fullWidth ? "w-full" : "w-fit";
  const tailwindButtonStyle = `inline-flex items-center justify-center ${width} gap-2 bg-lime-600 hover:bg-lime-500 focus:bg-lime-500 active:bg-lime-500 hover:cursor-pointer pl-2 pr-3 p-1 text-white rounded-lg transition-colors`;
  const navigate = useNavigate();

  const iconSize = "lg";

  const createButtonIcon = (icon: string) => {
    const iconName = icon;
    return (
      <FontAwesomeIcon
        icon={buttonIcons[iconName as keyof typeof buttonIcons]}
        size={iconSize}
      />
    );
  };

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
      title={ariaLabel}
    >
      {vanishingText ? (
        <span className="hidden lg:flex">{text}</span>
      ) : (
        <span className="flex">{text}</span>
      )}
      {icon && createButtonIcon(icon)}
    </button>
  );
};

export default Button;
