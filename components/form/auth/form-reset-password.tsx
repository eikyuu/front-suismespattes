import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Text from "@/components/ui/text/Text"
import Title from "@/components/ui/text/Title"

import { useResetPassword } from "../../../@core/hooks/useResetPassword"
import Label from "../../inputs/label"
import Loader from "../../loader/loader"

function FormResetPassword({ handleActionChange, resetToken }: any) {
  const { loading, form, errors, handleChange, handleSubmit } =
    useResetPassword()
  return (
    <form
      className=""
      onSubmit={(e) => {
        handleSubmit(e, resetToken)
      }}
    >
      <div className="mb-5 flex items-center justify-center gap-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          1
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          2
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
          3
        </div>
      </div>
      <Title className="text-white" balise="h3">
        Choisissez un nouveau mot de passe
      </Title>
      <Text>
        Assurez‑vous que votre mot de passe contient huit caractères ou plus.
        Pour disposer d&apos;un mot de passe fort, essayez d&apos;inclure des
        chiffres, des lettres et des signes de ponctuation.
      </Text>
      <Label name="email" label="Entrez un nouveau mot de passe" required />
      <Input
        onChange={handleChange}
        value={form.password}
        type="password"
        name="password"
        required
      />

      {errors && <div className="mt-2 text-red-400">{errors}</div>}

      <Button className="mb-1 mt-5 !w-full bg-tertiary" type="submit">
        {loading ? <Loader /> : "Confirmer"}
      </Button>
    </form>
  )
}

export default FormResetPassword
