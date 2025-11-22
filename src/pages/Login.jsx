import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // Aquí podrías validar, pero por ahora solo redirige
    navigate("/dashboard");
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>

        <div className="input-group">
          <label>Correo</label>
          <input type="email" placeholder="ejemplo@gmail.com" />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
