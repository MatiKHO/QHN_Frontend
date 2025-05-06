import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Avatar, AvatarIcon } from "@heroui/avatar";
import { useAuth } from "@/context/AuthContext";

type AvatarDropdownProps = {
    onRegister: () => void;
    onLogin: () => void;
  }


  export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ onRegister, onLogin }) => {
    const { isAuthenticated, logout } = useAuth();
  
    return (
      <Dropdown
        backdrop="blur"
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            document.getElementById("focusableElement")?.focus();
          }
        }}
      >
        <DropdownTrigger>
          <Avatar
            classNames={{
              base: "bg-gradient-to-br from-[#FFD66B] to-[#FFD66B]",
              icon: "text-black",
            }}
            icon={<AvatarIcon />}
            size="sm"
            className="cursor-pointer"
          />
        </DropdownTrigger>
  
        <DropdownMenu aria-label="User Menu">
          {isAuthenticated ? (
            <>
              <DropdownItem key="profile" textValue="Perfil" href="/profile">
                Perfil
              </DropdownItem>
              <DropdownItem key="logout" textValue="Cerrar sesión" color="danger" onPress={logout} className="hidden lg:flex">
                Cerrar sesión
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem key="register" textValue="Regístrate" onPress={onRegister}>
                Regístrate
              </DropdownItem>
              <DropdownItem key="login" textValue="Iniciar sesión" onPress={onLogin}>
                Iniciar sesión
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    );
  };
  

  


