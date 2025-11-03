import { useEffect, useMemo, useRef, memo, forwardRef } from 'react';
import styled from 'styled-components';
import { StyledField } from './StyledField';

const StyledInput = styled(StyledField)`
    svg {
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        height: 20px;
        pointer-events: none;
        fill: rgb(144, 144, 144);
    }
`;

// eslint-disable-next-line react/display-name
export const Input = forwardRef(({ label, placement, errors, style, ...props }, ref) => {   
    return <StyledInput placement={placement} style={style}>
        { label && <label>{label}</label> }
        <div style={{ flex: 1 }}>
            <input ref={ref} {...props}/>
        </div>
    </StyledInput>
});