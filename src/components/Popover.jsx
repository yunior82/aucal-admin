import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPopper } from '@popperjs/core';

const StyledPopover = styled.div`
    box-shadow: 0 0 0 1px rgba(136,152,170,.1),0 15px 35px 0 rgba(49,49,93,.1),0 5px 15px 0 rgba(0,0,0,.08);
    border-radius: 6px;
    background: white; 
    padding: 12;
    z-index: 9995;
    position: absolute;
`;


export function Popover({ close, target, children, indexKey }) {
    const [popper, setPopperInstance] = useState(false);
    const ref = useRef(false);

    // Gestiona los clicks fuera del componente
    const handleOutsideClick = (e) => {
        // Hemos hecho click fuera del componente actual
        if (ref?.current && !ref.current.contains(e.target) && !target?.contains(e.target)) {
            // Recuperamos los demás popovers abiertos
            let elements = Array.from(document.querySelectorAll('[data-index]'));

            // Comprobamos si el elemento es hijo de otro popover
            for (const element of elements) {
                let elementIndex = element.getAttribute('data-index');
                // El elemento no se puede cerrar
                if (element.contains(e.target) && elementIndex > indexKey) {
                    return false;
                }
            }
            
            // Cerramos el elemento
            close();
        }
    }

    // Asignamos los eventos al montar el componente
    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, []);

    // Genera la instancia de Popper
    useEffect(() => {
        if (ref?.current && target) {
            setPopperInstance((popper) => {
                if (popper) popper.destroy();
                return createPopper(target, ref.current, { placement: 'bottom-start' });
            });
        }

        // Destruimos la instancia de Popper al terminar
        return () => popper && popper.destroy();
    }, [ref, target]);

    return <StyledPopover ref={ref} data-index={indexKey} hidden={popper === false}>
        {children}
    </StyledPopover>
}