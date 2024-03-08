import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/store";
import { addToken } from "../redux/store";
// import styles from "./../sass/profile.module.scss";
import UserInfoForm from "./../components/UserInfoForm";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PROFILE_URL = `${import.meta.env.VITE_BASE_URL}/profile/`;
  const userData = useSelector((state) => state.user);
  const [displayEditForm, setDisplayEditForm] = useState(false);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));

    if (!userData.token && !userToken) return navigate("/sign-in");
    if (!userData.token) {
      dispatch(addToken(userToken));
    }
    if (userData.token) {
      const fetchProfileData = async () => {
        try {
          const res = await fetch(PROFILE_URL, {
            method: "post",
            headers: {
              authorization: `Bearer ${userData.token}`,
            },
          });

          if (!res.ok) {
            console.log("🚀 ~ !res.OK:", res);
            return navigate("/sign-in");
          }

          const data = await res.json();
          dispatch(updateUser(data.body));
        } catch (error) {
          console.log("🚀 ~ error fetch POST:", error);
        }
      };

      fetchProfileData();
    }
  }, [userData.token, dispatch, navigate, PROFILE_URL]);

  return (
    <main className="main bg-dark">
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
    </main>
  );
};

export default Profile;
