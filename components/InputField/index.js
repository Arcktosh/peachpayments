import React, { useState } from "react"

const InputField = ({
  id = "input",
  placeholder = "Input Text Here",
  icon,
  type = "text",
  onChange,
  value,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div
      className={`mb-3 mt-3 form-group w-full border-gray-400 border-opacity-50 border-2 border-solid rounded-lg ${
        icon ? "icon-input" : ""
      }`}>
      {icon ? (
        icon == "ti-lock" ? (
          <a onClick={handleClickShowPassword}>
            <i
              className={`-mt-1 text-lg text-fieldIconColor ${
                showPassword ? "ti-unlock" : "ti-lock"
              }`}></i>
          </a>
        ) : (
          <i className={`-mt-1 text-lg text-fieldIconColor ${icon}`}></i>
        )
      ) : (
        <></>
      )}
      <input
        id={id}
        name={id}
        type={type == "password" ? (showPassword ? "text" : type) : type}
        className={`style2-input ${
          icon ? "ps-5" : ""
        } form-control text-grey-900 fw-600 `}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={
          type == "password"
            ? "current-password"
            : type == "email"
            ? "username"
            : type
        }
        value={value}
        required={required}
      />
    </div>
  )
}

export default InputField
