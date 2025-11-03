import { forwardRef } from 'react';
import styled from 'styled-components';
import { StyledField } from './StyledField';
import Icon from '@/components/Icon';
import { mdiChevronDown } from '@mdi/js';

const StyledSelect = styled(StyledField)`
    svg {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        height: 16px;
        pointer-events: none;
        fill: rgb(144, 144, 144);
    }

    select {
        padding-right: 24px;
    }


    option {
        :disabled {
            color: rgb(212, 212, 212);
        }
    }
`;

// eslint-disable-next-line react/display-name
export const Selector = forwardRef(({ style, placeholder, placement, children, label, errors, ...props }, ref) => {
    return <StyledSelect style={style} placement={placement}>
        {label && <label>{label}</label> }
        <div style={{ flex: 1, position: 'relative' }}>
            <select ref={ref} {...props}>
                <option disabled value="">{ placeholder ? placeholder : 'Selecciona una opción'}</option>
                {children}
            </select>
            <Icon path={mdiChevronDown} />
        </div>
    </StyledSelect>
});
