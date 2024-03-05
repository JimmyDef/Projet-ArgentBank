import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToken } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setItemStorage } from "./../utils/modules";

const Signin = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [formData, setFormData] = useState({
  //   userName: "",
  //   password: "",
  //   isChecked: false,
  // });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckBox = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleSubmit = (e) => {
    const LOGIN_URL = `${import.meta.env.VITE_BASE_URL}/login`;
    e.preventDefault();

    const handleSignIn = async () => {
      try {
        const res = await fetch(LOGIN_URL, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userName, password: password }),
        });

        if (!res.ok) return console.log("🚀 ~ !res.ok:", res.ok);

        const data = await res.json();

        dispatch(addToken(data.body.token));

        if (isChecked) {
          setItemStorage(data.body.token);
        }
        if (!isChecked) {
          setItemStorage("");
        }

        navigate("/profile");
      } catch (error) {
        console.log("🚀 ~ error POST SignIn:", error);
      }
    };
    handleSignIn();
  };
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} size="lg" />

        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              required
              type="email"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              value={isChecked}
              onChange={handleCheckBox}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default Signin;
