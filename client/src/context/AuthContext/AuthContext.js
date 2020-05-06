import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [authCheck, setAuthCheck] = useState(false);

   
    const checkAuthenticated = () => {
        let access_token = localStorage.getItem('access_token');
        return access_token && access_token.length > 10 ;
    }



    const logOut = () => {
        localStorage.removeItem('access_token');
    }

    return (
        <AuthContext.Provider value={{ authCheck, checkAuthenticated, logOut }} >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;