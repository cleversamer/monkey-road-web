import Google from "./Google";
import Facebook from "./Facebook";
import Button from "./Button";
import LikeBtn from "./LikeBtn";
import ShareBtn from "./ShareBtn";

const CustomButton = ({ type, title, liked, onClick, ...props }) => {
  type = type.trim();

  return type === "google" ? (
    <Google title={title} onClick={onClick} {...props} />
  ) : type === "facebook" ? (
    <Facebook title={title} onClick={onClick} {...props} />
  ) : type === "primary" ? (
    <Button title={title} onClick={onClick} {...props} />
  ) : type === "like" ? (
    <LikeBtn liked={liked} onClick={onClick} />
  ) : type === "share" ? (
    <ShareBtn />
  ) : null;
};

export default CustomButton;
