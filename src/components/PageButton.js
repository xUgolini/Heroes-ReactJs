const PageButton = ({ pageNumber, changePage, selectedPage }) => {
  return (
    <button
      onClick={() => changePage(pageNumber)}
      className={`p-2 text-white font-bold bg-blue-700 hover:bg-blue-900 min-w-[40px] max-w-[40px] ${
        selectedPage === pageNumber ? "bg-blue-950" : ""
      }`}
    >
      {pageNumber}
    </button>
  );
};

export default PageButton;
