
import { createContext, useContext, useState } from 'react'

// Crea el contexto global de la aplicación
export const AtenaContext = createContext();
const { Provider } = AtenaContext;

/**
 * Consumidor del contexto de Athena
 * 
 * @param {*} children 
 * @returns 
 */
export function useAthena() {
    const ctx = useContext(AtenaContext);
    return { };
}

/**
 * Proveedor del contexto de Athena
 * 
 * @param {*} children 
 * @returns 
 */
export function AthenaProvider({ children }) {
    const [state, setState] = useState({});
    const [components, setComponents] = useState([]);

    const generateUniqueKey = () => {
        return (new Date).getTime();
    }

    const addComponentAtRoot = (key, component) => {
        setComponents((prevState) => {
            let components = [...prevState];
            components.push({ key, component });
            return components;
        });
    }

    const removeComponentAtRoot = (key) => {
        let result = false;
        setComponents((prevState) => {
            let components = [...prevState];
            let index = components.findIndex((e) => e.key == key);
            if (index >= 0) {
                components.splice(index, 1);
                result = true;
                return components;
            }
            return prevState;
        });
        return result;
    }


    return <Provider value={{ generateUniqueKey, addComponentAtRoot, removeComponentAtRoot, state, setState }}>
        {
            components.map((component, index) => {
                return component.component;
            })
        }
        {children}
    </Provider>
}