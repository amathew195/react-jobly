import { useState } from "react";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";

/** New user signup form.
 *
 * Props:
 * - signUp: function
 *
 * States:
 * - errors: []
 * - formData: {username, password}
 *
 * RoutesList -> SignUpForm
 */
function SignUpForm({ signUp }) {
  const initialState = {
    username: "testuser_1",
    password: "password",
    firstName: "test",
    lastName: "user",
    email: "testuser5@gmail.com",
  };
  //TODO: setErrors
  const [errors, seterrors] = useState();
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  console.log("SignUpErrors", errors);

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
      await signUp(formData);
      navigate("/");
    } catch (err) {
      seterrors(err);
      console.log("errors", err);
    }
  }

  return (
    <div className="SignUpForm">
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
        <label htmlFor="first-name">First name</label>
        <input
          id="first-name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        ></input>
        <label htmlFor="last-name">Last name</label>
        <input
          name="lastName"
          id="last-name"
          value={formData.lastName}
          onChange={handleChange}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <button>Submit</button>
      </form>
      {errors && errors.map((e, index) => <p key={index}>{e}</p>)}
    </div>
  );
}

export default SignUpForm;
