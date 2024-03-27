import { NavLink } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";

import VerifyToken from "../../components/identity/VerifyToken";
import PasswordResetTokenSender from "../../components/identity/PasswordResetTokenSender";
import { useForgotPassword } from "../../customHooks/identity/useForgotPassword";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { forgotPasswordHandler } = useForgotPassword();
  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  const onEmailCodeSubmitHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    reCaptchaRef.current?.execute();
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
              <PasswordResetTokenSender
                onSubmit={onEmailCodeSubmitHandler}
                reCaptchaRef={reCaptchaRef}
              />
            )}
            {emailSent && <VerifyToken email={email} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
