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
      label: "Club",
      href: "/club",
    },
    {
      label: "Eventos",
      href: "/eventos",
    },
    {
      label: "Blog",
      href: "/blog",
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
      label: "Blog",
      href: "/blog",
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
};
