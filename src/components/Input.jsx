import React from "react";

const Input = ({ type, name, onChange, value, placeholder }) => {
  return (
    <input
      className="p-3 border-2 border-slate-400 rounded-md "
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
