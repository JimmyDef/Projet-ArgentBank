import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/store";
import UserInfoForm from "../components/UserInfoForm";
import { useGetProfileMutation } from "../redux/userApi";
import { isTokenValid } from "./../utils/modules";
import Account from "../components/Account";

import LoaderInto404 from "../components/loader/LoaderInto404";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getProfile, { isError }] = useGetProfileMutation();

  const userData = useSelector((state) => state.user);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Possibilité d'un accès direct à /profile/ :
    // Si pas de token localstorage et pas de token dans redux: retour Sign-IN.
    console.log("🚀 ~ userData.token:", userData.token);
    if (!isTokenValid() && !userData.token) return navigate("/sign-in");
    // if (!userData.token) return navigate("/sign-in");
    if (userData.token) {
      console.log("🚀 ~ userData.token2:", userData.token);

      const fetchProfileData = async () => {
        try {
          const response = await getProfile(userData.token).unwrap();
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
  }, [userData.token, dispatch, navigate, getProfile, isError]);

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
              {userData.firstName} {userData.lastName} !
            </h1>
            {displayEditForm ? (
              <UserInfoForm
                displayEditForm={displayEditForm}
                setDisplayEditForm={setDisplayEditForm}
              />
            ) : (
              <button
                className="edit-button"
                onClick={() => setDisplayEditForm(true)}>
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
