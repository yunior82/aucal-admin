import styled from "styled-components";

const Search = styled.div`
    position: relative;
    display: flex;
    width: 210px;

    input {
        width: 100%;
        padding: 0 12px;
        padding-left: 32px;
        height: 34px;
        border: 1px solid #e8e9e9;
        border-radius: 4px;
        transition: box-shadow .1s ease, border-color .1s ease;

        &:focus {
            box-shadow:0 0 0 3px rgba(199, 225, 242, 0.478);
            border-color: rgb(172, 208, 245);
        }
    }

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

export default Search;