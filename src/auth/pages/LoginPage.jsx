import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './login.css';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPasswordConfirm: '',
};

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    handleChange: onHandleLoginChange,
    onResetForm: onResetLogin,
  } = useForm(loginFormFields);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPasswordConfirm,
    handleChange: onHandleRegisterChange,
    onResetForm: onResetRegister,
  } = useForm(registerFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();

    startLogin({ email: loginEmail, password: loginPassword });
    onResetLogin(loginFormFields);
  };

  const registerSubmit = (event) => {
    event.preventDefault();

    if (registerPassword !== registerPasswordConfirm) {
      Swal.fire('Error en el registro', 'Contraseñas no coinciden', 'error');
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
    onResetRegister(registerFormFields);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className='login-container'>
      <div className='row login-wrapper'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Correo'
                name='loginEmail'
                value={loginEmail}
                onChange={onHandleLoginChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                autoComplete='off'
                name='loginPassword'
                value={loginPassword}
                onChange={onHandleLoginChange}
              />
            </div>
            <div className='d-grid gap-2'>
              <input type='submit' className='btnSubmit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
                name='registerName'
                value={registerName}
                onChange={onHandleRegisterChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='email'
                className='form-control'
                placeholder='Correo'
                name='registerEmail'
                value={registerEmail}
                onChange={onHandleRegisterChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                autoComplete='off'
                name='registerPassword'
                value={registerPassword}
                onChange={onHandleRegisterChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Repita la contraseña'
                autoComplete='off'
                name='registerPasswordConfirm'
                value={registerPasswordConfirm}
                onChange={onHandleRegisterChange}
              />
            </div>

            <div className='d-grid gap-2'>
              <input type='submit' className='btnSubmit' value='Crear cuenta' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
