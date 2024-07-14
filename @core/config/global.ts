import { GlobalConfig } from '../types';

export const globalConfig: GlobalConfig = {
  mainNav: [
    {
      title: "Accueil",
      href: "/",
      private: false,
    },
    {
      title: "Destinations",
      href: "/destinations-chien-accepte",
      private: false,
    },
    {
      title: "Partager une destination",
      href: "/partager-une-destination",
      private: true,
    },
    {
      title: "Boutique",
      href: "/a-venir",
      private: false,
    },
     {
      title: "Contact",
      href: "/contact",
      private: false,
    },
  ],
}
