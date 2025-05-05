import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  //   useDisclosure,
} from "@heroui/modal";
import { useState } from "react";
import { LockIcon, MailIcon, UserIcon } from "../icons";
import { Button } from "@heroui/button";
import { Link} from "@heroui/link";
import { useAuth } from "@/context/AuthContext";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenLoginModal: () => void;
};

export const RegisterModal = ({
  onOpenLoginModal,
  isOpen,
  onClose,
}: RegisterModalProps) => {
  const { registerUser } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showLoginLink, setShowLoginLink] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const userData = { fullName, email, password };
    console.log(userData);
    console.log("Intentando registrar usuario:", userData); // Log antes de llamar a la función de registro

    try {
      const result = await registerUser(userData);
      console.log("Usuario registrado exitosamente:", result); // Log para verificar el resultado
      onClose();
      onOpenLoginModal();
    } catch (error) {
      setError("Error al registrar el usuario");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      );
      return;
    }

    setError("");

    onClose();
    onOpenLoginModal();
  };
  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      backdrop="blur"
      onSubmit={handleSubmit}
      
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Regístrate
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                endContent={<UserIcon />}
                label="Nombre completo"
                placeholder="Introduce tu nombre completo"
                variant="flat"
              ></Input>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Introduce tu email"
                variant="flat"
              />
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Contraseña"
                placeholder="Introduce tu contraseña"
                variant="flat"
              />
              <Input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                placeholder="Repite tu contraseña"
                variant="flat"
              />
              <div className="flex py-2 px-1 justify-between">
                <Link color="primary" href="#" size="sm" onPress={() => setShowLoginLink(true)}>
                  ¿Ya tienes una cuenta?
                </Link>
                {showLoginLink && (
                <div
                  style={{
                    opacity: showLoginLink ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <Link href="#" color="primary" size="sm">
                    Inicia sesión
                  </Link>
                </div>
              )}
                
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button type="submit" color="primary" onPress={onClose} onSubmit={handleSubmit}>
                Registrarse
              </Button>
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
