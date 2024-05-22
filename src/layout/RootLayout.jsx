import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, addToken, clearUserInfos } from "../redux/store";
import { useGetProfileMutation } from "../redux/userApi";
import {
  getItemStorage,
  removeItemStorage,
  isTokenValid,
} from "./../utils/modules";

function RootLayout() {
  const [getProfile] = useGetProfileMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageLocation = useLocation();

  useEffect(() => {
    // Gestion du titre de la page en fonction de l'url
    switch (pageLocation.pathname) {
      case "/":
        document.title = "Homepage | Argent Bank";
        break;
      case "/profile":
        document.title = "Profile | Argent Bank";
        break;
      case "/sign-in":
        document.title = "Sign-In | Argent Bank";
        break;
      default:
        document.title = "Argent Bank";
    }

    if (!isTokenValid())
      // Si vérification du token  négative  => suppression, pas de tentative de connexion.

      return;

    /*----------------------------------
     Si Token présent dans le localStorage => Récupération du profile
     Si Jeton expired / mal renseigné: retour page log-In.
 ------------------------------------*/

    const userToken = getItemStorage();

    /*----------------------------------
     Fonction Tentative de fetch à l'aide du token localStorage.
     Si OK => On nourrie le store redux  avec les infos utilisateurs.
     Si jeton compromis/expiré => Nettoyage du localStorage et du store.
  ------------------------------------*/

    const fetchProfileData = async () => {
      try {
        const response = await getProfile(userToken).unwrap();
        dispatch(addToken(userToken));
        dispatch(updateUser(response.body));
      } catch (error) {
        console.log("🚀 ~ error getProfile Layout:", error);
        if (error.status === 401) {
          removeItemStorage();
          dispatch(clearUserInfos());
          navigate("/sign-in");
          return;
        }
        if (
          (error.status === "FETCH_ERROR" || "PARSING_ERROR") &&
          pageLocation.pathname === "/profile"
        )
          return navigate("/not-found");
      }
    };

    fetchProfileData();
  }, [dispatch, navigate, getProfile, pageLocation]);

  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

export default RootLayout;
