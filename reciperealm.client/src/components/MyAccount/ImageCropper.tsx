import { FC, useMemo, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

import styles from "./ImageCropper.module.css";

interface ImageCopperResult {
  image: File;
}
const ImageCropper: FC<ImageCopperResult> = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const parsedImage = useMemo(() => URL.createObjectURL(image), [image]);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onSetImageHandler = () => {};

  return (
    <div>
      <div className={styles.cropContainer}>
        <Cropper
          image={parsedImage}
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
