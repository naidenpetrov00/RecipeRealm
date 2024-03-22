import { FC, RefObject, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface YourComponentProps {
  reCaptchaRef: RefObject<ReCAPTCHA>;
}

const SITEKEY = "6Le0VKEpAAAAAChYWfRUywk8O2uo7XK9Y2SXargE";

const ReCaptcha: FC<YourComponentProps> = ({ reCaptchaRef }) => {
  return (
    <ReCAPTCHA
      style={{ display: "inline-block" }}
      theme="dark"
      size="invisible"
      ref={reCaptchaRef}
      sitekey={SITEKEY}
    />
  );
};

export default ReCaptcha;
