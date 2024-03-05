import { useEffect } from "react";
import iconChat from "./../assets/img/icon-chat.png";
import iconMoney from "./../assets/img/icon-money.png";
import iconSecurity from "./../assets/img/icon-security.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser, addToken } from "../redux/store";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PROFILE_URL = `${import.meta.env.VITE_BASE_URL}/profile/`;

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));

    if (userToken) {
      const fetchProfileData = async () => {
        try {
          const res = await fetch(PROFILE_URL, {
            method: "post",
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          });

          if (!res.ok) return console.log("🚀 ~ !res.OK:", res);

          const data = await res.json();
          dispatch(updateUser(data.body));
          dispatch(addToken(userToken));
          navigate("/profile");
        } catch (error) {
          console.log("🚀 ~ error fetch POST:", error);
        }
      };

      fetchProfileData();
    }
  }, [dispatch, navigate, PROFILE_URL]);

  return (
    <main className="main">
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <div className="feature-item">
          <img src={iconChat} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className="feature-item">
          <img src={iconMoney} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">
            More savings means higher rates
          </h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className="feature-item">
          <img src={iconSecurity} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
