import type { InputHTMLAttributes, ReactNode } from "react";
import css from "./FormControls.module.css";

type AuthCheckboxFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type"
> & {
  id: string;
  label: ReactNode;
  errorText?: string;
};

const AuthCheckboxField = ({
  id,
  label,
  errorText,
  className,
  ...rest
}: AuthCheckboxFieldProps) => {
  const inputClassName = [css.checkboxInput, className]
    .filter(Boolean)
    .join(" ");
  const checkboxFieldClassName = [
    css.checkboxField,
    rest.checked ? css.checkboxFieldChecked : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={css.formField}>
      <label htmlFor={id} className={checkboxFieldClassName}>
        <input id={id} type="checkbox" className={inputClassName} {...rest} />
        <span className={css.checkboxLabel}>{label}</span>
      </label>

      {errorText ? (
        <p className={`${css.fieldMessage} ${css.fieldError}`}>{errorText}</p>
      ) : null}
    </div>
  );
};

export default AuthCheckboxField;
