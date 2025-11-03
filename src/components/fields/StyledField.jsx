import styled, { css } from 'styled-components';

export const StyledField = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    ${props => props.placement && props.placement == 'side' && css`
        flex-direction: row;
        align-items: center;

        label {
            width: 25%;
            text-align: right;
            margin-right: 16px;
            margin-bottom: 0 !important;
        }
    `}

    label {
        font-size: 13px;
        display: block;
        margin-bottom: 6px;
        color: #71787e;
    }

    textarea {
        appearance: none;
        outline: none;
        background: #FFF;
        resize: vertical;
        width: 100%;
        padding: 8px;
        border: 1px solid #e8e9e9;
        transition: box-shadow .1s ease, border-color .1s ease;
        border-radius: 4px;
        max-height: 200px;

        ::placeholder {
            opacity: 1;
            color: #a6a9ac;
        }

        &:focus {
            box-shadow:0 0 0 3px rgba(199, 225, 242, 0.478);
            border-color: rgb(172, 208, 245);
        }
    }


    input, select {
        appearance: none;
        outline: none;
        background: #FFF;
        width: 100%;
        padding: 0 8px;
        height: 35px;
        border: 1px solid #e8e9e9;
        border-radius: 4px;
        transition: box-shadow .1s ease, border-color .1s ease;
        text-overflow: ellipsis; 
        /* box-shadow: rgba(44,95,140,0.05) 0px 3px 4px -1px; */

        ::placeholder {
            opacity: 1;
            color: #a6a9ac;
        }

        &:focus {
            box-shadow:0 0 0 3px rgba(199, 225, 242, 0.478);
            border-color: rgb(172, 208, 245);
        }
    }
`;

