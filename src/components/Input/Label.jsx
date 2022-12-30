import React from 'react';

export function Label({ children }) {
  return (
    <label className="label">
      <span className="label-text">{children}</span>
    </label>
  );
}
