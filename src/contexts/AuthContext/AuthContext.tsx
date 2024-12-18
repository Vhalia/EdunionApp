import React, { useState } from "react";
import User from "../../models/User";
import ContextProps from "../props/contextProps";
import useStorage from "../../hooks/useStorage";

const Context = React.createContext<AuthExposed|undefined>(undefined)

const AuthContext = (props : ContextProps) => {
    const [currentUser, setCurrentUser] = useState<User>();
    const [token, setToken] = useState<string>("");
    
    const storage = useStorage();
    
    const logout = () => {
        setCurrentUser(undefined);
        setToken("")
        storage.delete("token")
    }

    const exposedValue : AuthExposed = {
        currentUser,
        setCurrentUser,
        logout,
        token,
        setToken
    }

    return (
        <Context.Provider value={exposedValue}>
            {props.children}
        </Context.Provider>
    )
}

interface AuthExposed {
    currentUser?: User,
    setCurrentUser: (user: User) => void,
    logout: () => void,
    token: string,
    setToken: (token: string) => void
}

export {Context, AuthContext}

export default Context