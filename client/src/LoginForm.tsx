import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "./lib/pocketbase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      console.log(authData)
      if (authData?.record) {
        if (authData?.record?.verified) {
          localStorage.setItem("isLoggedIn", "true");
          console.log(localStorage.getItem("isLoggedIn"));
          navigate('/', { replace: true });
          toast.success("Login successful");
        }
        else {
          toast.error("Please verify your email address")
        }
      }
      else {
        console.log("Login failed");
        toast.error(authData?.meta?.message || "Login failed");
      }
    }
    catch (e: any) {
      console.log(e);
      setError(e?.message);
      toast.error(e?.message || "Login failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <h2 style={{ "textAlign": "center" }}>Login</h2>
      <form onSubmit={handleSubmit} >
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
          <button type="submit" className="button-form">Login</button>
        </div>
        <div>
          <p>Don't have an account?</p>
          <button type="button" onClick={() => navigate('/register', { replace: true })}>Register</button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
}

export default LoginForm;