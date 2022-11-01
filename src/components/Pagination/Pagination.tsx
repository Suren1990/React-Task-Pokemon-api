import styles from './Pagination.module.scss';
import { useEffect, useState } from "react";

interface PaginationProps {
    count: number;
    limit: number;
    changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ count, limit, changePage }) => {
    const pagesArr = [0]
    const [activePage, setActivePage] = useState(0);
    const [pagesCount, setPagesCount] = useState<Array<number>>([]);

    const currentPage = (index: number, page: number) => {
        setActivePage(index);
        changePage(page);
    }

    useEffect(() => {
        if (count) {
            for (let i = 1; i < count / limit; i++) {
                pagesArr.push(i * limit);
            }
            setPagesCount(pagesArr)
        } 
    }, [count, limit]);

    return (
        <div className={styles.pagination}>
            {
                pagesCount.length > 0 && (
                    pagesCount.map((page, index) => (
                        <button
                            className={`${styles.pagination__item} ${activePage === index ? styles.pagination__item_active : ""}`}
                            key={String(page)}
                            onClick={() => currentPage(index, page)}
                        >{index + 1}</button>
                    ))
                )
            }
        </div>
    );
};

export default Pagination;
