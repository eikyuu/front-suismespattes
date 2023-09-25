import { ACTION } from '../../../../@core/constants/action-auth';
import { useForgetPassword } from '../../../../@core/hooks/useForgetPassword';
import Button from '../../button/Button';
import Input from '../../inputs/Input';
import Label from '../../inputs/Label';
import Loader from '../../loader/Loader';
import Title from '../../text/Title';

function FormForgetPassword({handleActionChange}: any) {

    const { loading, form, errors, handleChange, handleSubmit } = useForgetPassword();

    return ( 
        <form
          className=''
          onSubmit={(e) => {
            handleSubmit(e).then(() => {
              handleActionChange(ACTION.CONFIRM);
            });
          }}
        >
            <Title className="text-white" balise="h3">
              Où devons‑nous envoyer un code de confirmation ?
            </Title>
            <p>Pour que vous puissiez modifier votre mot de passe, nous devons d&apos;abord nous assurer qu&apos;il s&apos;agit bien de vous.Commencez par choisir où recevoir un code de confirmation.</p>
            <Label name='email' label='Entrez l&apos;adresse email associée à votre compte pour modifier votre mot de passe' required />
            <Input handleChange={handleChange} value={form.email} type='text' name='email' label='Votre email' required />
            {errors && <div className='text-red-400 mt-2'>{errors}</div>}

            <Button className='mt-5 mb-1 bg-tertiary !w-full' type='submit'>
            {loading ? <Loader /> : 'Envoi du code de confirmation'}
          </Button>
        </form>
     );
}

export default FormForgetPassword;
