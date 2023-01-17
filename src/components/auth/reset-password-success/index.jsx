import { useNavigate } from "react-router-dom";
import SharedForm from "components/common/shared-form";
import Success from "components/common/success";
import CustomButton from "components/common/custom-button";

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <SharedForm
      imageURL="/assets/images/form/forgot-password.svg"
      title="Reset password successfully"
      subtitle="You're going to be directed to your account."
      onSubmit={handleSubmit}
    >
      <Success />
      <CustomButton type="primary" title="Continue " onClick={handleSubmit} />
    </SharedForm>
  );
};

export default ResetPasswordSuccess;
