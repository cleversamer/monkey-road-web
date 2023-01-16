import Google from "./Google";
import Facebook from "./Facebook";
import Primary from "./Primary";

const CustomButton = ({ type, title, onClick, ...props }) => {
  type = type.trim();

  return type === "google" ? (
    <Google title={title} onClick={onClick} {...props} />
  ) : type === "facebook" ? (
    <Facebook title={title} onClick={onClick} {...props} />
  ) : type === "primary" ? (
    <Primary title={title} onClick={onClick} {...props} />
  ) : null;
};

export default CustomButton;
