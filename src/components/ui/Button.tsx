import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faArrowPointer,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

type ButtonProps = {
  text?: string;
  type?: "button" | "submit" | "reset";
  func?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
};

const tailwindButtonStyle =
  "inline-flex items-center gap-2 w-fit bg-lime-600 hover:bg-lime-500 focus:bg-lime-500 active:bg-lime-500 hover:cursor-pointer pl-4 pr-4 pb-1 text-white rounded-lg mb-2";

const Button = ({
  text = "button",
  type = "button",
  func,
  href,
}: ButtonProps) => {
  const navigate = useNavigate();

  let icon;

  if (text.toLowerCase() === "home")
    icon = <FontAwesomeIcon icon={faHouseChimney} />;
  if (text.toLowerCase() === "submit")
    icon = <FontAwesomeIcon icon={faArrowPointer} />;
  if (text.toLowerCase() === "sign up")
    icon = <FontAwesomeIcon icon={faSeedling} />;

  function handleNavigate() {
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
