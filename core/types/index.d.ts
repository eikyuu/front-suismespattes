export type NavItem = {
    title: string
    href: string
    disabled?: boolean
    private: boolean
  }

  export type MainNavItem = NavItem

  export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      twitter: string
      github: string
    }
  }
  
  export type GlobalConfig = {
    mainNav: MainNavItem[]
  }

  export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      twitter: string
      github: string
    }
  }