import { FC, FormEvent, Fragment, useRef, useState } from "react";
import ReCaptcha from "../ReCaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import { useValidateToken } from "../../customHooks/identity/useValidateToken";
import ChangePassword from "./ChangePassword";

interface VerifyTokenProps {
  email: string;
}
const VerifyToken: FC<VerifyTokenProps> = ({ email }) => {
  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const [invalidToken, setInvalidToken] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(true);

  const { checkToken } = useValidateToken();
  const onSubmitTokenHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = event.currentTarget.token.value;
    var tokenValidity = await checkToken(token, email);
    handleTokenValidityResult(tokenValidity);
  };

  const handleTokenValidityResult = (result: boolean | undefined) => {
    if (result == undefined) {
      alert(
        "Token validation unsuccessfull!\nPlease try again or contact support"
      );
    } else if (result === true) {
      setInvalidToken(false);
      setShowChangePassword(true);
    } else {
      setInvalidToken(true);
    }
  };

  return (
    <Fragment>
      {showChangePassword && <ChangePassword emailOnChangingUser={email} />}
      {!showChangePassword && (
        <Fragment>
          <div className="mb-5">
            <h4 className="text-center mb-4">Enter Validation Token</h4>
          </div>
          <div className="card border border-light-subtle rounded-4">
            <div className="card-body p-3 p-md-4 p-xl-5">
              <form method="POST" onSubmit={onSubmitTokenHandler}>
                <p className="text-center mb-4">
                  Enter the validation token you received.
                </p>
                <div className="row gy-3 overflow-hidden">
                  <div className="col-12">
                    {invalidToken && (
                      <p className="text-danger">Invalid Token</p>
                    )}
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
          </div>{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export default VerifyToken;
