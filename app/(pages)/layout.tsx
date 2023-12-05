import { Inter } from "next/font/google"

import { globalConfig } from "../../@core/config/global"
import { getCurrentUser } from "../../@core/lib/session"
import { cn } from "../../@core/lib/utils"
import Footer from "../../components/footer"
import LoginBtn from "../../components/login-btn"
import { MainNav } from "../../components/main-nav"

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

export default async function Layout(props: {
  children: React.ReactNode
  // modal: React.ReactNode
}) {
  const user = await getCurrentUser()

  // if (!user) {
  //   return notFound()
  // }

  return (
    <div
      className={cn(
        inter.className,
        "flex min-h-screen flex-col font-sans leading-relaxed antialiased"
      )}
    >
      <header className=" z-40 bg-primary">
        <div className="flex h-20 items-center justify-between px-6">
          <MainNav items={globalConfig.mainNav} />
          <LoginBtn user={user} />
        </div>
      </header>

      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
