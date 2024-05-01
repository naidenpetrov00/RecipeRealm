import { Fragment } from "react";

import "./MyRecipePost.css";

const MyRecipePost = () => {
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
              <h4 className="text-primary">Post Title</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non
              </p>
              <button className="btn btn-sm btn-dark">Read more</button>
            </div>
          </div>
          <div className="row post-detail">
            <div className="col-lg-12 col-sm-12 col-12">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  <span>Sept 16th,2017</span>
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-comment" aria-hidden="true"></i>
                  <span className="text-info">3 Likes</span>
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-share-square-o" aria-hidden="true"></i>
                  <span className="text-info">39 Comments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </Fragment>
  );
};

export default MyRecipePost;
