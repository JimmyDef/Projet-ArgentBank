import "./loaders.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

export const Loader = ({ extraClass }) => {
  return (
    <div className={`dot-spinner ${extraClass}`}>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  );
};

// ----------------------------
//Loader avec un timer qui envoie sur la page  404.
// ----------------------------

export const LoaderInto404 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("🚀 ~ Loader expired:");
      navigate("/not-found");
    }, 5000);

    return () => clearTimeout(timer);
  });
  return (
    <div className="dot-spinner format-XXL">
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  );
};

Loader.propTypes = {
  extraClass: PropTypes.string,
};
