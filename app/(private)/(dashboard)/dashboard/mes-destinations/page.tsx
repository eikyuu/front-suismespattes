
import { getCurrentUser } from "@/core/lib/session"
import { MesDestinations } from "./mes-destinations"

export default async function DemoPage() {

const user = await getCurrentUser()

  return (
    <MesDestinations id={user?.id!} />
  )
}
