import { useSelector } from 'react-redux';

/**
 * This hook is getting user data from localStorage and Redux Store,
 * and check if their data is exists in there
 * @returns {Boolean}
 */
const useValidUser = () => {
  const lsToken = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  const { username: lsName, email: lsEmail, role: lsRole } = JSON.parse(user) ?? {};
  const { token, name, email, role } = useSelector((state) => state.user);

  const isValidUser =
    Boolean(lsToken) &&
    Boolean(lsName) &&
    Boolean(lsEmail) &&
    Boolean(lsRole) &&
    Boolean(token) &&
    Boolean(name) &&
    Boolean(email) &&
    Boolean(role);

  return isValidUser;
};

export default useValidUser;
