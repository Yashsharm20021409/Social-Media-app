import { Link } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const handleLogin = ()=>{
    
  }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Social World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            officia exercitationem expedita explicabo quos ipsum!
          </p>
          <span>Don't You have an account?</span>
          {/* <Link to="/register"> */}
            <button>Register</button>
          {/* </Link> */}
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
