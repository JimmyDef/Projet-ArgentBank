import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/store";
import UserInfoForm from "../components/UserInfoForm";
import { useGetProfileMutation } from "../redux/userApi";
import { isTokenValid } from "./../utils/modules";
import Account from "../components/Account";
import { LoaderInto404 } from "../components/loaders/Loaders";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getProfile] = useGetProfileMutation();

  const userState = useSelector((state) => state.user);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // -----------------
    // Si pas de token localstorage et pas de token dans redux: retour Sign-IN.
    if (!isTokenValid() && !userState.token) {
      return navigate("/sign-in");
    }

    // Vérifie si les données du profil de l'utilisateur sont déjà chargées
    if (userState.token && userState.firstName) return setIsLoading(false);

    // Si l'utilisateur est authentifié mais les données de profil ne sont pas chargées, récupère les données du profil.

    if (userState.token) {
      // -------------------
      // Si réponse n'est pas 200 => retour page de connexion.
      // Si utilisateur authentifié => Mise à jour du store Redux et fin du Loader.
      // Si le erreur du serveur => page 404.
      // -------------------
      const fetchProfileData = async () => {
        try {
          const response = await getProfile(userState.token).unwrap();
          if (response.status !== 200) return navigate("/sign-in");
          dispatch(updateUser(response.body));
          setIsLoading(false);
        } catch (error) {
          console.log("🚀 ~ error getProfile PROFILE:", error);
          navigate("/not-found");
        }
      };

      fetchProfileData();
    }
  }, [userState.token, userState.firstName, dispatch, navigate, getProfile]);

  return (
    <main className="main bg-dark">
      {isLoading ? (
        <LoaderInto404 extraclass="format-XXL" />
      ) : (
        <>
          <div className="header">
            <h1>
              Welcome back
              <br />
              {userState.firstName} {userState.lastName} !
            </h1>
            {isEditModeActive ? (
              <UserInfoForm
                isEditModeActive={isEditModeActive}
                setIsEditModeActive={setIsEditModeActive}
              />
            ) : (
              <button
                className="edit-button"
                onClick={() => setIsEditModeActive(true)}>
                Edit Name
              </button>
            )}
          </div>
          <h2 className="sr-only">Accounts</h2>
          <Account
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            description="Available Balance"
          />
          <Account
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            description="Available Balance"
          />
          <Account
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
          />
        </>
      )}
    </main>
  );
};

export default Profile;
