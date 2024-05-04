import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken, clearUserInfos } from "../redux/store";
import { useNavigate, Link } from "react-router-dom";
import { setItemStorage } from "./../utils/modules";
import { Loader } from "../components/loaders/Loaders";
import { useSignInMutation } from "../redux/userApi";
import { removeItemStorage } from "./../utils/modules";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [signIn, { isLoading }] = useSignInMutation();
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    isChecked: false,
  });
  // --------------------------
  // Fonction pour gérer la soumission du formulaire de connexion
  // Si fetch OK  => ajout du token au store Redux et redirection page Profile.
  // Si erreur d'identifiant (error 400) => notification visuel (isError RTK Query)
  // Si Serveur indisponible => page 404
  // --------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    const handleSignIn = async () => {
      try {
        const response = await signIn(formData).unwrap();
        if (response.status === 200) {
          dispatch(addToken(response.body.token));
          if (formData.isChecked) setItemStorage(response.body.token);
          if (!formData.isChecked) removeItemStorage();
          navigate("/profile");
        }
      } catch (error) {
        console.log("🚀 ~ error POST SignIn:", error);
        if (error.status === 400) return setIsError(true);
        return navigate("/not-found");
      }
    };
    handleSignIn();
  };

  // --------------------------
  //Fonction déconnexion, nettoyage du store et du localStorage, retour page de connexion.
  // --------------------------

  const handleSignOut = () => {
    dispatch(clearUserInfos());
    removeItemStorage();
    navigate("/sign-in");
  };

  // --------------------------
  // Fonction gestion de la checkbox "remember me"
  // --------------------------
  const handleCheckBox = (e) => {
    setFormData({ ...formData, isChecked: e.target.checked });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} size="2xl" />
        {!userState.token ? (
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
              onClick={handleSignOut}>
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
