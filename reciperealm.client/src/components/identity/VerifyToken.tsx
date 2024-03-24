import { FC, FormEvent, Fragment, useRef } from "react";
import ReCaptcha from "../ReCaptcha";
import ReCAPTCHA from "react-google-recaptcha";

interface VerifyTokenProps {
  email: string;
}

const VerifyToken: FC<VerifyTokenProps> = ({ email }) => {
  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  const onValidateTokenHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <Fragment>
      <div className="mb-5">
        <h4 className="text-center mb-4">Enter Validation Token</h4>
      </div>
      <div className="card border border-light-subtle rounded-4">
        <div className="card-body p-3 p-md-4 p-xl-5">
          <form method="POST" onSubmit={onValidateTokenHandler}>
            <p className="text-center mb-4">
              Enter the validation token you received.
            </p>
            <div className="row gy-3 overflow-hidden">
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="token"
                    id="token"
                    placeholder="Token"
                    required
                  />
                  <label htmlFor="token" className="form-label">
                    Token
                  </label>
                </div>
              </div>
              <ReCaptcha reCaptchaRef={reCaptchaRef} />
              <div className="col-12">
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Validate Token
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyToken;
