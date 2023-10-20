import { Button } from '@/components/ui/button';
import Label from '../../inputs/label';
import { useLogin } from '../../../@core/hooks/useLogin';
import Loader from '../../loader/loader';
import Title from '@/components/ui/text/Title';
import { ACTION } from '../../../@core/constants/action-auth';
import { Input } from "@/components/ui/input";

function FormLogin({handleActionChange}: any) {

    const { loading, form, errors, handleChange, handleSubmit } = useLogin();

    return ( 
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Title className="text-white" balise="h2">
            Connexion
          </Title>  
          <Label name='email' label='Votre email' required />
          <Input
            className='text-black'
            onChange={handleChange}
            value={form.email}
            type='text'
            name='email'
            required
          />
          <Label name='Password' label='Votre mot de passe' required />
          <Input
            className='text-black'
            onChange={handleChange}
            value={form.password}
            type='password'
            name='password'
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
