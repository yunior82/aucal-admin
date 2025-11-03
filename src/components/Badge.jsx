import styled, { css } from "styled-components";

const Badge = styled.div`
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 13px;
    background: #ebeef1;
    color: #6a7383;

    ${props => props.theme == 'green' && css`
        background: #d7f7c2;
        color: #05690d;
    `}

    ${props => props.theme == 'red' && css`
        background: #ffd4d4;
        color: #a00e09;
    `}

    ${props => props.theme == 'orange' && css`
        background: #ffebc4;
        color: #866422;
    `}
`;

export default Badge;

