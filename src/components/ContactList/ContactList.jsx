import React from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import {
  getContacts,
  getError,
  getIsLoading,
} from 'redux/contacts/contactsSelector';
import { filterSelector } from 'redux/filter/filterSelector';
import Filter from 'components/Filter';
import { BiTrash } from 'react-icons/bi';
import clsx from 'clsx';
import { RotatingLines } from 'react-loader-spinner';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const filter = useSelector(filterSelector);
  const handleDeleteContact = id => dispatch(deleteContact(id));

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  const deleteButtonContent =
    isLoading && !error ? (
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        visible={true}
        width="16px"
        height="16px"
      />
    ) : (
      <BiTrash className={css.deleteicon} />
    );
  return (
    <div className={css.contentwrapper}>
      <h1 className="title">Contacts</h1>
      <div className={css.contactswrapper}>
        <Filter />
        <ul className={css.contactslist}>
          {visibleContacts.map(({ id, name, phone }) => (
            <li key={id} className={css.contactitem}>
              <p className={css.contactinfo}>
                <AiOutlineUserDelete className={css.usericon} />
                {name}: {phone}
              </p>
              <button
                className={clsx('button-common button-main', css.deletebutton)}
                onClick={() => handleDeleteContact(id)}
              >
                {deleteButtonContent}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;
