import React from "react";

const InputType = ({
  labelFor,
  labelText,
  inputType,
  name,
  value,
  onchange,
  placeHolder,
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={labelFor} className="form-label">
          {labelText}
        </label>
        <input
          type={inputType}
          name={name}
          className="form-control"
          value={value}
          onChange={onchange}
          maxLength={40}
          required
          placeholder={placeHolder}
        />
      </div>
    </>
  );
};

export default InputType;
