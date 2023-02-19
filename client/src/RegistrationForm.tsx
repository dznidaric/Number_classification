import React, { useState } from "react";
import { pb } from "./lib/pocketbase";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      "email": email,
      "emailVisibility": true,
      "password": password,
      "passwordConfirm": password,
    };
    await pb.collection('users').create(data).then((record) => {
      const data = record;
      console.log(data);
      sendEmailVerification();
    }).catch((error) => {
      console.log(error);
    });

  };

  async function sendEmailVerification() {
    await pb.collection('users').requestVerification(email).then((record) => {
      console.log("Email succesful: ",record);
      setMessage("Check your email for a verification link");
    }).catch((error) => {
      setMessage(error);
    });
  }

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
        <button type="button">Register</button>
      </div>
    </form>
  );
}

export default RegistrationForm;