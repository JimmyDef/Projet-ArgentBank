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
    // Si vérification du token  négative  => suppression, pas de tentative de connexion.

    if (!isTokenValid()) return;

    // ----------------------------
    // Si Token présent dans le localStorage => Récupération du profile
    // Si Jeton expired / mal renseigné: retour page log-In.
    // ----------------------------

    const userToken = getItemStorage();

    // ----------------------------
    // Fonction Tentative de fetch à l'aide du token localStorage.
    // Si OK => On nourrie le store redux  avec les infos utilisateurs.
    // Nettoyage du localStorage et du store si jeton compromis/expiré.
    // ----------------------------

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
          error.status === "FETCH_ERROR" &&
          pageLocation.pathname === "/profile"
        )
          return navigate("/NotFound");
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
