import type { InputHTMLAttributes, ReactNode } from "react";
import css from "./FormControls.module.css";

type AuthInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  endAdornment?: ReactNode;
  errorText?: string;
  helperText?: string;
  helperClassName?: string;
};

const AuthInput = ({
  id,
  className,
  endAdornment,
  errorText,
  helperText,
  helperClassName,
  ...rest
}: AuthInputProps) => {
  const inputClassName = [css.fieldInput, className].filter(Boolean).join(" ");
  const shouldShowMessage = Boolean(errorText || helperText);

  return (
    <div className={css.formField}>
      <div
        className={`${css.inputWrapper} ${errorText ? css.inputWrapperInvalid : ""}`}
      >
        <input id={id} className={inputClassName} {...rest} />
        {endAdornment ? (
          <div className={css.endAdornment}>{endAdornment}</div>
        ) : null}
      </div>

      {shouldShowMessage ? (
        <p
          className={`${css.fieldMessage} ${errorText ? css.fieldError : ""} ${helperClassName ?? ""}`}
        >
          {errorText ?? helperText}
        </p>
      ) : null}
    </div>
  );
};

export default AuthInput;
