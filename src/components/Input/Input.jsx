import React from 'react';

/**
 *
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} rest
 * @param {string} className
 * @param {string} variant
 * @returns
 */
export function Input({ className, variant, ...rest }) {
  const generateVariant = (type) => {
    switch (type) {
      case 'primary':
        return 'input-primary';
      case 'ghost':
        return 'input-ghost';
      case 'bordered':
        return 'input-bordered';
      case 'secondary':
        return 'input-secondary';
      default:
        return '';
    }
  };

  return <input className={`input ${generateVariant(variant)} ${className}`} {...rest} />;
}
