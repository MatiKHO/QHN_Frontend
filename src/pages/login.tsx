import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");

    login();
    navigate("/");
  };

  return (
    <DefaultLayout>
      <div className="flex min-h-[80vh] items-start justify-center pt-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Inicia sesión
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Bienvenido de nuevo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-4">
              <Input
                label="Correo electrónico"
                placeholder="tuemail@ejemplo.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Contraseña"
                placeholder="Tu contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;




