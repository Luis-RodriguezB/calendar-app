import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { authStatus } from '../router';

export const AppRouter = () => {
  const isAuthenticated = authStatus.authenticated;

  return (
    <Routes>
      {isAuthenticated === 'not-authenticated' ? (
        <Route path='/auth/*' element={<LoginPage />} />
      ) : (
        <Route path='/*' element={<CalendarPage />} />
      )}
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
