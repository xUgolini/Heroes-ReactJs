const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="self-end p-2 ml-2 text-white bg-blue-700 hover:bg-blue-900"
    >
      {children}
    </button>
  );
};

export default Button;
