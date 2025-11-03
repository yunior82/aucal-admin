import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import App from '@/components/App';
import Login from '@/components/Login';

export const AuthMiddleware = ({ children }) => {
    const { user, bearer, booting } = useAuth();
    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
        setInitialized(true);
    }, [])

    // Si se está renderizando en el servidor o estamos recuperando los datos iniciales
    // devolvemos el componente de carga.
    if (typeof window === "undefined" || (bearer && booting) || (!bearer && !isInitialized)) {
        return null;
    }

    // Si no hay sesión activa tenemos que mostrar la página de inicio
    if (!bearer || !user) {
        return <Login />;
    }

    // Tenemos acceso, podemos renderizar la aplicación
    return <App>{children}</App>;
};