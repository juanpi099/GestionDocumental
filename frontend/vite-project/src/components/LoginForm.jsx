import { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import bg from "../assets/coboceinicio.jpg";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Se ignora validación de credenciales (modo libre)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        name,
        password,
      });

      // Pase lo que pase, redirigimos
      navigate("/dashboard");
    } catch (err) {
      // Aunque el backend devuelva error, igual dejamos pasar
      console.warn("Error en backend, pero redirigiendo igual");
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-card">
        <h2>COBOCE Cemento</h2>
        <p>Iniciar sesión con nombre y contraseña</p>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
