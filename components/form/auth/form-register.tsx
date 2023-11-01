import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Text from "@/components/ui/text/Text"
import Title from "@/components/ui/text/Title"

import { useLogin } from "../../../@core/hooks/useLogin"
import Label from "../../inputs/label"
import Loader from "../../loader/loader"

function FormRegister({ handleActionChange }: any) {
  const { loading, form, errors, handleChange, handleSubmit } = useLogin()

  return (
    <form
      className=""
      onSubmit={(e) => {
        handleSubmit(e)
      }}
    >
      <Title className="text-white" balise="h3">
        Inscription
      </Title>

      <Label name="pseudo" label="Votre pseudo" required />
      <Input
        onChange={handleChange}
        value={form.email}
        type="text"
        name="pseudo"
        required
      />

      <Label name="email" label="Votre email" required />
      <Input
        onChange={handleChange}
        value={form.email}
        type="email"
        name="email"
        required
      />

      <Label name="Password" label="Votre mot de passe" required />
      <Input
        onChange={handleChange}
        value={form.password}
        type="password"
        name="password"
        required
      />
      {errors && <div className="mt-2 text-red-400">{errors}</div>}

      <Text className="mt-5 text-sm">
        Assurez‑vous que votre mot de passe contient huit caractères ou plus.
        Pour disposer d&apos;un mot de passe fort, essayez d&apos;inclure des
        chiffres, des lettres et des signes de ponctuation.
      </Text>

      <Button className="mb-1 mt-5 !w-full bg-tertiary" type="submit">
        {loading ? <Loader /> : "Inscription"}
      </Button>
    </form>
  )
}

export default FormRegister
