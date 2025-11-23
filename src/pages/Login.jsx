import { usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css";

export default function Login() {
  const { login, authenticated } = usePrivy();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [authenticated, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido</h2>

        <div className="input-group">
          <label>Acceso seguro Web3</label>
          <p className="web3-info">
            Con Privy iniciarás sesión y tendrás una wallet automática lista para usar.
          </p>
        </div>

        <button className="login-btn" onClick={login}>
          Ingresar con Privy
        </button>
      </div>
    </div>
  );
}
