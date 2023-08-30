import clsx from 'clsx';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
// import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getIsDeleting } from 'redux/contacts/contactsSelector';
import { deleteContact } from 'redux/contacts/operations';
import css from './ContactItem.module.css';

export const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
    toast.success(`${name} was successfully removed`);
  };
  const isDeleting = useSelector(getIsDeleting);

  //   const deleteButtonContent =
  //     isDeleting && !error ? (
  //       <RotatingLines
  //         strokeColor="white"
  //         strokeWidth="5"
  //         animationDuration="0.75"
  //         visible={true}
  //         width="16px"
  //         height="16px"
  //       />
  //     ) : (
  //       <BiTrash className={css.deleteicon} />
  //     );
  return (
    <>
      <p className={css.contactinfo}>
        <AiOutlineUserDelete className={css.usericon} />
        {name}: {number}
      </p>
      <button
        className={clsx('button-common button-main', css.deletebutton)}
        onClick={handleDeleteContact}
        disabled={isDeleting ? true : false}
      >
        <BiTrash className={css.deleteicon} />
      </button>
    </>
  );
};
