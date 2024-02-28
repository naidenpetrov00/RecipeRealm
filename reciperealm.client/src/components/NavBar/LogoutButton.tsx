import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nonAuthenticated } from "../../store/authSlice";

const LogoutButon = () => {
  const navigation = useNavigate();
  const signOut = useSignOut();
  const dispatch = useDispatch();
  const logoutButtonHandler = () => {
    signOut();
    navigation("/");
    dispatch(nonAuthenticated());
  };

  return (
    <button className="btn" onClick={logoutButtonHandler}>
      Sign Out
    </button>
  );
};

export default LogoutButon;
