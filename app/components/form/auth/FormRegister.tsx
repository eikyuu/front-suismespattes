import { useLogin } from '../../../../@core/hooks/useLogin';
import Button from '../../button/Button';
import Input from '../../inputs/Input';
import Label from '../../inputs/Label';
import Loader from '../../loader/Loader';
import Text from '../../text/Text';
import Title from '../../text/Title';

function FormRegister({ handleActionChange }: any) {
  const { loading, form, errors, handleChange, handleSubmit } = useLogin();

  return (
    <form
      className=''
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Title className='text-white' balise='h3'>
        Inscription
      </Title>

      <Label name='pseudo' label='Votre pseudo' required />
      <Input
        handleChange={handleChange}
        value={form.email}
        type='text'
        name='pseudo'
        label='Votre pseudo'
        required
      />

      <Label name='email' label='Votre email' required />
      <Input
        handleChange={handleChange}
        value={form.email}
        type='email'
        name='email'
        label='Votre email'
        required
      />

      <Label name='Password' label='Votre mot de passe' required />
      <Input
        handleChange={handleChange}
        value={form.password}
        type='password'
        name='password'
        label='Votre mot de passe'
        required
      />
      {errors && <div className='text-red-400 mt-2'>{errors}</div>}

      <Text className='text-sm mt-5' >
        Assurez‑vous que votre mot de passe contient huit caractères ou plus. Pour disposer d&apos;un mot de passe fort, essayez d&apos;inclure des chiffres, des lettres et des signes de ponctuation.
      </Text>

      <Button className='mt-5 mb-1 bg-tertiary !w-full' type='submit'>
        {loading ? <Loader /> : 'Inscription'}
      </Button>
      
    </form>
  );
}

export default FormRegister;
