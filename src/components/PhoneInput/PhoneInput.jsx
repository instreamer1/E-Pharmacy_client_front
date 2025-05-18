import { forwardRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import css from './PhoneInput.module.css';

const PhoneInput = forwardRef(
  (
    {
      label,
      name,
      placeholder = '+3 (___) ___-__-__',
      error,
      value,
      onChange,
      onBlur,
      register,
      inputWrapper = '',
      ...rest
    },
    ref
  ) => {
    const [showMask, setShowMask] = useState(false);
    const inputClassName = `${css.input} ${error ? css.errorInput : ''}`;
    const wrapperClassName = `${inputWrapper} ${error ? css.errorMargin : ''}`;

    // Получаем свойства из register, если передан
    const registerProps = register ?? {};
    const inputRef = registerProps.ref ?? ref;

    return (
      <div className={css.wrapper}>
        {label && (
          <label htmlFor={name} className={css.label}>
            {label}
          </label>
        )}

        <div className={wrapperClassName}>
          <IMaskInput
            id={name}
            mask='+38 (000) 000-00-00'
            definitions={{ 0: /[0-9]/ }}
            inputRef={inputRef}
            value={value}
            placeholder={showMask ? '' : placeholder}
            className={inputClassName}
            lazy={!showMask}
            onFocus={() => setShowMask(true)}
            onBlur={e => {
              if (!e.target.value) {
                setShowMask(false);
              }

              registerProps.onBlur?.(e);
              onBlur?.(e);
            }}
            onAccept={val => {
              // Для register — симулируем event.target.value
              if (registerProps.onChange) {
                registerProps.onChange({
                  target: {
                    name,
                    value: val,
                  },
                });
              }

              // Для Controller — просто передаём значение
              onChange?.(val);
            }}
            {...rest}
          />
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

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
