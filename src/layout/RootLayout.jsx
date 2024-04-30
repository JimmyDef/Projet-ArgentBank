import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, addToken } from "../redux/store";
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
    // Si la vérification du token est négative, on ne se connecte  pas et on reste sur la page d'accueil.
    if (!isTokenValid()) return removeItemStorage();
    const userToken = getItemStorage();

    // ----------------------------
    // Récupération du profile si un token est présent et valide dans le local storage. Si jeton expired ou mal renseigné: retour log-In.

    const fetchProfileData = async () => {
      try {
        const response = await getProfile(userToken).unwrap();
        dispatch(addToken(userToken));
        dispatch(updateUser(response.body));
      } catch (error) {
        console.log("🚀 ~ error getProfile Layout:", error);
        if (error.status === 401) {
          removeItemStorage();
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
