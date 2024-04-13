import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import "./MyAccount.css";
import { IUserLoginValues } from "../abstractions/identity";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import ImageCropper from "../components/MyAccount/ImageCropper";
import { useAppSelector } from "../customHooks/helpers";

const MyAccount = () => {
  const [showChangeButton, setShowChangeButton] = useState<boolean>(false);
  const user = useAuthUser<IUserLoginValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePicture = useAppSelector((state) => state.picture.value);
  const [showCropper, setShowCropper] = useState<boolean>();
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file === undefined || file === null) {
      alert("Cannot find file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.addEventListener("load", () => {
      setShowCropper(true);
      setSelectedFile(reader.result);
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Fragment>
      {showCropper && (
        <ImageCropper
          image={selectedFile}
          setShowCropper={setShowCropper}
        />
      )}
      <section className="profile">
        <header className="header">
          <div className="details">
            <div
              className="profile-pic-container"
              onMouseLeave={() => setShowChangeButton(false)}
              onMouseOver={() => setShowChangeButton(true)}
            >
              {showChangeButton && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="fileInput"
                    ref={fileInputRef}
                  />
                  <button
                    className="button-on-hover"
                    onClick={handleButtonClick}
                  >
                    Change
                  </button>
                </div>
              )}
              <img
                src={profilePicture}
                alt="profile-picture"
                className="profile-pic"
              />
            </div>
            <h1 className="heading">{user?.username}</h1>
            <div className="location">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
              </svg>
              <p>Kochi, India</p>
            </div>
            <div className="stats">
              <div className="col-4">
                <h4>20</h4>
                <p>Reviews</p>
              </div>
              <div className="col-4">
                <h4>10</h4>
                <p>Communities</p>
              </div>
              <div className="col-4">
                <h4>100</h4>
                <p>Discussions</p>
              </div>
            </div>
          </div>
        </header>
      </section>
    </Fragment>
  );
};

export default MyAccount;
