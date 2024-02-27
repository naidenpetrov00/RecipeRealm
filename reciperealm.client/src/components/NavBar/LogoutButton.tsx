import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const LogoutButon = () => {
  const navigation = useNavigate();
  const signOut = useSignOut();
  const logoutButtonHandler = () => {
    signOut();
    navigation("/");
  };

  return (
    <button className="btn" onClick={logoutButtonHandler}>
      Sign Out
    </button>
  );
};

export default LogoutButon;
