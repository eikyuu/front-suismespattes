import { useForgetPassword } from '../../../../@core/hooks/useForgetPassword';
import Button from '../../button/Button';
import Input from '../../inputs/Input';
import Label from '../../inputs/Label';
import Loader from '../../loader/Loader';
import Title from '../../text/Title';

function FormResetPassword({ handleActionChange }: any) {
  const { loading, form, errors, handleChange, handleSubmit } =
    useForgetPassword();

  return (
    <form
      className=''
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className='flex justify-center items-center gap-5 mb-5'>
        <div className='bg-white text-black rounded-full h-10 w-10 flex justify-center items-center'>
          1
        </div>
        <div className='bg-white text-black rounded-full h-10 w-10 flex justify-center items-center'>
          2
        </div>
        <div className='bg-tertiary rounded-full h-10 w-10 flex justify-center items-center'>
          3
        </div>
      </div>
      <Title className='text-white' balise='h3'>
        Choisissez un nouveau mot de passe
      </Title>
      <p>
        Assurez‑vous que votre mot de passe contient huit caractères ou plus.
        Pour disposer d&apos;un mot de passe fort, essayez d&apos;inclure des
        chiffres, des lettres et des signes de ponctuation.{' '}
      </p>
      <Label name='email' label='Entrez un nouveau mot de passe' required />
      <Input
        handleChange={handleChange}
        value={form.email}
        type='password'
        name='email'
        label='Votre mot de passe'
        required
      />
      {errors && <div className='text-red-400 mt-2'>{errors}</div>}

      <Button className='mt-5 mb-1 bg-tertiary !w-full' type='submit'>
        {loading ? <Loader /> : 'Confirmer'}
      </Button>
    </form>
  );
}

export default FormResetPassword;
