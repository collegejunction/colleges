"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          localStorage.setItem("user", "true"); // ✅ Store user state
          window.dispatchEvent(new Event("storage")); // ✅ Notify other components
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="logincontainer">
    <div className="login">
      <div className="card">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <p className="toggle">
        <a href="/components/signup">Create an account Create Account..</a>
        </p>
      </div>
    </div>
    </div>
  );
}
