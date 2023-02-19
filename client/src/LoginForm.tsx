import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "./lib/pocketbase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const authData = await pb.collection('users').authWithPassword(email, password);
    console.log(authData)
    if (authData) {
      if (authData.record.verified) {
        sessionStorage.setItem("isLoggedIn", "true");
        setMessage("Login successful");
        toast("Login successful");
        navigate('/', { replace: true });
      }
      else {
        toast("Please verify your email address");
      }
    }
    else {
      console.log("Login failed");
      toast("Login failed");
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <a href="#">Forgot password?</a>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <div>
        <button type="button" onClick={() => navigate('/register', { replace: true })}>Register</button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default LoginForm;