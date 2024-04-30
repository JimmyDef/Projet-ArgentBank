import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChangeProfileMutation } from "../redux/userApi";
import { updateUser } from "../redux/store";
import PropTypes from "prop-types";
import { Loader } from "./loaders/Loaders";
const UserInfoForm = ({ setDisplayEditForm }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    errors: false,
  });

  const [changeProfile, { isError, isLoading }] = useChangeProfileMutation();

  const cancelModification = (e) => {
    e.preventDefault();
    setFormData({ ...formData, firstName: "", lastName: "" });
    setDisplayEditForm(false);
  };

  const updateUserProfile = async () => {
    const updatedUserData = {
      firstName: formData.firstName || userData.firstName,
      lastName: formData.lastName || userData.lastName,
    };
    const queryParams = { token: userData.token, formData: updatedUserData };

    try {
      const response = await changeProfile(queryParams).unwrap();

      if (response.status === 200) {
        dispatch(updateUser(updatedUserData));
        setDisplayEditForm(false);
      }
    } catch (error) {
      setFormData({ ...formData, errors: false });
      console.log("🚀 ~ error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName && !formData.lastName)
      return setFormData({ ...formData, errors: true });

    updateUserProfile();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-edit-user-infos">
      <div className="input-wrapper">
        <div className="">
          <label htmlFor="firstName"></label>
          <input
            className={` input-user-info  ${
              formData.errors ? "input-error" : ""
            }`}
            type="text"
            id="firstName"
            placeholder={userData.firstName}
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="lastName"></label>
          <input
            className={` input-user-info  ${
              formData.errors ? "input-error" : ""
            }`}
            type="text"
            id="lastName"
            placeholder={userData.lastName}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <p className="inputErrorMsg">
            {formData.errors ? "Please fill in empty fields." : " "}
          </p>
          <p className="inputErrorMsg">
            {isError ? "Server not responding. Try it again" : " "}
          </p>
        </div>
      )}

      <div className="edit-button-wrapper">
        <button className="edit-button edit-button-form">
          {isLoading ? <Loader extraClass="small" /> : "Save"}
        </button>
        <button
          className="edit-button edit-button-form"
          onClick={cancelModification}>
          Cancel
        </button>
      </div>
    </form>
  );
};

UserInfoForm.propTypes = {
  setDisplayEditForm: PropTypes.func.isRequired,
};
export default UserInfoForm;
