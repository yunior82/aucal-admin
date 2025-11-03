import styled, { css } from 'styled-components';
import Icon from '@/components/Icon';
import { mdiChevronDoubleLeft, mdiChevronDoubleRight, mdiChevronDown, mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const StyledPagination = styled.div`
    display: flex;
    border: 1px solid  #e8e9e9;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 12px;
`;

const StyledItem = styled.a`
    background: #FFF;
    display: flex;
    height: 32px;
    align-items: center;
    min-width: 36px;
    padding: 0 8px;
    justify-content: center;
    cursor: pointer;
    user-select: none;

    ${props => props.active && css`
        background: #e10031;
        color: #FFF;
    `}

    &:not(:last-child) {
        border-right: 1px solid #e8e9e9;
    }

    ${props => !props.active && css`
        &:hover {
            background: #fafafc;
        };
    `}



    svg {
        height: 18px;
    }
`;

const PageStatus = styled.div`
    font-size: 12px;
    display: flex;
    color: #6a7383;
    align-items: center;
    padding: 6px 0;

    svg {
        fill: #6a7383;
        height: 16px;
        margin-left: 2px;
        display: none;
    }
`;

export function Pagination({ currentPage, pages, nextPage, prevPage, totalPages, totalItems, setPage }) {
    return <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {totalPages > 1 && <>
                <StyledPagination>
                    {!pages.includes(1) && <>
                        <StyledItem onClick={() => setPage(1)}>
                            <Icon path={mdiChevronDoubleLeft} />
                        </StyledItem>
                    </>}
                    {currentPage > 1 && <>
                        <StyledItem onClick={() => prevPage()}>
                            <Icon path={mdiChevronLeft} />
                        </StyledItem>
                    </>}
                    {
                        pages.map((page, i) => {
                            return <StyledItem onClick={() => setPage(page)} key={i} active={page == currentPage}>{page}</StyledItem>
                        })
                    }
                    {currentPage < totalPages && <>
                        <StyledItem onClick={() => nextPage()}>
                            <Icon path={mdiChevronRight} />
                        </StyledItem>
                    </>}
                    {!pages.includes(totalPages) && <>
                        <StyledItem onClick={() => setPage(totalPages)}>
                            <Icon path={mdiChevronDoubleRight} />
                        </StyledItem>
                    </>}
                </StyledPagination>
            </>}
            <PageStatus>
                <span>Página {currentPage} de {totalPages} ({totalItems} resultados)</span>
                <Icon path={mdiChevronDown} />
            </PageStatus>
        </div>
    </>
}