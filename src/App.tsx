 import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './Pages/Auth/AuthenticationProvider.tsx';
import WelcomePage from "./Pages/WelcomongPage.tsx";
import Login from "./Pages/LoginPage.tsx";
import Register from "./Pages/RegisterPage.tsx";
import NotFound from "./Pages/NotFoundPage.tsx";
import HomePage from "./Pages/HomePage.tsx";
import TriFloatPage from "./Pages/TriFloatPage.tsx";
import LogoutButton from "./Pages/Auth/Logout.tsx";
import "./index.css";
import "./App.css";
import MailConfirmation from "./Pages/Auth/MailConfirmation.tsx";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute.tsx";
import HistoryDataPage from "./Pages/HistoryDataPage.tsx";

function App() {
  const logIn = useContext(AuthContext);

  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <header className="bg-gray-400 w-screen h-[154px]">
          <nav className="text-right">
            <ul className="list-none">
            <li className="inline font-sans">
                     
                <img className="h-[125px] w-[250px]" src="./src/img/logo.svg" alt="logo" />
                  
            </li>
              {logIn?.authenticated === true ? (
                <>
                  
                  <li className="inline font-sans">
                
                      <img className="h-[75px] w-[150px] ml-[275px] absolute top-7 right-0" src="./src/img/mdim.png" alt="logo" />
                    
                  </li>
                  {logIn?.IsConfirmerd() === "False" && (
                    <li className="inline font-sans absolute top-0 right-0 mr-[70px]">
                      <Link to="/EmailConfirmation">Email Confirmation</Link>
                    </li>
                  )}
                  <li className="inline font-sans">{LogoutButton()}</li>
                </>
              ) : (
                <>
                  
                  <li className="inline font-sans absolute top-0 right-0 mr-[70px]">
                    <Link to="/Login">Login</Link>
                  </li>
                  <li className="inline font-sans absolute top-0 right-0">
                    <Link to="/Register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <div className="mb-auto">
          <Routes>
            <Route path="" element={<WelcomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/MailConfirmation" element={<ProtectedRoute> <MailConfirmation /> </ProtectedRoute>} />
            <Route path="/*" element={<NotFound />} />

            <Route path="/Home">
              <Route index element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
              <Route path="/Home/TriFloat/:id" element={<ProtectedRoute> <TriFloatPage /> </ProtectedRoute>} />
              <Route path="/Home/TriFloat/History/:DataType" element={<ProtectedRoute> <HistoryDataPage /> </ProtectedRoute>} />
            </Route>
          </Routes>
        </div>

        <div>
          <footer className="container mx-auto bg-gray-400 font-sans text-center absolute inset-x-0 bottom-0 pt-1">
            &copy; WaveHexaPod 2023
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;