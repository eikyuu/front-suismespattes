import { Inter } from "next/font/google"

import { globalConfig } from "../../../@core/config/global"
import { getCurrentUser } from "../../../@core/lib/session"
import { cn } from "../../../@core/lib/utils"
import Footer from "../../../components/footer"
import LoginBtn from "../../../components/login-btn"
import { MainNav } from "../../../components/main-nav"
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Suismespattes.com : une plateforme pour voyager avec ton chien !",
  description:
    "Suis mes pattes, une plateforme collaborative gratuite pour voyager avec ton chien ! Trouve ta destination idéale. Que ce soit pour une sortie en forêt, en ville ou à la campagne, nous avons ce qu’il te faut.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
}

interface LayoutProps {
  children: React.ReactNode
  // modal: React.ReactNode
}

export default function Layout({
  children,
  // modal,
}: LayoutProps) {

  return (
    <div
      className={cn(
        inter.className,
        "flex min-h-screen flex-col font-sans leading-relaxed antialiased"
      )}
    >
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
