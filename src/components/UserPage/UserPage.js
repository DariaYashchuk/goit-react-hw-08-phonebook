import clsx from 'clsx';
import { useAuth } from 'hooks';
import { images } from 'images/images';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from 'redux/auth/operations';
import css from './UserPage.module.css';

export const UserPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  return (
    <>
      <div className={css.avatarwrapp}>
        <img src={images.avatar} alt="logo" className={css.avatar} />
      </div>
      <h1 className={css.header}>Welcome, {user.name}</h1>
      <p className={css.text}>
        Feel free to check your contacts list{' '}
        <Link to="/contacts" className={css.link}>
          here
        </Link>
      </p>
      <p className={css.text}>
        In case you want to create the contact, it can be done{' '}
        <Link to="/" className={css.link}>
          here
        </Link>
      </p>
      <button
        type="button"
        className={clsx('button-common button-main logoutbtn')}
        onClick={() => dispatch(logOut())}
      >
        Logout
      </button>
    </>
  );
};
