import { redirect } from "react-router-dom";

export const logoutAction = () => {
  console.log("from logout action");

  return redirect("/");
};
