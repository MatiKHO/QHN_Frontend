import { RocketIcon, PopUpIcon, TrophyIcon, HeartFilledIcon, BookIcon, FilmIcon } from "@/components/icons";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Asiste a eventos que solo los niños pueden imaginar.",
  navItems: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Eventos",
      href: "/eventos",
    },
    {
      label: "Club",
      href: "/club",
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
      label: "Eventos",
      href: "/eventos",
    },
    {
      label: "Club",
      href: "/club",
    },
    {
      label: "Sobre nosotros",
      href: "/about",
    },
    {
      label: "Logout",
      href: "/logout",
      
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
      label: "Eduación",
      href: "categorias/eduacion",
      icon: BookIcon,
    },
    {
      label: "Cine",
      href: "categorias/cine",
      icon: FilmIcon,
    },
  ]
};
