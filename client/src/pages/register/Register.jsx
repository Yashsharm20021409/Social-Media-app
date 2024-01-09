import { useEffect, useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ErrorMessage = ({ message }) => {
  return <div style={{ color: "black" }}>{message}</div>;
};

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Update form validity whenever any input field changes
    setIsFormValid(name !== "" && (username !== "" && username.length >3 ) && password !== "" && email !== "");
  }, [name, username, password, email]);

  const formData = {
    name: name,
    username: username,
    email: email,
    password: password,
  };

  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setName("");
      setPassword("");
      setUserName("");
      setEmail("");
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

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
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button onClick={handleSubmit} disabled={!isFormValid}>Register</button>
            <div color="black"> {err && <ErrorMessage message={err} />}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
