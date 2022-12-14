import React from "react";
import AsyncSelect from "react-select/async";

import useAirportList from "../../hooks/useAirportList";
import { defaultOptionsAirportData } from "../../utils/airports";

function AirportSelect({ value, onChange, placeholder }) {
  const promiseOptions = useAirportList();

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={defaultOptionsAirportData}
      loadOptions={promiseOptions}
      value={value}
      onChange={(choice) => onChange(choice)}
      placeholder={placeholder}
      required
      noOptionsMessage={() => "Airport not found"}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          height: "48px",
          cursor: "pointer",
          outline: state.isFocused ? "2px solid #512bd4" : null,
          outlineOffset: state.isFocused ? "2px" : null,
          boxShadow: "none",
          border: "1px solid #cccccc",
          "&:hover": {
            border: state.isFocused ? "1px solid #cccccc" : "1px solid #cccccc",
          },
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          cursor: "pointer",
        }),
      }}
    />
  );
}

export default AirportSelect;
