function RadioButton({ label, value, onChange, id, name }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="radio"
        id={id}
        name={name}
        checked={value}
        onChange={onChange}
        className="radio radio-primary checked:bg-brand border-brand-hover checked:border-brand-hover"
      />
      <label className="font-semibold cursor-pointer" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
