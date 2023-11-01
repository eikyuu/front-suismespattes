import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Text from "@/components/ui/text/Text"
import Title from "@/components/ui/text/Title"

import { ACTION } from "../../../@core/constants/action-auth"
import { useForgetPassword } from "../../../@core/hooks/useForgetPassword"
import Label from "../../inputs/label"
import Loader from "../../loader/loader"

function FormForgetPassword({ handleActionChange }: any) {
  const { loading, form, errors, handleChange, handleSubmit } =
    useForgetPassword()
  return (
    <form
      className=""
      onSubmit={(e) => {
        handleSubmit(e).then((res) => {
          if (res?.ok) {
            handleActionChange(ACTION.CONFIRM)
          }
        })
      }}
    >
      <div className="mb-5 flex items-center justify-center gap-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
          1
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          2
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          3
        </div>
      </div>
      <Title className="text-white" balise="h3">
        Où devons‑nous envoyer un code de confirmation ?
      </Title>
      <Text>
        Pour que vous puissiez modifier votre mot de passe, nous devons
        d&apos;abord nous assurer qu&apos;il s&apos;agit bien de vous.Commencez
        par choisir où recevoir un code de confirmation.
      </Text>
      <Label
        name="email"
        label="Entrez l'adresse email associée à votre compte pour modifier votre mot de passe"
        required
      />
      <Input
        onChange={handleChange}
        value={form.email}
        type="email"
        name="email"
        required
      />
      {errors && <div className="mt-2 text-red-400">{errors}</div>}
      <Button className="mb-1 mt-5 !w-full bg-tertiary" type="submit">
        {loading ? <Loader /> : "Envoi du code de confirmation"}
      </Button>
    </form>
  )
}

export default FormForgetPassword
