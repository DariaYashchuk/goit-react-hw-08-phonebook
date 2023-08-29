import { useAuth } from 'hooks';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {' '}
      <NavLink
        to="/"
        className="button-common btn-nav btn-splitter nav-btn-text"
      >
        {isLoggedIn ? <>Create</> : <>Phonebook</>}
      </NavLink>
      <NavLink to="/contacts" className="button-common btn-nav nav-btn-text">
        Contacts
      </NavLink>
    </>
  );
};
