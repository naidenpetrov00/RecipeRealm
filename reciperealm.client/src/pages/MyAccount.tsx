import defaultProfilePicture from "../assets/vecteezy_default-avatar-profile-icon-vector-in-flat-style_27708418.jpg";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AvatarEditor from "react-avatar-editor";

import "./MyAccount.css";
import { IUserLoginValues } from "../abstractions/identity";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import ImageCropper from "../components/MyAccount/ImageCropper";

const MyAccount = () => {
  const [showChangeButton, setShowChangeButton] = useState<boolean>(false);
  const user = useAuthUser<IUserLoginValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  console.log("from MyAccount");


  const handleUpload = () => {
    console.log("Selected File:", selectedFile);
  };

  return (
    <Fragment>
      {selectedFile && <ImageCropper image={selectedFile} />}
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
                src={defaultProfilePicture}
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
