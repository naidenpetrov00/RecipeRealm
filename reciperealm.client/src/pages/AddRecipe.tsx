import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";

import styles from "./Common/Form.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IAddRecipesFormValues,
  InvalidInputErrorMessges,
} from "../abstractions/recipes";

const AddRecipe = () => {
  const [recipeImages, setRecipeImages] = useState<string[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddRecipesFormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

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
  //event: React.MouseEvent<SVGSVGElement>
  const removeImageHandler = (index: number) => {
    const images =
      recipeImages.length === 1
        ? []
        : [...recipeImages.slice(0, index), ...recipeImages.slice(index + 1)];
    setRecipeImages(images);
  };

  const formSubmithandler: SubmitHandler<IAddRecipesFormValues> = (
    data: IAddRecipesFormValues
  ) => {
    data.recipeImages = recipeImages;
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(formSubmithandler)}>
      <div className="form-group">
        {errors.recipeName && (
          <p className="text-danger">{errors.recipeName.message}</p>
        )}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="recipeName"
            placeholder=" Recipe Name"
            {...register("recipeName", {
              required: InvalidInputErrorMessges.EmptyInput,
              minLength: {
                value: 5,
                message: InvalidInputErrorMessges.MinLengthName,
              },
              maxLength: {
                value: 100,
                message: InvalidInputErrorMessges.MaxLengthName,
              },
            })}
          />
          <label htmlFor="recipeName" className="form-label">
            Recipe Name
          </label>
        </div>
      </div>
      <label>Recipe Images</label>
      <div className={styles.imagesContainer}>
        {recipeImages &&
          recipeImages.map((rI, index) => (
            <div className={styles.imageContainer} key={index}>
              <img src={rI} className="img-thumbnail" key={index} />
              <svg
                type="button"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="red"
                className={"bi bi-x-square-fill " + styles.buttonOnHover}
                viewBox="0 0 16 16"
                onClick={() => removeImageHandler(index)}
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
          <label className="form-label text-white m-1" htmlFor="recipeImages">
            Choose files
          </label>
          <input
            type="file"
            className="form-control d-none"
            id="recipeImages"
            name="recipeImages"
            multiple
            onChange={addImageHandler}
          />
        </div>
      </div>
      <div className="form-group">
        {errors.cookingSteps && (
          <p className="text-danger">{errors.cookingSteps.message}</p>
        )}
        <label htmlFor="cookingSteps" className="form-label">
          Cooking Steps
        </label>
        <textarea
          className="form-control"
          id="cookingSteps"
          rows={10}
          {...register("cookingSteps", {
            required: InvalidInputErrorMessges.EmptyInput,
            minLength: {
              value: 10,
              message: InvalidInputErrorMessges.MinLengthSteps,
            },
            maxLength: {
              value: 2000,
              message: InvalidInputErrorMessges.MaxLengthSteps,
            },
          })}
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          {errors.difficulty && (
            <p className="text-danger">{errors.difficulty.message}</p>
          )}
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue="EAZY"
            className="form-control"
          >
            <option>EAZY</option>
            <option>MEDIUM</option>
            <option>HARD</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="cookingTime">Cooking Time</label>
          <div className="cs-form">
            <input
              type="time"
              id="cookingTime"
              className="form-control"
              {...register("cookingTime", {
                required: InvalidInputErrorMessges.EmptyInput,
              })}
            />
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
