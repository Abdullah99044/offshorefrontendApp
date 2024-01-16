import  { useContext } from 'react';
import { AuthContext } from './AuthenticationProvider';



const LogoutButton = () => {

  const  logout  = useContext(AuthContext);

  const handleLogout = () => {
    logout?.logout();
  };

  return (
    <div className="absolute top-0 right-0">
    <button onClick={handleLogout} className="font-sans">
      Logout
    </button>
    </div>
  );
};

export default LogoutButton;