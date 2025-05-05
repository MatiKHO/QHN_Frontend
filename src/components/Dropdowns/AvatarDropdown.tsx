import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Avatar, AvatarIcon } from "@heroui/avatar";

type AvatarDropdownProps = {
    onRegister: () => void;
    onLogin: () => void;
  }


export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ onRegister, onLogin }) => (
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
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="register" textValue="Register" onPress={onRegister}>
          Regístrate
        </DropdownItem>
        <DropdownItem key="sign-up" textValue="Iniciar sesión" onPress={onLogin}>
          Iniciar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );