import { Link } from "react-router-dom";
import logo from "./../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="main-nav">
      <Link className="main-nav-logo" href="./index.html">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/sign-in">
          <FontAwesomeIcon icon={faCircleUser} size="lg" />
          <span>Sign In</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
