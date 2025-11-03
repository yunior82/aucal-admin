import React, { createContext, useContext, useState, useEffect } from 'react'
import cookies from 'js-cookie';

// Crea el contexto inicial de la aplicación
const AuthContext = createContext();

// Exporta el uso de auth
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [bearer, setBearer] = useState(cookies.get(process.env.NEXT_PUBLIC_COOKIE));
    const [user, setUser] = useState();

    const login = (token) => {
        setBearer(token);
        cookies.set(process.env.NEXT_PUBLIC_COOKIE, token, { expires: 365 });
    }

    const logout = (token) => {
        cookies.remove(process.env.NEXT_PUBLIC_COOKIE);
        setBearer(false);
        setUser(false);
    }

    const getUserData = async () => {
        if (bearer) {
            const res = await fetch(`/api/me`, { headers: { 'X-Minerva-Bearer': bearer } });
            switch (res.status) {
                case 200:
                    setUser(await res.json());
                    return true;
                case 401:
                    setBearer(false);
                    cookies.remove(process.env.NEXT_PUBLIC_COOKIE)
            }
        }

        return false;
    }

    useEffect(() => {
        getUserData();
    }, [bearer])

    // Crea y devuelve el contexto
    return (<AuthContext.Provider value={{ booting: user === undefined, user, bearer, login, logout }}>{children}</AuthContext.Provider>);

}