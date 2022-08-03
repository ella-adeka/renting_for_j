import  React,{ createContext, useState } from "react";

const AuthContext = createContext({user: {}});

export function AuthProvider({children}){
    const [ user, setUser ] = useState({});

   
    return(
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default {AuthContext};