import { useState } from "react";
import "./ProfileForm.css";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import userContext from "./userContext";
import { useContext } from "react";

/** New user signup form.
 *
 * Props:
 * - update: function
 *
 * States:
 * - errors: []
 * - formData: {username, password}
 *
 * RoutesList -> ProfileForm
 */
function ProfileForm({ editUser }) {
  const { userDetails } = useContext(userContext);

  const initialState = {
    username: userDetails.username,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
  };

  const [errors, setErrors] = useState();
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  console.log("ProfileFormErrors", errors);

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
      await editUser(formData);
      navigate("/");
    } catch (err) {
      setErrors(err);
      console.log("errors", err);
    }
  }

  return (
    <div className="ProfileForm pt-5">
      <div>
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Profile</h3>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
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
                  <label htmlFor="first-name" className="form-label">
                    First name
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="last-name" className="form-label">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    id="last-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  ></input>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
              {errors &&
                errors.map((e, index) => <Alert key={index} err={e} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
