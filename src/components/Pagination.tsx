
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {

    const disablePrev = currentPage === 1
    const disableNext = currentPage === totalPages

  return (
    <div className="join flex justify-center space-x-2 mt-4">
      <button className={`joint-item btn ${disablePrev ? "btn-disabled" : ""}`} onClick={() => onPageChange(currentPage)}>
        Previous
      </button>
      <button className="join-item btn btn-disabled no-animation">
        Page {currentPage} of {totalPages}
      </button>
      <button className={`joint-item btn ${disableNext ? "btn-disabled" : ""}`} onClick={() => onPageChange(currentPage)}>
        Next
      </button>
    </div>
  );
};
