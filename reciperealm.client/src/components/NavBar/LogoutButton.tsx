import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { useAppDispatch } from "../../customHooks/identity";
import { authenticated } from "../../store/authSlice";

const LogoutButon = () => {
  const navigation = useNavigate();
  const signOut = useSignOut();
  const isAuthCookie = useIsAuthenticated();
  const dispatch = useAppDispatch();

  const logoutButtonHandler = () => {
    signOut();
    dispatch(authenticated(isAuthCookie()));
    navigation("/");
  };

  return (
    <button className="btn" onClick={logoutButtonHandler}>
      Sign Out
    </button>
  );
};

export default LogoutButon;
