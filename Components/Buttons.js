import React from "react";

const Buttons = ({ pageNumber, onNext, onPrev }) => {
  return (
    <div className=" buttons">
      <button
        className="btn btn-primary"
        disabled={pageNumber == 1 ? true : false}
        onClick={onPrev}
      >
        Prev
      </button>
      <button className="btn btn-primary" onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default Buttons;
