import { Link } from "react-router-dom";
import styled from "styled-components";

const Error = styled.main`
text-align: center;
// margin: 100px auto ;
padding: 40px;
h1 {    
    font-size: 6rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #42b983;
    }
p {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 50px;
 
}
a {
    color: white;
    background-color: black;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    &:hover {
        background-color: #42b983;
        
    }
    }
`;

function NotFound() {
  return (
    <Error className="main">
      <h1>404</h1>
      <p>Quelque chose s&apos;est mal passé ... Revenez plus tard.</p>
      <Link to="/"> Retour page d&apos;accueil</Link>
    </Error>
  );
}
export default NotFound;
