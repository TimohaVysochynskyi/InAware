import type { ButtonHTMLAttributes, ReactNode } from "react";
import css from "./FormControls.module.css";

type AuthSubmitButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  children: ReactNode;
};

const AuthSubmitButton = ({
  children,
  className,
  disabled,
  ...rest
}: AuthSubmitButtonProps) => {
  const buttonClassName = [
    css.submitButton,
    !disabled ? css.submitButtonActive : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="submit"
      className={buttonClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
      <svg viewBox="0 0 6 15" fill="none" className={css.arrow}>
        <path d="M6.67628e-07 3.88889L2.83638 7.5L-6.67628e-07 11.1111L0 15L6 7.5L0 -9.53674e-07L6.67628e-07 3.88889Z" />
      </svg>
    </button>
  );
};

export default AuthSubmitButton;
