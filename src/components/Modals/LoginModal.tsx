import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { LockIcon, MailIcon } from "../icons";
import { Checkbox } from "@heroui/checkbox";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const  LoginModal = ({isOpen, onClose}:LoginModalProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const bgColor = "#FFD66B";


  const handleLogin = async () => {
    await login({ email, password });
    onClose();
  };


  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      backdrop="blur"
      
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Iniciar sesión
            </ModalHeader>
            <ModalBody>
              <Input
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Introduce tu email"
                variant="flat"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                placeholder="Introduce tu contraseña"
                type="password"
                variant="flat"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Recuérdame
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  ¿Has olvidado la contraseña?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button style={{backgroundColor: bgColor}} onPress={handleLogin}>
                Continuar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
