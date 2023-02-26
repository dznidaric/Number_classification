import React, { useState } from "react";
import { pb } from "../lib/pocketbase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = {
        "email": email,
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": confirmPassword,
      };
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const created = await pb.collection('users').create(data);
      console.log(created);
      await sendEmailVerification();
    } catch (e: any) {
      console.log(e);
      toast.error(e?.data?.data?.email?.message || e?.message || "Registration failed");
    }
  }


  async function sendEmailVerification() {
    try {
      const verification = await pb.collection('users').requestVerification(email);
      console.log(verification);
      toast.info("Check your email for verification link");
      navigate("/login", { replace: true })

    } catch (error: any) {
      toast.error(error?.message || "Email verification failed");
    }
  }

  return (
    <>
      <h2 style={{ "textAlign": "center" }}>Registration</h2>
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
          <label htmlFor="password">Confirm password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit" className="button-form">Register</button>
        </div>
        <div>
          <label htmlFor="password">Already signed in? </label>
          <button type="button" onClick={() => navigate("/login", { replace: true })}>Login</button>
        </div>
        <div>
          <ToastContainer />
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;