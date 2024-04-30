import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfos } from "../redux/store";
import { removeItemStorage } from "./../utils/modules";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(clearUserInfos());
    removeItemStorage();
    navigate("/");
  };

  return (
    <header className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      {userData.firstName ? (
        <div className="main-nav-item-wrapper">
          <Link className="main-nav-item" to="profile">
            <FontAwesomeIcon
              icon={faCircleUser}
              size="2xl"
              className="logged-in-icons nav-icon"
            />
            <span className="span-hidden">{userData.firstName}</span>
          </Link>
          <Link className="main-nav-item" onClick={handleSignOut}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="2xl"
              className="    nav-icon"
            />
            <span className="span-hidden">Sign out</span>
          </Link>
        </div>
      ) : (
        <Link className="main-nav-item" to="sign-in">
          <FontAwesomeIcon
            icon={faCircleUser}
            size="2xl"
            className="nav-icon sign-in"
          />
          <span className="span-hidden-sign-in-txt">Sign In</span>
        </Link>
      )}
    </header>
  );
};

export default Header;
