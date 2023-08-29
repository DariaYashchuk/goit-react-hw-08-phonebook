import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import css from './UserMenu.module.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { images } from 'images/images';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Link to="/user" className={clsx('button-common btn-nav', css.userwrapp)}>
      <div className={css.avatarwrapp}>
        <img src={images.avatar} alt="logo" className={css.avatar} />
      </div>
      <p className={css.username}>{user.name}</p>
      <button
        type="button"
        className={clsx('button-common button-main logoutbtn')}
        onClick={() => dispatch(logOut())}
      >
        Logout
      </button>
    </Link>
  );
};
