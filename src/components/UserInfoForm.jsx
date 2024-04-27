import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChangeProfileMutation } from "../redux/userApi";
import { updateUser } from "../redux/store";
import PropTypes from "prop-types";

const UserInfoForm = ({ setDisplayEditForm }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    errors: { firstName: false, lastName: false },
  });

  const [changeProfile] = useChangeProfileMutation();
  const cancelModification = (e) => {
    e.preventDefault();
    setFormData({ ...formData, firstName: "", lastName: "" });
    setDisplayEditForm(false);
  };
  const updateUserProfile = async () => {
    const queryParams = { token: userData.token, formData };
    try {
      const response = await changeProfile(queryParams).unwrap();

      if (response.status === 200) {
        dispatch(
          updateUser({
            ...formData,
          })
        );

        setFormData({ ...formData, firstName: "", lastName: "" });
        setDisplayEditForm(false);
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.firstName) errors.firstName = true;
    if (!formData.lastName) errors.lastName = true;
    setFormData({ ...formData, errors: errors });
    console.log(formData);
    if (Object.keys(errors).length === 0) updateUserProfile();
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
              formData.errors.firstName ? "input-error" : ""
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
              formData.errors.lastName ? "input-error" : ""
            }`}
            type="text"
            id="lastName"
            placeholder={userData.lastName}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <p className="inputErrorMsg">
        {Object.values(formData.errors).includes(true)
          ? "Please fill in empty fields."
          : " "}
      </p>
      <div className="edit-button-wrapper">
        <button className="edit-button edit-button-reversed">Save</button>
        <button
          className="edit-button edit-button-reversed"
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
