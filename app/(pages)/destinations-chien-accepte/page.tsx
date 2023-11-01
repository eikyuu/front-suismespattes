import { Metadata } from "next"

import Destinations from "@/components/destinations"

export const metadata: Metadata = {
  title: "Toutes les destinations",
  description: "Retrouve toutes les destinations autours de chez toi !",
}

export default function Page() {
  return <Destinations />
}
