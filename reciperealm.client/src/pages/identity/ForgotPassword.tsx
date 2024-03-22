import { NavLink } from "react-router-dom";
import ReCaptcha from "../../components/ReCaptcha";
import { FormEvent, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPassword = () => {
  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
  };

  return (
    <section className="py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="mb-5">
              <h4 className="text-center mb-4">Password Reset</h4>
            </div>
            <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <form method="POST" onSubmit={onSubmitHandler}>
                  <p className="text-center mb-4">
                    Provide the email address associated with your account to
                    recover your password.
                  </p>
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <ReCaptcha reCaptchaRef={reCaptchaRef} />
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Reset Password
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-4">
              <NavLink
                to="/login"
                className="link-secondary text-decoration-none"
              >
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
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
