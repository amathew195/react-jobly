import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Alert from "./Alert";

const initialState = {
  username: "testuser_1",
  password: "password",
};

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

  const [errors, setErrors] = useState();
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
      setErrors(err);
      console.log("errors", err);
    }
  }

  return (
    <div className="LoginForm pt-5" >
      <div>
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Log In</h3>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                  ></input>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
              {errors && errors.map((e, index) => <Alert key={index} err={e} />)}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default LoginForm;
