import PropTypes from "prop-types";

const Account = ({ title, amount, description }) => (
  <section className="account">
    <div className="account-content-wrapper">
      <h3 className="account-title">{title}</h3>
      <p className="account-amount">{amount}</p>
      <p className="account-amount-description">{description}</p>
    </div>
    <div className="account-content-wrapper cta">
      <button className="transaction-button">View transactions</button>
    </div>
  </section>
);

Account.propTypes = {
  description: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default Account;
