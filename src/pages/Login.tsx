import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!existingUser) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return;
    }

    navigate("/");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="w-full h-screen grid place-items-center bg-teal-400">
      <form onSubmit={handleSubmitForm} className="space-y-5">
        {showNotification && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Invalid email or password</span>
          </div>
        )}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            name="email"
            value={email}
            className="input input-bordered w-full max-w-xs"
            onChange={handleInput}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            name="password"
            value={password}
            className="input input-bordered w-full max-w-xs"
            onChange={handleInput}
          />
        </label>
        <div>
          <p className="text-center">If you don't have an account</p>
          <p className="text-center">
            Click on{" "}
            <Link className="text-red-600" to="/register">
              Register
            </Link>
          </p>
        </div>
        <button type="submit" className="btn btn-wide">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
