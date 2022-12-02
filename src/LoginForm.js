import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

/** Form for user to enter login information
 *
 * Props:
 * - login: function
 *
 * States:
 * - errors: []
 * - formData: {username, password, firstName, lastName, email}
 *
 * RoutesList -> LoginForm
 */
function LoginForm({ login }) {
  //TODO: global
  const initialState = {
    username: "testuser_1",
    password: "password",
  };
  //TODO: setErrors
  const [errors, seterrors] = useState();
  const [formData, setFormData] = useState(initialState);

  console.log("LoginFormErrors", errors);

  const navigate = useNavigate();

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
      seterrors(err);
      console.log("errors", err);
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
      {errors && errors.map((e, index) => <p key={index}>{e}</p>)}
    </div>
  );
}

export default LoginForm;
