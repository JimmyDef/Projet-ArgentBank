import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "../redux/userApi";
import { updateUser } from "../redux/store";
import PropTypes from "prop-types";
import { Loader } from "./loaders/Loaders";
import { clearUserInfos } from "../redux/store";
import { removeItemStorage } from "./../utils/modules";
import { useNavigate } from "react-router-dom";
import { filterNonAlphabeticCharacters } from "./../utils/modules";

const UserInfoForm = ({ setIsEditModeActive }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    errors: false,
  });

  const [updateProfile, { isError, isLoading }] = useUpdateProfileMutation();

  // --------------------------
  // Fonction submit formulaire et vérification des champs de données:
  //  - Si aucun champs renseigné => notification visuel
  //  - Si OK : => push dataBase + redux
  // --------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName && !formData.lastName)
      return setFormData({ ...formData, errors: true });

    submitProfileUpdate();
  };

  // --------------------------
  // Fonction mise à jour profil utilisateur:  Fetch API + état Redux.
  // Si Fetch OK => update du store et fermeture du form.
  // Si erreur Authentification => Nettoyage du localStorage et du store, retour page log-in.
  // Si serveur distant inaccessible => notification visuel via isError fourni par RTK query.
  // --------------------------

  const submitProfileUpdate = async () => {
    const updatedUserData = {
      firstName: formData.firstName || userData.firstName,
      lastName: formData.lastName || userData.lastName,
    };
    const queryParams = { token: userData.token, formData: updatedUserData };

    try {
      const response = await updateProfile(queryParams).unwrap();

      if (response.status === 200) {
        dispatch(updateUser(updatedUserData));
        setIsEditModeActive(false);
      }
    } catch (error) {
      if (error.status === 401) {
        removeItemStorage();
        dispatch(clearUserInfos());
        navigate("/sign-in");
        return;
      }
      setFormData({ ...formData, errors: false });
      console.log("🚀 ~ error userInfoForm:", error);
    }
  };

  // --------------------------
  // Fonction gestion des changements dans les champs du formulaire.
  // --------------------------
  const handleChange = (e) => {
    const { id, value } = e.target;
    const cleanedValue = filterNonAlphabeticCharacters(value);
    setFormData({
      ...formData,
      [id]: cleanedValue,
    });
  };

  // --------------------------
  // Fonction annulation et fermeture du formulaire  nom/prénom
  // --------------------------
  const cancelProfileUpdate = (e) => {
    e.preventDefault();
    setFormData({ ...formData, firstName: "", lastName: "" });
    setIsEditModeActive(false);
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
          onClick={cancelProfileUpdate}>
          Cancel
        </button>
      </div>
    </form>
  );
};

UserInfoForm.propTypes = {
  setIsEditModeActive: PropTypes.func.isRequired,
};
export default UserInfoForm;
