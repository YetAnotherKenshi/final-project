import React, { useState } from "react";
import getProductTypes from "../../utils/productTypes";

const CheckBoxField = ({ items, onChange, query, name }) => {
  const handleChange = ({ target }) => {
    onChange(target, name);
  };
  return (
    <div>
      {items.map((i) => (
        <label key={i.name} className="flex items-center">
          <input
            type="checkbox"
            name={i.name}
            onChange={handleChange}
            checked={query[name][i.name] || false}
            className="form-checkbox h-5 w-5"
          />
          <span className="ml-1 text-neutral-700">{i.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBoxField;
