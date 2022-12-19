import React from 'react';

import CalendarIcon from '../Icons/CalendarIcon';

/**
 *
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} props
 */
export function InputDate(props) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <CalendarIcon />
      </div>
      <input
        type="date"
        className="input input-primary rounded-[4px] border-[#cccccc] border text-gray-900 text-sm w-full pl-10 p-2.5 appearance-none inline-flex items-center cursor-pointer"
        {...props}
      />
    </div>
  );
}

export default InputDate;
