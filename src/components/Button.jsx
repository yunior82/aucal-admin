import styled, { css } from "styled-components";

export const Button = styled.div`
    display: flex;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-color: #e8e9e9;
    height: 34px;
    padding: 0 14px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    color: inherit;
    text-decoration: none;

    &:hover {
        background: #f6f7fa;
    }

    ${props => props.theme == 'blue' && css`
        background: #1d74f5;
        border-color:#1d74f5;
        color: #FFF;
        fill: #FFF;

        &:hover {   
            background: #3f8dff;
            border-color: #3f8dff;
        }
    `}

    ${props => props.theme == 'red' && css`
        background: #e10031;
        border-color: #e10031;
        color: #FFF;
        fill: #FFF;

        &:hover {   
            background: #eb4646;
            border-color: #eb4646;
        }
    `}

    svg {
        height: 20px;
        display: block;
        transform: translateX(-4px);
        pointer-events: none;
    }
`;

export default Button;