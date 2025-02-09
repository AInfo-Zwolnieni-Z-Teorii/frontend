import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CORRECT_CREDENTIALS = {
  login: "admin",
  password: "password123",
};

const Login: React.FC<{ setAuth: (auth: boolean) => void }> = ({ setAuth }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login === CORRECT_CREDENTIALS.login && password === CORRECT_CREDENTIALS.password) {
      setAuth(true);
      navigate("/blog-create");
    } else {
      setError("Niepoprawny login lub hasło");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-navy-900 mb-12">ZALOGUJ SIĘ</h1>

      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
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