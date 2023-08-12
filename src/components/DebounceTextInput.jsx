import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

const DebounceTextInput = ({ placeHolder, onChange, disabled, delay, minLetter, className }) => {
  const debounceFilter = useCallback(
    debounce((value) => {
      if (value.length >= minLetter) {
        onChange(value);
      }
    }, delay),
    [minLetter, delay, onChange]
  );

  const handleInputChange = (e) => {
    debounceFilter(e.target.value);
  };

  return (
    <input
      type="text"
      className={className}
      placeholder={placeHolder}
      onChange={handleInputChange}
      disabled={disabled}
    />
  );
};

DebounceTextInput.propTypes = {
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  delay: PropTypes.number,
  minLetter: PropTypes.number,
  className: PropTypes.string,
};

DebounceTextInput.defaultProps = {
  placeHolder: "",
  onChange: () => {},
  disabled: false,
  delay: 0,
  minLetter: 0,
  className: "w-full px-4 py-2 border rounded-md",
};

export default DebounceTextInput;
