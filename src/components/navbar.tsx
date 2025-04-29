import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Logo y Menú principal */}
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

      {/* A la derecha */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-4 items-center">
          {/* Redes sociales (vacías ahora) */}
          <Link isExternal href={siteConfig.links.twitter} title="Twitter"></Link>
          <Link isExternal href={siteConfig.links.discord} title="Discord"></Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub"></Link>
          {/* Theme Switch */}
          <ThemeSwitch />
        </NavbarItem>

        {/* Dinámico: Login/Register o Perfil/Logout */}
        <NavbarItem className="hidden md:flex gap-2 ml-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-primary border border-primary rounded-md px-3 py-1 hover:bg-primary hover:text-white transition"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Mi Perfil
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-red-500 border border-red-500 rounded-md px-3 py-1 hover:bg-red-500 hover:text-white transition"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}></Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Menú Mobile */}
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

          {/* Extra para móviles */}
          {!isLoggedIn ? (
            <>
              <NavbarMenuItem>
                <Link href="/login" size="lg" color="foreground">
                  Iniciar sesión
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/register" size="lg" color="primary">
                  Registrarse
                </Link>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link href="/profile" size="lg" color="foreground">
                  Mi Perfil
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <button
                  onClick={logout}
                  className="w-full text-left text-red-500 hover:text-red-600 transition"
                >
                  Cerrar sesión
                </button>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

