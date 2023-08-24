import React from "react";
import getProductTypes from "../../utils/productTypes";

const CheckBox = ({ value }) => {
  const productTypes = getProductTypes();
  return (
    <div className="flex items-center">
      <div className="w-4 h-4 bg-neutral-200 rounded"></div>
      <p className="ml-2">{productTypes[value][0]}</p>
    </div>
  );
};

export default CheckBox;
