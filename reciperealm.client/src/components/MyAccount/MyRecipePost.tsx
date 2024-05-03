import { FC, Fragment } from "react";

import "./MyRecipePost.css";
import TruncatedText from "./UI/TruncatedText";
import PostInteractionForm from "./UI/PostInteractionForm";
import { RecipeModel } from "../../abstractions/recipes";

interface MyRecipePostProps {
  recipeInfo: RecipeModel;
}
const MyRecipePost: FC<MyRecipePostProps> = ({ recipeInfo }) => {
  console.log(recipeInfo);

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-12">
          <div className="row">
            <div className="col-lg-2 col-sm-2 col-5">
              <img
                src="https://dummyimage.com/150x150/5a5a5a/ffffff"
                className="img-thumbnail"
                width="150px"
              />
            </div>
            <div className="col-lg-10 col-sm-10 col-7">
              <h4 className="text-primary">{recipeInfo.name}</h4>
              <TruncatedText
                text={recipeInfo.cookingSteps}
                maxLength={200}
              ></TruncatedText>
            </div>
          </div>
          <div className="row post-detail">
            <PostInteractionForm
              upVotes={recipeInfo.upVotes}
              downVotes={recipeInfo.downVotes}
              savesCount={recipeInfo.savesCount}
            />
            <div className="col text-right detail-box">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <span>Sept 16th,2017</span>
                </li>
                <li className="list-inline-item">
                  <span>Cooking Time</span>
                </li>
                <li className="list-inline-item">
                  <span> Difficulty</span>
                </li>
              </ul>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <hr></hr>
    </Fragment>
  );
};

export default MyRecipePost;
