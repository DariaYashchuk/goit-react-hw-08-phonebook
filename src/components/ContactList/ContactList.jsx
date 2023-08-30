import React from 'react';
import css from './ContactList.module.css';
import { getContacts } from 'redux/contacts/contactsSelector';
import { filterSelector } from 'redux/filter/filterSelector';
import Filter from 'components/Filter';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { useSelector } from 'react-redux';

const ContactList = () => {
  // const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const filter = useSelector(filterSelector);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.contentwrapper}>
      <h1 className="title">Contacts</h1>
      <div className={css.contactswrapper}>
        <Filter />
        <ul className={css.contactslist}>
          {visibleContacts.map(({ id, name, number }) => (
            <li key={id} className={css.contactitem}>
              <ContactItem id={id} name={name} number={number} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;
