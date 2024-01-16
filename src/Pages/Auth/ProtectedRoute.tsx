import { ReactNode , useContext } from "react";
import {  AuthContext  } from './AuthenticationProvider.tsx';
import { Navigate } from "react-router-dom";




interface  Props {

    children : ReactNode 

}

const ProtectedRoute = ({ children }  : Props  ) => {

    const auth = useContext(AuthContext);

    return auth?.authenticated ? children : <Navigate to="/" replace />


};


export default ProtectedRoute ;