
import { getCurrentUser } from "@/@core/lib/session"
import { MesDestinations } from "./mes-destinations"

export default async function DemoPage() {


const user = await getCurrentUser()

console.log('user', user?.id)

  return (
    <MesDestinations id={user?.id!} />
  )
}
