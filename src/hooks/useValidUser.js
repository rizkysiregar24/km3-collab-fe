import { useSelector } from 'react-redux';

/**
 * This hook is getting user data from localStorage and Redux Store,
 * and check if their data is exists in there
 * @returns {Boolean}
 */
const useValidUser = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const userDataRedux = useSelector((state) => state.user);

  const isValidUser =
    Boolean(userData?.username) &&
    Boolean(userData?.email) &&
    Boolean(userData?.role) &&
    Boolean(userDataRedux?.name) &&
    Boolean(userDataRedux?.email) &&
    Boolean(userDataRedux?.role);

  return isValidUser;
};

export default useValidUser;
