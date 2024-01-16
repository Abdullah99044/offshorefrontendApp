import { useState , createContext , ReactNode  } from 'react';
 



interface Authentication {
    authenticated: boolean;
    logIn: (jwt: TokenData) => void;
     
    logout: () => void;
    GetUserEmail : () => string ;
    SetEmail : (email : string) => void;
    SetIsConfirmerd : (value : string) => void;
    IsConfirmerd : () => string;
    getJwt : () => string;
    
}

interface TokenData {
  token: string;
  expire: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

//Authentication context

const AuthContext = createContext<Authentication | undefined>(undefined);

//Authentiction provider to wrap around routers

const AuthProvider = ({ children }: AuthProviderProps) => {


    const [authenticated, setAuthenticated] = useState(false);

    const [Email , setEmail ] = useState("email");

    const [Confirmation , SetConfirmation] = useState("");
   
    const [jwt, setJwt] = useState<TokenData  >( { token : " " , expire : " "});
  


    //Set  the user email  confiermation status
    const SetIsConfirmerd = (value : string ) => {

      return SetConfirmation(value);

    }


    //Retrun if the user email is confirmerd 
    const IsConfirmerd = ( ) => {

      return Confirmation;

    }



    //Retrun  user email 

    const GetUserEmail  = () => {

      return Email;

    }

    const getJwt = () => {

      
      return(jwt.token)
    }

    //Set  user email  

    const SetEmail = (email : string) => {

      return setEmail(email);
      
    }


    //Insert the JWT token 

     

     
    const logIn = (jwt: TokenData) => {

      localStorage.setItem('jwt', jwt.token);
      setJwt(jwt);
    
      return setAuthenticated(true);
    };
  
    const logout = () => {
      // Perform logout logic
      localStorage.removeItem('jwt');
      setJwt({token : "" , expire : ""});
      setAuthenticated(false);
      window.location.href = '/';      
      console.log("log out");
    };
  
    return (
      <AuthContext.Provider value={{ authenticated  , getJwt  , logIn     , logout , SetEmail , GetUserEmail , SetIsConfirmerd
        , IsConfirmerd }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthContext, AuthProvider };
 
   




 
