import React from 'react';

/**
 *
 * @param {React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} props
 */
export function Button(props) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={`w-full font-semibold btn bg-brand hover:bg-brand-darker-800 ${className}`}
      type="button"
      {...rest}>
      {children}
    </button>
  );
}

export default Button;
