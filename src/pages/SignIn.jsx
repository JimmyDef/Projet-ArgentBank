import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken, clearUserInfos } from "../redux/store";
import { useNavigate, Link } from "react-router-dom";
import { setItemStorage } from "./../utils/modules";
import { Loader } from "../components/loaders/Loaders";
import { useLoginMutation } from "../redux/userApi";
import { removeItemStorage } from "./../utils/modules";

const Signin = () => {
  const userData = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    isChecked: false,
  });
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckBox = (e) => {
    setFormData({ ...formData, isChecked: e.target.checked });
  };
  const handleChangeAccount = () => {
    dispatch(clearUserInfos());
    removeItemStorage();
    navigate("/sign-in");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const handleSignIn = async () => {
      try {
        const response = await login(formData).unwrap();
        if (response.status === 200) {
          dispatch(addToken(response.body.token));
          if (formData.isChecked) setItemStorage(response.body.token);
          if (!formData.isChecked) removeItemStorage();
          navigate("/profile");
        }
      } catch (error) {
        console.log("🚀 ~ error POST SignIn:", error);
        if (error.status === 400) return;
        if (error.status === "FETCH_ERROR") return navigate("/not-found");
      }
    };
    handleSignIn();
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} size="2xl" />
        {!userData.token ? (
          <>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div
                className={
                  !isError ? "input-wrapper" : "input-wrapper warning"
                }>
                <label htmlFor="username">Username</label>
                <input
                  required
                  type="email"
                  id="username"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                />
              </div>
              <div
                className={
                  !isError ? "input-wrapper" : "input-wrapper warning"
                }>
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <p className="warning-logs-msg">
                  {!isError ? "" : "Wrong IDs"}
                </p>
              </div>
              <div className="input-remember">
                <input
                  type="checkbox"
                  id="remember-me"
                  value={formData.isChecked}
                  onChange={handleCheckBox}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              <button className="sign-in-button">
                {!isLoading ? "Sign In" : <Loader />}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="sign-out-title">Change account ? </h1>
            <button
              className="sign-in-button sign-out-button"
              onClick={handleChangeAccount}>
              Sign out
            </button>
            <Link className="sign-out-back-profile" to="/profile">
              Back to user profile
            </Link>
          </>
        )}
      </section>
    </main>
  );
};

export default Signin;
