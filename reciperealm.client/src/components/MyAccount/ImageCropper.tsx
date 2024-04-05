import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

import styles from "./ImageCropper.module.css";
import getCroppedImg, { generateCroppedImage } from "./canvasUtils";

interface ImageCopperResult {
  image: string | ArrayBuffer | null;
  setImage: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  setShowCropper: Dispatch<React.SetStateAction<boolean | undefined>>;
}
const ImageCropper: FC<ImageCopperResult> = ({
  image,
  setImage,
  setShowCropper,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area>();

  const onCropComplete = (croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSetImageHandler = async () => {
    const img = await generateCroppedImage(image, croppedArea);
    console.log(typeof img);
    console.log(img);

    setImage(img);
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
