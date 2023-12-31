import { useRef } from "react";
import classes from "./ProfileForm.module.css";
import { AuthContext } from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInput = useRef();

  const { contextValue } = AuthContext();
  const authCtx = contextValue;

  const submitHandler = (e) => {
    e.preventDefault();

    const newEnterPassword = newPasswordInput.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC0N52YiWouQmFMwN-a49h9vYxMiPjRCFg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newEnterPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace("/auth");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInput}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
