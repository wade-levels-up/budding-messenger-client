import { useNavigate } from "react-router-dom";

const Button = ({ text = "button", type = "button", func, href, style }) => {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(href);
  }

  if (href) {
    return (
      <button onClick={handleNavigate} style={style}>
        {text}
      </button>
    );
  } else {
    return (
      <button type={type} onClick={func} style={style}>
        {text}
      </button>
    );
  }
};

export default Button;
