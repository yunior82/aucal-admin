import styled from "styled-components";

const Dropdown = styled.div`
    padding: 4px 0;
    display: flex;
    flex-direction: column;

    a {
        display: flex;
        padding: 6px 8px;
        cursor: pointer;
        font-size: 13px;

        &:hover {
            background: #e10031;
            color: #ffffff;
        }
    }
`;

export default Dropdown;

