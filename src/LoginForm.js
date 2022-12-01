import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

function LoginForm({ login }) {
  const initialState = {
    username: "testuser_1",
    password: "password"
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    login(formData);
    navigate("/");
  }

  return (
    <div className="SignUpForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}>
        </input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}>
        </input>
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;