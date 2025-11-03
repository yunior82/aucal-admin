import { useContext, useEffect, useState } from 'react'
import { AtenaContext } from '.';
import { Popover } from '@/components/Popover';

/**
 * Crea un nuevo popover y devuelve las funciones para mostrarlo
 * @param {Component} component 
 * @param {Array} inputs 
 * @returns 
 */
export function usePopover(Component) {
    const ctx = useContext(AtenaContext);
    const [state, setState] = useState({ key: false, target: false });

    const handleClose = (key) => {
        ctx.removeComponentAtRoot(key);
        setState({ key: false, target: false });
    }

    return {
        toggle: (target, props) => {
            if (state.key) {
                ctx.removeComponentAtRoot(state.key);
            }
            
            if (state.target !== target) {
                let key = ctx.generateUniqueKey();
                ctx.addComponentAtRoot(key, <Popover key={key} indexKey={key} target={target} close={() => handleClose(key)}>
                    <Component close={() => handleClose(key)} {...props} />
                </Popover>);
                setState({ key, target });
                return;
            }

            setState({ key: false, target: false })
        },
        close: () => handleClose(key)
    }
}