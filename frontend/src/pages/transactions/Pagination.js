import { Link } from 'react-router-dom';

const Paginate = ({ postsPerPage, totalPosts, currentTrans, paginate, prevPagefunc, currentPage, nextPagefunc }) => {
  const pageNumbers = [];
  const ellipsis = '...';

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getPageNumbersWithEllipsis = () => {
    if (pageNumbers.length <= 7) {
      // If there are fewer than or equal to 7 pages, show all the page numbers
      return pageNumbers;
    }

    const result = [];
    const current = currentPage;
    let left = current - 2;
    let right = current + 2;

    // Add first page
    result.push(1);

    // Add ellipsis or pages before current page
    if (left > 2) {
      result.push(ellipsis);
    }

    // Add pages around current page
    for (let i = left; i <= right; i++) {
      if (i > 1 && i < pageNumbers.length) {
        result.push(i);
      }
    }

    // Add ellipsis or last page
    if (right < pageNumbers.length - 1) {
      result.push(ellipsis);
    }

    // Add last page
    result.push(pageNumbers.length);

    return result;
  };

  return (
    <div className='d-flex align-items-center justify-content-between' aria-label="...">
      <div className='pe-4'>
        <span className="text-muted fs-6 fw-light">Showing {currentTrans?.length} out of {totalPosts}</span>
      </div>
      {/* <ul className="pagination pagination-md">
        <li className={`page-item cursor-pointer ${currentPage === 1 ? 'disabled' : ''}`}>
          <span onClick={prevPagefunc} className="page-link">Previous</span>
        </li>
        {getPageNumbersWithEllipsis().map((number, index) => (
          <li className={`page-item`} key={index}>
            {number === ellipsis ? (
              <span className="page-link">...</span>
            ) : (
              <Link onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'bg-primary text-white' : ''}`}>
                {number}
              </Link>
            )}
          </li>
        ))}
        <li className={`page-item cursor-pointer ${currentPage === pageNumbers?.length ? 'disabled' : ''}`}>
          <span onClick={nextPagefunc} className="page-link">Next</span>
        </li>
      </ul> */}
    </div>
  );
};

export default Paginate;
