import { forwardRef } from 'react';
import css from './SelectField.module.css';

const SelectField = forwardRef(
  (
    {
      label,
      name,
      options,
      placeholder,
      error,
      register,
      className,
      ...rest
    },
    ref
  ) => {
    const wrapperClassName = `${css.selectWrapper} ${
      error ? css.errorMargin : ''
    } ${className || ''}`;

    return (
      <div className={css.wrapper}>
        {label && (
          <label htmlFor={name} className={css.label}>
            {label}
          </label>
        )}

        <div className={wrapperClassName}>
          <select
            id={name}
            name={name}
            ref={ref}
            className={`${css.select} ${error ? css.errorInput : ''}`}
            {...(register ? register : {})}
            {...rest}
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className={css.errorMessage}>
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
      </div>
    );
  }
);

export default SelectField;