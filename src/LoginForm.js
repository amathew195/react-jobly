import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "./userContext";
import { useContext } from "react";
import "./SignUpForm.css";

function LoginForm({ login }) {
  const initialState = {
    username: "testuser_1",
    password: "password",
  };

  const [error, setError] = useState();
  const [formData, setFormData] = useState(initialState);

  console.log("LoginForm", error);

  const navigate = useNavigate();
  const { token } = useContext(userContext);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(err);
      console.log("ERROR", err);
    }
  }

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <button>Login</button>
      </form>
      {token.err && <p>{token.err}</p>}
    </div>
  );
}

export default LoginForm;
