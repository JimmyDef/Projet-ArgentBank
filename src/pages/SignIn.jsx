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
import { filterCharactersForEmail } from "./../utils/modules";
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [signIn, { isLoading, error }] = useSignInMutation();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    isChecked: false,
  });
  /* --------------------------
  Fonction pour gérer la soumission du formulaire de connexion
  Si fetch OK  => ajout du token au store Redux et redirection page Profile.
  Si erreur d'identifiant (error 400) => notification visuel (isError)
  Si Serveur indisponible => page 404
 -------------------------- */

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
      }
    };
    handleSignIn();
  };

  /*----------------------------------
  Fonction déconnexion, nettoyage du store et du localStorage, retour page de connexion.
------------------------------------*/

  const handleSignOut = () => {
    dispatch(clearUserInfos());
    removeItemStorage();
    navigate("/sign-in");
  };

  /*----------------------------------
  Fonction gestion de la checkbox "remember me"
------------------------------------*/
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
                  error?.status === 400
                    ? "input-wrapper warning"
                    : "input-wrapper"
                }>
                <label htmlFor="username">Username</label>
                <input
                  required
                  type="email"
                  id="username"
                  value={formData.userName}
                  onChange={(e) => {
                    const sanitizedValue = filterCharactersForEmail(
                      e.target.value
                    );
                    setFormData({
                      ...formData,
                      userName: sanitizedValue,
                    });
                  }}
                />
              </div>
              <div
                className={
                  error?.status === 400
                    ? "input-wrapper warning"
                    : "input-wrapper"
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
                  {error?.status === 400 ? "Wrong IDs" : null}
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
              {error && error.status !== 400 ? (
                <p className="fetch-error-msg">Server not responding</p>
              ) : null}
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
