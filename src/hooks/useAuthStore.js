import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isLogin = (name, uid, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(onLogin({ name, uid }));
  };

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      isLogin(data.name, data.id, data.token);
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });
      isLogin(data.name, data.id, data.token);
    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data?.msg || '--'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('auth/renew');
      isLogin(data.name, data.id, data.token);
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('token-init-date');
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');

    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,

    checkAuthToken,
    startLogin,
    startRegister,
    startLogout,
  };
};
