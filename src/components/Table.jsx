import styled, { css, keyframes } from 'styled-components';

export const StyledTable = styled.div`
	overflow: auto hidden;
	border: 1px solid rgb(232, 233, 233);
	border-radius: 2px;
	transform: translateZ(0px);
    z-index: 5;
    position: relative;

    table {
        color: inherit;
        width: 100%;
        border-spacing: 0px;
        table-layout: auto;
        white-space: nowrap;
        color: #282a31;

        th {
            font-weight: 300;
            text-align: left;
            border-bottom: 1px solid #e8e9e9;
            background: rgb(246, 247, 250) none repeat scroll 0% 0%;
            color: rgb(96, 120, 144);
            padding: 0 12px;
            line-height: 40px;
        }

        th, td {
            &:first-child {
                border-right: 1px solid #e8e9e9;
                position: sticky;
                left: 0px;
                z-index: 1;
            }
        }


        tr {            
            &:hover td {
                background: #fafafc;
            }

            &:not(:last-child) {
                td {
                    border-bottom: 1px solid #e8e9e9;
                }
            }

            td {
                color: rgb(64, 68, 82);
                fill: rgb(66, 72, 87);
                transition: opacity .1s ease;
                background: #FFF;

                ${props => props.fetching && css`
                    opacity: .4;
                `}

                a {
                    display: flex;
                    padding: 12px;
                    text-decoration: none;
                    color: inherit;
                    align-items: center;
                    height: 42px;
                }
            }
        }
    }
`;

const Checkbox = styled.div`
    border: 1px solid #e8e9e9;
    height: 18px;
    width: 18px;
    background: #FFF;
    display: block;
    margin-right: 8px;
    border-radius: 4px;
`;

const SpinningAnimation = keyframes`
    0% {transform:rotate(0deg);}
    100% {transform:rotate(360deg);}
`;

export const Spinning = styled.div`
    position:absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        fill: #ccced4;
        height: 28px;
        animation: ${SpinningAnimation} .6s infinite linear;
    }
`;

export const PopoverButton = styled.div`
    display: flex;
    border-radius: 4px;
    padding: 3px 5px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: border-color .1s ease, background-color .1s ease, box-shadow .1s ease;

    &:hover {
        border-color: #dadada;
        background-color: #FFF;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.1);
    }

    svg {
        height: 18px;
        fill : #6a7383;
    }
`;