import css from './ContactForm.module.css';
import clsx from 'clsx';
import { RotatingLines } from 'react-loader-spinner';
import { AiOutlinePlus } from 'react-icons/ai';

import { useState } from 'react';
import { nanoid } from 'nanoid';

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { getContacts, getIsLoading } from 'redux/contacts/contactsSelector';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks';
import { toast } from 'react-hot-toast';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        console.log('cannot find');
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const onSubmitClick = e => {
    e.preventDefault();

    const contact = {
      name,
      number,
    };

    const isNameIncluded = contacts.some(
      value => value.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isNameIncluded) {
      toast.error(`${name} is already in contacts`);
      reset();

      return;
    } else {
      dispatch(addContact(contact));
      toast.success(`${name} was successfully added`);
    }
    reset();
  };

  const buttonContent = isLoading ? (
    <RotatingLines
      strokeColor="white"
      strokeWidth="5"
      animationDuration="0.75"
      visible={true}
      width="24px"
      height="24px"
    />
  ) : (
    <AiOutlinePlus className="iconforbutton" />
  );

  return (
    <form onSubmit={onSubmitClick} className={css.form}>
      <h1 className="title">Phonebook</h1>
      <div className={css.inputswrapper}>
        <label htmlFor={nameInputId} className={css.inputs}>
          <p className="text">Name</p>
          <input
            id={nameInputId}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={handleChange}
            required
          />
        </label>
        <label
          htmlFor={numberInputId}
          className={clsx(css.inputs, css.numberinput)}
        >
          <p className="text">Number</p>
          <input
            id={numberInputId}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={handleChange}
            required
          />
        </label>
        <button
          type="submit"
          className={clsx(
            'button-common button-main scaleincenteranimation',
            css.buttonadd
          )}
          disabled={!isLoggedIn ? true : false}
        >
          {buttonContent}
        </button>

        {!isLoggedIn && (
          <p className="message">
            {' '}
            Please{' '}
            <Link to="/login" className={css.messagelink}>
              Log In
            </Link>{' '}
            or{' '}
            <Link to="/register" className={css.messagelink}>
              Create
            </Link>{' '}
            an account
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
