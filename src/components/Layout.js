import { NavLink, Outlet } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import { AuthNav } from './AuthNav/AuthNav';
import { UserMenu } from './UserMenu/UserMenu';
import { useAuth } from 'hooks';
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="container">
      <div className="nav-wrap">
        {/* <Navigation className="navigation" /> */}
        <NavLink
          to="/"
          className="button-common btn-nav btn-splitter nav-btn-text"
        >
          {isLoggedIn ? <>Create</> : <>Phonebook</>}
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/contacts"
            className="button-common btn-nav btn-splitter nav-btn-text"
          >
            Contacts
          </NavLink>
        )}
        {isLoggedIn ? <UserMenu /> : <AuthNav className="navigation" />}
      </div>
      <div className="content-wrap">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
