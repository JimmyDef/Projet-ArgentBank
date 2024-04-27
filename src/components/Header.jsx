import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfos } from "../redux/store";
import { updateUser, addToken } from "../redux/store";
import { useGetProfileMutation } from "../redux/userApi";
import {
  getItemStorage,
  removeItemStorage,
  isTokenValid,
} from "./../utils/modules";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [getProfile] = useGetProfileMutation();

  const handleSignOut = () => {
    dispatch(clearUserInfos());
    removeItemStorage();
    navigate("/");
  };

  useEffect(() => {
    // Si la vérification du token est négative, on ne se connecte  pas et on reste sur la page d'accueil.
    if (!isTokenValid()) return removeItemStorage();
    const userToken = getItemStorage();

    // ----------------------------
    // Récupération du profile si un token est présent et valide dans le local storage. Si jeton expired ou mal renseigné: retour log-In.

    const fetchProfileData = async () => {
      try {
        const response = await getProfile(userToken).unwrap();

        console.log("🚀 ~ response:", response);

        dispatch(addToken(userToken));
        dispatch(updateUser(response.body));
      } catch (error) {
        console.log("🚀 ~ error getProfile Header:", error);
        if (error.status === 401) return navigate("/sign-in");
      }
    };

    fetchProfileData();
  }, [dispatch, navigate, getProfile]);

  return (
    <header className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      {userData.firstName ? (
        <div className="main-nav-item-wrapper">
          <Link className="main-nav-item" to="profile">
            <FontAwesomeIcon
              icon={faCircleUser}
              size="2xl"
              className="logged-in-icons nav-icon"
            />
            <span className="span-hidden">{userData.firstName}</span>
          </Link>
          <Link className="main-nav-item" onClick={handleSignOut}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="2xl"
              className="  logged-in-icons  nav-icon"
            />
            <span className="span-hidden">Sign out</span>
          </Link>
        </div>
      ) : (
        <Link className="main-nav-item" to="sign-in">
          <FontAwesomeIcon
            icon={faCircleUser}
            size="2xl"
            className="nav-icon sign-in"
          />
          <span className="span-hidden-sign-in-txt">Sign In</span>
        </Link>
      )}
    </header>
  );
};

export default Header;
