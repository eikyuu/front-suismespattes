import { useLogin } from '../../../../@core/hooks/useLogin';

function FormRegister({handleActionChange}: any) {

    const { loading, form, errors, handleChange, handleSubmit } = useLogin();

    return ( 
        <form
          className=''
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
            <p onClick={() => handleActionChange('LOGIN')}>retour</p>
        </form>
     );
}

export default FormRegister;
