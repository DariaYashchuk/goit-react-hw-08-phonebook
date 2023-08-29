import { NavLink } from 'react-router-dom';

export const AuthNav = () => {
  return (
    <>
      <NavLink
        to="/register"
        className="button-common btn-nav btn-splitter nav-btn-text"
      >
        Register
      </NavLink>
      <NavLink to="/login" className="button-common btn-nav nav-btn-text">
        Login
      </NavLink>
    </>
  );
};
