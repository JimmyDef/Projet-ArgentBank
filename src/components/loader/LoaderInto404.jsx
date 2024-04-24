import "./loader.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoaderInto404() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/NotFound");
    }, 2500);
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
}

export default LoaderInto404;
