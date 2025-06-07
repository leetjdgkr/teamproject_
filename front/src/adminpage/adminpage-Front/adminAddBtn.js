import React from "react";

const AddButton = ({ onAdd }) => {
  return (
    <button type="button" className="add-btn" onClick={onAdd}>
      추가
    </button>
  );
};

export default AddButton;