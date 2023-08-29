import { Route, Routes } from 'react-router-dom';
import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks';
import { refreshUser } from 'redux/auth/operations';
import { RestrictedRoute } from './RestrictedRaute';
import { PrivateRoute } from './PrivateRaute';
import { Layout } from './Layout';
import { Account } from 'pages/Account';
import Skeleton from '@mui/material/Skeleton';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div className="book">
      {isRefreshing ? (
        <Skeleton
          sx={{ bgcolor: '#a59eba', borderRadius: '16px' }}
          variant="rectangular"
          width={768}
          height={600}
          animation="wave"
        />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ContactsPage />}
                />
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute redirectTo="/login" component={<Account />} />
              }
            />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};
