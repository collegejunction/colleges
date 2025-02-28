"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState(); // This will work when inside a Router context
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { email, password })
      .then((result) => {
        console.log(result)
        router.push("/components/login")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="logincontainer">
    <div className="login">
      <div className="card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="toggle">
          <a href="/components/login">Already have an account? Login</a>
        </p>
      </div>
    </div>
    </div>
  );
}