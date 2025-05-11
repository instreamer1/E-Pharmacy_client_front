import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import css from './InputField.module.css';

const InputField = forwardRef(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      error,
      icon, // если нужна произвольная иконка
      iconAction, // действие при клике на иконку
      register, // объект регистрации из react-hook-form
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    const handleTogglePassword = () => setShowPassword(prev => !prev);
    const inputClassName = `${css.input} ${error ? css.errorInput : ''}`;
    const wrapperClassName = `${css.inputWrapper} ${
      error ? css.errorMargin : ''
    }`;

    return (
      <>
      <div className={css.wrapperClassName}>
        {label && (
          <label htmlFor={name} className={css.label}>
            {label}
          </label>
        )}

 
         <div className={wrapperClassName}>
          <input
            id={name}
            name={name}
            ref={register ? register.ref : ref}
            type={inputType}
            placeholder={placeholder}
            className={inputClassName}
            autoComplete={name}
            {...(register ? register : {})}
            {...rest}
          />

          {isPasswordType && (
            <button
              type='button'
              className={css.iconButton}
              onClick={handleTogglePassword}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          )}

          {!isPasswordType && icon && (
            <button
              type='button'
              onClick={iconAction}
              className={css.iconButton}>
              {icon}
            </button>
          )}
        </div>

        {error && (
          <p className={css.errorMessage}>
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
      </div>
      </>
    );
  }
);

export default InputField;
