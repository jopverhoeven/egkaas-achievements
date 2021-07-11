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
    <div className="flex flex-auto sm:flex-none flex-col items-center sm:mt-4">
      <div className="flex flex-col p-4 w-full sm:w-1/4 sm:h-96 flex-auto sm:rounded bg-gray-600">
        <h2 className="text-lg font-medium text-center">Inloggen bij EGKaaS Achievements</h2>
        {error && (
          <div className="rounded p-2 bg-red-500 text-center font-medium mt-2">
            {error}
          </div>
        )}
        <form
          // @ts-ignore
          onSubmit={handleSubmit}
          className="bg-gray-500 rounded p-4 flex flex-col flex-auto mt-2"
        >
          {/* Email */}
          <section id="email" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">E-Mail</label>
            <input
              className="p-2 rounded"
              placeholder="email"
              type="email"
              // @ts-ignore
              ref={emailRef}
              required
            ></input>
          </section>
          {/* Password */}
          <section id="password" className="text-black flex flex-col flex-auto">
            <label className="text-white font-semibold text-md">
              Wachtwoord
            </label>
            <input
              className="p-2 rounded"
              placeholder="wachtwoord"
              // @ts-ignore
              ref={passwordRef}
              type="password"
              required
            ></input>
          </section>
          <button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-400 rounded p-2 font-medium">
            Inloggen
          </button>
        </form>
      </div>
    </div>
  );
}
