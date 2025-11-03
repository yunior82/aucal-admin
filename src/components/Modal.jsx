/* eslint-disable react/display-name */
import { mdiClose } from '@mdi/js';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Icon from '@/components/Icon';

const StyledModal = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(82,95,127,.25);
    z-index: 9995;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 12px;
    overflow: hidden;
`;

const Box = styled.div`
	background: #fcfcfe;
	border-radius: 6px;
	box-shadow: 0 0 10px 0 rgba(44,95,140,.1);
	width: 480px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const StyledHeader = styled.div`
	position: relative;
	border-bottom: 1px solid rgb(233,233,236);
	padding: 16px 24px;
	background: #FFF;

    h1 {
        display: block;
        font-size: 18px;
        margin-top: 2px;
    }

    svg {
        position: absolute;
        right: 16px;
        top: calc(50%);
        bottom: 50%;
        transform: translateY(-50%);
        width: 21px;
        cursor: pointer;
        height: 21px;
    }
`;

export function Modal({ close, children }) {
    const ref = useRef();

    // Gestiona los clicks fuera del Modal
    const handleOutsideClick = (e) => {
        // Hemos hecho click fuera del Modal actual
        if (e.target == e.currentTarget) {
            close();
        }
    }

    // Asignamos los eventos al montar el componente
    useEffect(() => {
        ref.current?.addEventListener('click', handleOutsideClick);
        return () => ref.current?.removeEventListener('click', handleOutsideClick);
    }, [ref]);

    return <StyledModal ref={ref}>
        <Box>
            {children}
        </Box>
    </StyledModal>
}

Modal.Header = function({ handleClose, children }) {
    return <StyledHeader>
        { children }
        <Icon path={mdiClose} onClick={() => handleClose()} />
    </StyledHeader>
}

Modal.Body = styled.div`
    padding: 16px 24px;
    overflow-y: auto;
    flex: 1;
`;

Modal.Footer = styled.div`
	background: #FFF;
	padding: 16px 24px;
	border-top: 1px solid rgb(233,233,236);
    display: flex;
    justify-content: flex-end;
`;