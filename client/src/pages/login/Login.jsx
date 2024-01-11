import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";

const ErrorMessage = ({ message }) => {
  return <div style={{ color: "black" }}>{message}</div>;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [err, setErr] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Update form validity whenever any input field changes
    setIsFormValid(userName !== ""  && password !== "");
  }, [userName, password]);

  const formData = {
    username: userName,
    password: password,
  };
  // console.log(formData)
  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log(formData);

    try {
      // console.log("wiht",formData);
      await login(formData);
      navigate("/");
    } catch (err) {
      setErr(err?.response?.data);
    }
  };

  const [passwordVisible,setPasswordVisible] = useState(false);

  const handleChange = ()=>{
    setPasswordVisible(!passwordVisible);
  }

  useEffect(() => {
    if (err) {
      // Set a timeout to hide the error message after 5 seconds
      const timeoutId = setTimeout(() => {
        setErr(null);
      }, 5000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [err]);

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
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type={`${passwordVisible === true ? "text":"password"}`}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div style={{ color: "black" }}>
              <input value="test" type="checkbox" color="black" onChange={handleChange}/> Show password
            </div>
            <div color="black"> {err && <ErrorMessage message={err} />}</div>
            <button onClick={handleLogin} disabled={!isFormValid}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
