import { useState } from 'react';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import FormForgetPassword from './FormForgetPassword';
import React from 'react';
import FormConfirmCode from './FormConfirmCode';
import FormResetPassword from './FormResetPassword';
import { ACTION } from '../../../../@core/constants/action-auth';
function Login() {
  const [action, setAction] = useState('login');

  const handleActionChange = (data: string) => {
    setAction(data);
  };

  const renderForm = () => {
    switch (action) {
      case ACTION.LOGIN:
        return <FormLogin handleActionChange={handleActionChange} />;
      case ACTION.REGISTER:
        return <FormRegister handleActionChange={handleActionChange} />;
      case ACTION.FORGOTPASSWORD:
        return <FormForgetPassword handleActionChange={handleActionChange} />;
      case ACTION.CONFIRM:
        return <FormConfirmCode handleActionChange={handleActionChange} />;
      case ACTION.RESET:
        return <FormResetPassword handleActionChange={handleActionChange} />;
      default:
        return <FormLogin handleActionChange={handleActionChange} />;
    }
  };

  return (
    <React.Fragment>
      {renderForm()}
    </React.Fragment>
  );
}

export default Login;
