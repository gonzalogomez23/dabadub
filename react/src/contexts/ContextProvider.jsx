import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    // const [notification, _setNotification] = useState('');
    const [notification, _setNotification] = useState({ message: '', type: '' });
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setNotification = (message, type = 'success') => {
        _setNotification({ message, type });
        setTimeout(() => {
            _setNotification({ message: '', type: '' });
        }, 4000);
    };

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)