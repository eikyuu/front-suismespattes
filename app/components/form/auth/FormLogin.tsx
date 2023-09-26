import Button from '../../button/Button';
import Input from '../../inputs/Input';
import Label from '../../inputs/Label';
import { useLogin } from '../../../../@core/hooks/useLogin';
import Loader from '../../loader/Loader';
import Title from '../../text/Title';
import { ACTION } from '../../../../@core/constants/action-auth';

function FormLogin({handleActionChange}: any) {

    const { loading, form, errors, handleChange, handleSubmit } = useLogin();

    return ( 
        <form
          className=''
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Title className="text-white" balise="h2">
            Connexion
          </Title>  
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

          <Button className='mt-5 mb-1 bg-tertiary !w-full' type='submit'>
            {loading ? <Loader /> : 'Connexion'}
          </Button>
          <p
            className='block text-right mt-2 text-sm cursor-pointer'
            onClick={() => {
              handleActionChange(ACTION.FORGOTPASSWORD);
            }}
          >
            Mot de passe oublié ?
          </p>
          {/* <p
            className='block text-right mt-2 text-sm cursor-pointer'
            onClick={() => {
              handleActionChange(ACTION.REGISTER);
            }}
          >
            Vous n&apos;avez pas de compte ? Inscrivez-vous
          </p> */}
        </form>
     );
}

export default FormLogin;
