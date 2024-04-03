import { FC, useMemo, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

import styles from "./ImageCropper.module.css";
import getCroppedImg, { generateCroppedImage } from "./canvasUtils";
import { useNavigate } from "react-router-dom";

interface ImageCopperResult {
  image: File;
}
const ImageCropper: FC<ImageCopperResult> = ({
  image,
  setImage,
  setShowCropper,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState<Area>();

  // const parsedImage = useMemo(() => URL.createObjectURL(image), [image]);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };
  const onSetImageHandler = async () => {
    const img = await generateCroppedImage(image, croppedArea);
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
