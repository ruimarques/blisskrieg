import { useState } from 'react';
import { PAGING_LIMIT } from '../global-constants';

/**
 * Because in this exercise we don't know the amount of pages due to mock data,
 * here we artifitially grow the amount of pages as the user presses next.
 *
 */
const PaginationComponent = (props: {
  offset: number;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  const [foundPageTotal, setFoundPages] = useState(1);

  const currentPage = PAGING_LIMIT > 0 ? props.offset / PAGING_LIMIT + 1 : 1;

  const foundPages: number[] = [...Array(foundPageTotal).keys()].map(
    (i) => i + 1
  );

  return (
    <>
      <nav className="pagination is-small">
        <button
          className="pagination-previous"
          onClick={props.onPrevious}
          disabled={props.offset === 0}
        >
          Previous
        </button>
        <button
          className="pagination-next"
          onClick={() => {
            if (currentPage + 1 > foundPageTotal) {
              setFoundPages(currentPage + 1);
            }

            props.onNext();
          }}
        >
          Next page
        </button>

        <ul className="pagination-list">
          {foundPages.map((p) => (
            <li key={p}>
              <button
                className={
                  p === currentPage
                    ? 'pagination-link is-current'
                    : 'pagination-link'
                }
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default PaginationComponent;
