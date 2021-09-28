import { useRef } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  entries_per_page: number;
  total_results: number;
}

const Pagination: NextPage<PaginationProps> = (props) => {
  const { page, entries_per_page, total_results } = props;
  const router = useRouter();
  const isPageLoad = useRef(false);

  if (!total_results) {
    return null;
  }

  const handelPageChange = ({ selected }: { selected: number }) => {
    if (!isPageLoad.current) {
      isPageLoad.current = true;
      return;
    }

    router.push({
      query: { page: Math.max(1, selected + 1) }
    });
  };

  if (total_results < entries_per_page) {
    return null;
  }

  return (
    <>
      <div className={styles.pagination}>
        <ReactPaginate
          initialPage={Math.max(0, page - 1)}
          pageCount={Math.floor(total_results / entries_per_page)}
          pageRangeDisplayed={0}
          marginPagesDisplayed={3}
          activeClassName={styles.selected}
          breakClassName={styles.break}
          onPageChange={handelPageChange}
          nextLabel={<span aria-hidden="true">&raquo;</span>}
          previousLabel={<span aria-hidden="true">&laquo;</span>}
        />
      </div>
    </>
  );
};

export default Pagination;
