import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { authStatus } from '../store';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const AppRouter = () => {
  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === authStatus.checking) {
    return <h3>Cargando....</h3>;
  }

  return (
    <Routes>
      {status === authStatus.notAuthenticated ? (
        <>
          <Route path='/auth/*' element={<LoginPage />} />
          <Route path='/*' element={<Navigate to='/auth/login' />} />
        </>
      ) : (
        <>
          <Route path='/' element={<CalendarPage />} />
        <Route path='/*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  );
};
