const Pagination = (props: {
  offset: number;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="pagination-previous"
        onClick={props.onPrevious}
        disabled={props.offset === 0}
      >
        Previous
      </button>
      <button className="pagination-next" onClick={props.onNext}>
        Next page
      </button>
    </nav>
  );
};

export default Pagination;
