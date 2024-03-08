import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateUser } from "../redux/store";
import PropTypes from "prop-types";

import styles from "./../sass/profile.module.scss";

const UserInfoForm = ({ setDisplayEditForm }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const cancelModification = (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setDisplayEditForm(false);
  };

  const updateUserProfile = async () => {
    const PROFILE_URL = `${import.meta.env.VITE_BASE_URL}/profile`;
    try {
      const res = await fetch(PROFILE_URL, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });
      if (!res.ok) {
        console.log("🚀 ~ !res.ok:", res.ok);
        return;
      }
      const response = await res.json();
      console.log("🚀 ~ update OK:", response);

      dispatch(updateUser({ firstName: firstName, lastName: lastName }));
      setFirstName("");
      setLastName("");
      setDisplayEditForm(false);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      return;
    }
    console.log("🚀 ~ updateUserProfile:");
    updateUserProfile();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div className="">
          <label htmlFor="firstName"></label>
          <input
            type="text"
            id="firstName"
            placeholder={userData.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="lastName"></label>
          <input
            type="text"
            id="lastName"
            placeholder={userData.lastName}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="">
          <button className="edit-button">Save</button>
          <button className="edit-button" onClick={cancelModification}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

UserInfoForm.propTypes = {
  setDisplayEditForm: PropTypes.func.isRequired,
};
export default UserInfoForm;
