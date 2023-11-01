import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Title from "@/components/ui/text/Title"

import { ACTION } from "../../../@core/constants/action-auth"
import { useConfirmCode } from "../../../@core/hooks/useConfirmCode"
import Label from "../../inputs/label"
import Loader from "../../loader/loader"

function FormConfirmCode({ handleActionChange }: any) {
  const { loading, form, errors, handleChange, handleSubmit } = useConfirmCode()

  return (
    <form
      className=""
      onSubmit={(e) => {
        handleSubmit(e).then((res) => {
          if (res?.ok) {
            handleActionChange(ACTION.RESET, form.resetToken)
          }
        })
      }}
    >
      <div className="mb-5 flex items-center justify-center gap-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          1
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
          2
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          3
        </div>
      </div>

      <Title className="text-white" balise="h3">
        Nous vous avons envoyé un code
      </Title>
      <p>
        Consultez vos emails pour récupérer votre code de confirmation. Si vous
        devez demander un nouveau code, revenez en arrière et sélectionnez de
        nouveau une méthode de confirmation.
      </p>
      <Label name="email" label="Entrez le code de confirmation" required />
      <Input
        onChange={handleChange}
        value={form.resetToken}
        type="text"
        name="resetToken"
        required
      />
      {errors && <div className="mt-2 text-red-400">{errors}</div>}

      <Button className="mb-1 mt-5 !w-full bg-tertiary" type="submit">
        {loading ? <Loader /> : "Confirmer"}
      </Button>
    </form>
  )
}

export default FormConfirmCode
