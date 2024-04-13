import { Dispatch, FC, SetStateAction, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

import styles from "./ImageCropper.module.css";
import { generateCroppedImage } from "./canvasUtils";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { IUserLoginValues } from "../../abstractions/identity";
import { useChangeProfilePicture } from "../../customHooks/identity/useChangeProfilePicture";
import { useAppDispatch } from "../../customHooks/helpers";

interface ImageCopperResult {
  image: string | ArrayBuffer | null;
  setShowCropper: Dispatch<React.SetStateAction<boolean | undefined>>;
}
const ImageCropper: FC<ImageCopperResult> = ({
  image,
  setShowCropper,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area>();
  const dispatch = useAppDispatch();

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const userData = useAuthUser<IUserLoginValues>();
  const { changePicture } = useChangeProfilePicture();
  const onSetImageHandler = async () => {
    const img = await generateCroppedImage(image, croppedArea);
    if (img === null) {
      alert("Please crop again");
      return;
    }
    await changePicture(userData!.email, img);
    setShowCropper(false);
  };

  return (
    <div>
      <div className={styles.cropContainer}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          cropShape="round"
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <button onClick={onSetImageHandler} className={styles.button}>
          Done
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
