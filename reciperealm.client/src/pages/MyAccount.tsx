import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ChangeEvent, Fragment, useRef, useState } from "react";

import MyRecipes from "../components/MyAccount/MyRecipes";
import ImageCropper from "../components/MyAccount/ImageCropper";

import { IUserLoginValues } from "../abstractions/identity";
import { useAppSelector } from "../customHooks/helpers";

import "./MyAccount.css";

const MyAccount = () => {
  const [showCropper, setShowCropper] = useState<boolean>();
  const [showChangeButton, setShowChangeButton] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    null
  );
  const user = useAuthUser<IUserLoginValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePicture = useAppSelector((state) => state.picture.value);

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
        <ImageCropper image={selectedFile} setShowCropper={setShowCropper} />
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
                src={profilePicture!}
                alt="profile-picture"
                className="profile-pic"
              />
            </div>
            <h1 className="heading">{user?.username}</h1>
            <div className="stats">
              <div className="col-6">
                <h4>20</h4>
                <p>Recipes</p>
              </div>
              <div className="col-6">
                <h4>10</h4>
                <p>Likes</p>
              </div>
            </div>
          </div>
        </header>
      </section>
      <MyRecipes />
    </Fragment>
  );
};

export default MyAccount;
