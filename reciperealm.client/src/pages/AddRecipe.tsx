import {
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

import styles from "./Common/Form.module.css";

const AddRecipe = () => {
  const [recipeImages, setRecipeImages] = useState<string[]>([]);
  const [showRemovePhoto, setShowRemovePhoto] = useState<boolean>(false);

  const onMouseOverHandler: MouseEventHandler<HTMLImageElement> = () => {
    setShowRemovePhoto(true);
  };

  const onMouseLeaveHandler: MouseEventHandler<HTMLImageElement> = () => {
    setShowRemovePhoto(false);
  };

  const addImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const images: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          const imageDataUrl = reader.result as string;
          images.push(imageDataUrl);
          setRecipeImages((state) => [...state, imageDataUrl]);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <form className={styles.form}>
      <div className="form-group">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="email"
            id="email"
            placeholder=" Recipe Name"
            required
          />
          <label htmlFor="email" className="form-label">
            Recipe Name
          </label>
        </div>
      </div>
      <label>Recipe Images</label>
      <div className={styles.imagesContainer}>
        {recipeImages &&
          recipeImages.map((rI, index) => (
            <div
              className={styles.imageContainer}
              onMouseOver={() => setShowRemovePhoto(true)}
              onMouseLeave={() => setShowRemovePhoto(false)}
              key={index}
            >
              <img
                src={rI}
                className="img-thumbnail"
                key={index}
                onMouseOver={onMouseOverHandler}
              />
              <svg
                type="button"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className={"bi bi-x-square-fill " + styles.buttonOnHover}
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
              </svg>
            </div>
          ))}
      </div>
      <div className="form-group">
        <div
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-secondary"
        >
          <label className="form-label text-white m-1" htmlFor="customFile1">
            Choose files
          </label>
          <input
            type="file"
            className="form-control d-none"
            id="customFile1"
            multiple
            onChange={addImageHandler}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Cooking Steps
        </label>
        <textarea
          className="form-control"
          name="email"
          id="email"
          rows={4}
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="inputState">Difficulty</label>
          <select id="inputState" defaultValue="EAZY" className="form-control">
            <option>EAZY</option>
            <option>MEDIUM</option>
            <option>HARD</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputZip">Cooking Time</label>
          <div className="cs-form">
            <input type="time" className="form-control" />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipe;
