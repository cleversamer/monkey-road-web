import { useNavigate } from "react-router-dom";
import SharedForm from "v2/components/common/shared-form";
import Success from "v2/components/common/success";
import CustomButton from "v2/components/common/custom-button";
import { routes } from "v2/client";

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(routes.home.route);
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
