import { ACTION } from '../../../../@core/constants/action-auth';
import { useConfirmCode } from '../../../../@core/hooks/useConfirmCode';
import Button from '../../button/Button';
import Input from '../../inputs/Input';
import Label from '../../inputs/Label';
import Loader from '../../loader/Loader';
import Title from '../../text/Title';

function FormConfirmCode({ handleActionChange }: any) {
  const { loading, form, errors, handleChange, handleSubmit } =
    useConfirmCode();

  return (
    <form
      className=''
      onSubmit={(e) => {
        handleSubmit(e).then(() => {
          handleActionChange(ACTION.RESET);
        });
      }}
    >
      <div className='flex justify-center items-center gap-5 mb-5'>
        <div className='bg-white text-black rounded-full h-10 w-10 flex justify-center items-center'>
          1
        </div>
        <div className='bg-tertiary rounded-full h-10 w-10 flex justify-center items-center'>
          2
        </div>
        <div className='bg-white text-black rounded-full h-10 w-10 flex justify-center items-center'>
          3
        </div>
      </div>
      <Title className='text-white' balise='h3'>
        Nous vous avons envoyé un code
      </Title>
      <p>
        Consultez vos emails pour récupérer votre code de confirmation. Si vous
        devez demander un nouveau code, revenez en arrière et sélectionnez de
        nouveau une méthode de confirmation.
      </p>
      <Label name='email' label='Entrez le code de confirmation' required />
      <Input
        handleChange={handleChange}
        value={form.code}
        type='text'
        name='code'
        label='Code de confirmation'
        required
      />
      {errors && <div className='text-red-400 mt-2'>{errors}</div>}

      <Button className='mt-5 mb-1 bg-tertiary !w-full' type='submit'>
        {loading ? <Loader /> : 'Confirmer'}
      </Button>
    </form>
  );
}

export default FormConfirmCode;
