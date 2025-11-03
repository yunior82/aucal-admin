import { useEffect, useMemo, useState } from "react";

export function usePagination({ currentPage, totalItems, itemsPerPage, onChange }) {
    const [page, setPage] = useState(currentPage);
    const [pages, setPages] = useState([]);
    const totalPages = useMemo(() => Math.ceil(totalItems / (itemsPerPage ?? 20)), [totalItems]);

    useEffect(() => {
        if (onChange) {
            onChange(parseInt(page));
        }
    }, [page])

    useEffect(() => {
        setPage2(currentPage);
    }, [currentPage])

    const generatePagesArray = (currentPage) => {
        const numberOfPages = 5;
        const numbersAbove = totalPages - currentPage;
        let currentPosition = Math.ceil(numberOfPages / 2);

        // Array con los números de página
        let numbers = [];

        if (numbersAbove < Math.floor(numberOfPages / 2)) {
            currentPosition = numberOfPages - numbersAbove;
        } else if (currentPage < Math.ceil((numberOfPages - 1) / 2)) {
            currentPosition = currentPage;
        }

        let start = Math.max(1, currentPage - (currentPosition - 1));

        for (let i = 0; i < numberOfPages; i++) {
            let page = (start + i);
            if (page > totalPages) {
                break;
            }
            numbers.push(page);
        }

        setPages(numbers);
    }

    useEffect(() => {
        if (page)
            generatePagesArray(page);
    }, [page, totalPages])

    const setPage2 = (newPage) => {
        let cleanPage = parseInt(newPage);

        if (isNaN(cleanPage)) {
            return;
        }

        if (cleanPage != page) {
            generatePagesArray(cleanPage);
            setPage(cleanPage);
        }
    }

    return {
        nextPage: () => setPage2(page + 1),
        prevPage: () => setPage2(Math.max(1, currentPage - 1)),
        setPage: setPage2,
        page,
        pages,
        currentPage: page,
        totalPages,
        totalItems,
        isReady: page !== false
    }
}