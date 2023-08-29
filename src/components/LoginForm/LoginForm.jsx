import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import css from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={clsx(css.inputs, 'scaleincenteranimation')}>
        <p className="text">Email</p>

        <input type="email" name="email" />
      </label>
      <label className={clsx(css.inputs, 'scaleincenteranimation')}>
        <p className="text">Password</p>

        <input type="password" name="password" />
      </label>
      <button
        type="submit"
        className={clsx(
          'button-common button-main scaleincenteranimation',
          css.loginbtn
        )}
      >
        <p className={css.loginbtntext}>Log In</p>
      </button>
    </form>
  );
};
