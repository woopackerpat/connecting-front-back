import React, { useContext, useState } from "react";
import { validateLogin } from "../services/validate";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../contexts/AuthContext'

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [err, setError] = useState({});
  const [apiError, setApiError] = useState("");

  const {login, logout} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    const errResult = validateLogin({
      username,
      password,
    });
    setError(errResult);
    if (Object.keys(errResult).length === 0) {
      try {
        const res = await axios.post("/users/login", { username, password });
        localStorage.setItem("accessToken", res.data.token);
        login()
        navigate("/");
      } catch (error) {
        if (error.response) {
          setApiError(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="border border-1 round-3 p-4 bg-white shadow-sm">
      <form onSubmit={handleSubmitForm}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control `}
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3"></div>

        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
        {apiError && (
          <div className="alert alert-danger" role="alert">
            {apiError}
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
