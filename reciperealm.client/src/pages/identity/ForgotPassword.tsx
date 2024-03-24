import { NavLink } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useForgotPassword } from "../../customHooks/identity";
import PasswordResetTokenSender from "../../components/identity/PasswordResetTokenSender";
import VerifyToken from "../../components/identity/VerifyToken";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { forgotPasswordHandler } = useForgotPassword();

  const onEmailCodeSubmitHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    setEmail(email);
    var result = await forgotPasswordHandler(email);
    setEmailSent(result.emailSent);
  };

  return (
    <section className="py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            {!emailSent && (
              <PasswordResetTokenSender onSubmit={onEmailCodeSubmitHandler} />
            )}
            {emailSent && <VerifyToken email={email} />}
          </div>
        </div>
        <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-4">
          <NavLink to="/login" className="link-secondary text-decoration-none">
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="link-secondary text-decoration-none"
          >
            Register
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
