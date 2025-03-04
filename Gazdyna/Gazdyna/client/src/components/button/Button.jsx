import React from "react";

const Button = ({
  content,
  customCss,
  type = "button",
  loading,
  handleClick = null,
  icon = null,
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`bg-primaryLight hover:bg-primary text-light py-2 px-5 shadow-lg font-semibold flex items-center justify-center gap-2 max-h-max text-center ${customCss}`}
      onClick={handleClick}
    >
      {loading ? (
        <>
          <div className="loader inline w-4 h-4 mr-3" />
          {"Loading..."}
        </>
      ) : (
        <>
          {content}
          {icon}
        </>
      )}
    </button>
  );
};

export default Button;
