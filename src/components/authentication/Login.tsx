import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

export default function Login() {
  const emailRef = useRef("test");
  const passwordRef = useRef("");
  // @ts-ignore
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e: Event) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // @ts-ignore
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
      setLoading(false);
    }
  }

  return (
    <>
      <h2>Log In</h2>
      {error && <div>{error}</div>}
      {/* @ts-ignore */}
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <section id="email" className="text-black">
          <label className="text-white">E-Mail</label>
          <input
            placeholder="email"
            type="email"
            // @ts-ignore
            ref={emailRef}
            required
          ></input>
        </section>
        {/* Password */}
        <section id="password">
          <label>Wachtwoord</label>
          <input
            className="text-black"
            placeholder="wachtwoord"
            // @ts-ignore
            ref={passwordRef}
            type="password"
            required
          ></input>
        </section>
        <button disabled={loading} type="submit">
          Inloggen
        </button>
      </form>
    </>
  );
}
