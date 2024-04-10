
import { getCurrentUser } from '../../../../../@core/lib/session'
import SettingsForm from "../../../../../components/form/settings-form"

export default async function SettingsPage() {
  const user = await getCurrentUser()
  return (
    <div className="container my-5">
      <SettingsForm user={user}/>
    </div>
  )
}
