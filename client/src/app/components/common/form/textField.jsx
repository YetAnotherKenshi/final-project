import React, { useState } from "react";

const TextField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  min = 0,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    let value = target.value;
    if (type === "number") {
      value = Math.max(min, Number(value));
    }
    onChange({ name: target.name, value });
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
      <div>
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="border border-neutral-100 w-full h-12 rounded-md pl-4 text-md shadow focus:outline-neutral-300 focus:shadow-md"
          placeholder={`${name === "phone" ? "+7 (777) 777-77-77" : ""}`}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextField;
