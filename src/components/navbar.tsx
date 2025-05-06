import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";



import { LoginModal } from "./Modals/LoginModal";
import { useState } from "react";
import { RegisterModal } from "./Modals/RegisterModal";

import { AvatarDropdown } from "./Dropdowns/AvatarDropdown";

import { useAuth } from "@/context/AuthContext"; 



export const Navbar = () => {
  const [modalState, setModalState] = useState({ register: false, login: false });

  const openRegisterModal = () => setModalState({ register: true, login: false });
  const openLoginModal = () => setModalState({ register: false, login: true });
  const closeModals = () => setModalState({ register: false, login: false });

  const { isAuthenticated } = useAuth();



  

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Desktop Menu */}
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
            <NavbarItem key={item.href}>
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

     

      {/* Desktop Avatar Dropdown */}
      <NavbarContent className="hidden sm:flex" justify="end">
        <AvatarDropdown onRegister={openRegisterModal} onLogin={openLoginModal} />
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
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
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>

      {/* Mobile Avatar Dropdown */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <AvatarDropdown onRegister={openRegisterModal} onLogin={openLoginModal} />
      </NavbarContent>
      {isAuthenticated && (
  <>
    <NavbarMenuToggle className="lg:hidden" />
    <NavbarMenu>
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
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </div>
    </NavbarMenu>
  </>
)}




      {/* Modals */}
      {modalState.register && (
        <RegisterModal
          isOpen={modalState.register}
          onClose={closeModals}
          onOpenLoginModal={() => {
            setModalState({ register: false, login: true });
          }}
        />
      )}
      {modalState.login && (
        <LoginModal isOpen={modalState.login} onClose={closeModals} />
      )}

    </HeroUINavbar>
  );
};
