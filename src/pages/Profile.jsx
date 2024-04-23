import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/store";
// import { addToken } from "../redux/store";
// import styles from "./../sass/profile.module.scss";
import UserInfoForm from "../components/UserInfoForm";
import { useGetProfileMutation } from "../redux/userApi";
import { getItemStorage, checkTokenValidity } from "./../utils/modules";
import Loader from "../components/loader/Loader";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getProfile] = useGetProfileMutation();
  const userData = useSelector((state) => state.user);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🚀 ~checkTokenValidity() ", checkTokenValidity());
    // Si la session s'ouvre directement sur /profile/ et que la vérification du token est négative, on est envoyé sur Sign-IN.
    if (!checkTokenValidity()) return navigate("/sign-in");

    if (userData.token) {
      const fetchProfileData = async () => {
        try {
          const response = await getProfile(userData.token).unwrap();
          if (response.status !== 200) {
            console.log("🚀 ~ response not OK: ", response.status);
            return navigate("/sign-in");
          }

          dispatch(updateUser(response.body));
          setIsLoading(false);
        } catch (error) {
          console.log("🚀 ~ error getProfile PROFILE:", error);
        }
      };
      fetchProfileData();
    }
  }, [userData.token, dispatch, navigate, getProfile]);

  return (
    <main className="main bg-dark">
      {isLoading ? (
        <Loader />
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
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Profile;
