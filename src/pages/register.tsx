import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      );
      return;
    }

    setError("");

   

    navigate("/login");
  };

  return (
    <DefaultLayout>
      <div className="flex min-h-[80vh] items-start justify-center pt-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Crea tu cuenta
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Únete a nuestra comunidad
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-4">
              <Input
                label="Nombre completo"
                placeholder="Tu nombre y apellidos"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
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
                placeholder="Crea una contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                label="Confirmar Contraseña"
                placeholder="Repite la contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full">
              Registrarse
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Register;




