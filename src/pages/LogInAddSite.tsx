import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC<{ setAuth: (auth: boolean) => void }> = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.errors[0]?.msg || "Niepoprawny login lub hasło");
        return;
      }

      setAuth(true);
      navigate("/blog-create");
    } catch (error) {
      setError("Wystąpił błąd podczas logowania");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-navy-900 mb-12">ZALOGUJ SIĘ</h1>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Zaloguj
      </button>
    </div>
  );
};

export default Login;