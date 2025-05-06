import { RocketIcon, TrophyIcon, HeartFilledIcon, BookIcon, FilmIcon, PopUpIcon } from "@/components/icons";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "QHN",
  description: "Asiste a eventos que solo los niños pueden imaginar.",
  navItems: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "EventBot",
      href: "/event-bot",
    },
    {
      label: "Sobre nosotros",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "EventBot",
      href: "/event-bot",
    },
    {
      label: "Sobre nosotros",
      href: "/about",
    },
    {
      label: "Cerrar sesión",
      href: "/",
    },
    
  ],
  categories: [
    {
      label: "Ocio",
      href: "categorias/ocio",
      icon: RocketIcon,
    },
    {
      label: "Viajes",
      href: "categorias/viajes",
      icon: PopUpIcon,
    },
    {
      label: "Deportes",
      href: "categorias/deportes",
      icon: TrophyIcon,
    },
    {
      label: "Salud",
      href: "categorias/salud",
      icon: HeartFilledIcon,
    },
    {
      label: "Educación",
      href: "categorias/educacion",
      icon: BookIcon,
    },
    {
      label: "Cine",
      href: "categorias/cine",
      icon: FilmIcon,
    },
  ]
};
