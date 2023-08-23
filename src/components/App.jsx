import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { NavLink, Route, Routes } from 'react-router-dom';

// import { useEffect } from 'react';
// import { fetchContacts } from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="nav-wrap">
        <NavLink
          to="/"
          className="button-common btn-nav btn-splitter nav-btn-text"
        >
          Phonebook
        </NavLink>
        <NavLink to="/contacts" className="button-common btn-nav nav-btn-text">
          Contacts
        </NavLink>
      </div>
      <div className="content-wrap">
        <Routes>
          <Route path="/" element={<ContactForm />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="*" element={<ContactForm />} />
        </Routes>
      </div>
    </div>
  );
};
