import css from './ContactForm.module.css';
import clsx from 'clsx';
import { RotatingLines } from 'react-loader-spinner';
import { AiOutlinePlus } from 'react-icons/ai';

import { useState } from 'react';
import { nanoid } from 'nanoid';

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts, getIsLoading } from 'redux/contacts/contactsSelector';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const nameInputId = nanoid();
  const phoneInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;

      default:
        console.log('cannot find');
        break;
    }
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  const onSubmitClick = e => {
    e.preventDefault();

    const contact = {
      name,
      phone,
    };

    const isNameIncluded = contacts.some(
      value => value.name.toLowerCase() === contact.name.toLowerCase()
    );
    isNameIncluded
      ? alert(`${name} is already in contacts`)
      : dispatch(addContact(contact));

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
          htmlFor={phoneInputId}
          className={clsx(css.inputs, css.numberinput)}
        >
          <p className="text">Number</p>
          <input
            id={phoneInputId}
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={phone}
            onChange={handleChange}
            required
          />
        </label>
        <button
          type="submit"
          className={clsx('button-common button-main', css.buttonadd)}
        >
          {buttonContent}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
