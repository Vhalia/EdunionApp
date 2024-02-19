import React, { useState } from "react";
import User from "../../models/User";
import ContextProps from "../props/contextProps";

const Context = React.createContext<AuthExposed|undefined>(undefined)

const AuthContext = (props : ContextProps) => {
    const [currentUser, setCurrentUser] = useState<User>();
    
    const logout = () => {
        setCurrentUser(undefined);
        //redirect
    }

    const exposedValue : AuthExposed = {
        currentUser,
        setCurrentUser,
        logout
    }

    return (
        <Context.Provider value={exposedValue}>
            {props.children}
        </Context.Provider>
    )
}

interface AuthExposed {
    currentUser?: User,
    setCurrentUser: (user: User) => void
    logout: () => void
}

export {Context, AuthContext}

export default Context