import { useContext, useEffect, useRef, useState } from 'react'
import { Modal } from '@/components/Modal';
import { AtenaContext } from './useAthena';

/**
 * Crea un nuevo modal y devuelve las funciones para mostrarlo
 * @param {Component} component 
 * @param {Array} inputs 
 * @returns 
 */
export function useModal(Component, options) {
    // Recupera el contexto global
    const ctx = useContext(AtenaContext);
    // Genera una nueva llave única
    const [key, setKey] = useState(false);

    const handleClose = (key, props) => {
        ctx.removeComponentAtRoot(key);
        setKey(false);
        if(options && options.onClose) {
            options.onClose(props);
        }
    }

    return {
        display: (props) => {
            let key = ctx.generateUniqueKey();
            ctx.addComponentAtRoot(key, <Modal key={key} close={(props) => handleClose(key, props)}>
                <Component {...props} close={(props) => handleClose(key, props)} />
            </Modal>);
            setKey(key);
        },
        isOpen: key !== false,
        close: () => handleClose(key)
    }
}