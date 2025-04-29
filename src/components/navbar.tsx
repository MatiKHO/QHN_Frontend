import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // NavbarMenuToggle,
  // NavbarMenu,
  // NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { LockIcon, MailIcon, SearchIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar, AvatarIcon } from "@heroui/avatar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Buscar..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
  
    <HeroUINavbar isBordered  maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">QHN</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem  key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex"></NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
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
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              }}
              icon={<AvatarIcon />}
              size="sm"
              className="cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="register" textValue="Register">
              Regístrate
            </DropdownItem>
            
            <DropdownItem key="sign-up" textValue="Iniciar sesión" onPress={onOpen}>
              Iniciar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* D</DropdownMenu>esktop Modal Login */}
            <Modal
              isOpen={isOpen}
              placement="top-center"
              onOpenChange={onOpenChange}
              backdrop="blur"
              className="hidden sm:flex"
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
                      />
                      <Input
                        endContent={
                          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Password"
                        placeholder="Introduce tu contraseña"
                        type="password"
                        variant="flat"
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
                      <Button color="primary" onPress={onClose}>
                        Continuar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
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
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              }}
              icon={<AvatarIcon />}
              size="sm"
              className="cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem  key="register" textValue="Register">
              Regístrate
            </DropdownItem>
            <DropdownItem key="sign-up" textValue="Iniciar sesión" onPress={onOpen}>
              Iniciar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Mobile Modal Login */}
        <Modal
              isOpen={isOpen}
              placement="center"
              onOpenChange={onOpenChange}
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
                      />
                      <Input
                        endContent={
                          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Password"
                        placeholder="Introduce tu contraseña"
                        type="password"
                        variant="flat"
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
                      <Button color="primary" onPress={onClose}>
                        Continuar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

        
        {/* <NavbarMenuToggle /> */}
      </NavbarContent>

      {/* Mobile Menu */}
      {/* <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}

      
         
    
    </HeroUINavbar>
  );
};
