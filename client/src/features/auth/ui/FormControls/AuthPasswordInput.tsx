import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import AuthInput from "./AuthInput";
import css from "./FormControls.module.css";
import type { PasswordStrengthLevel } from "../../model/password-strength";

type AuthPasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  id: string;
  errorText?: string;
  strengthText?: string;
  strengthLevel?: PasswordStrengthLevel;
};

const AuthPasswordInput = ({
  id,
  errorText,
  strengthText,
  strengthLevel,
  ...rest
}: AuthPasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const strengthClassName =
    strengthLevel === "weak"
      ? css.passwordStrengthWeak
      : strengthLevel === "medium"
        ? css.passwordStrengthMedium
        : strengthLevel === "strong"
          ? css.passwordStrengthStrong
          : "";

  return (
    <AuthInput
      id={id}
      type={isVisible ? "text" : "password"}
      errorText={errorText}
      helperText={!errorText ? strengthText : undefined}
      helperClassName={!errorText ? strengthClassName : undefined}
      endAdornment={
        <button
          type="button"
          className={css.passwordToggleButton}
          onClick={() => setIsVisible((prev) => !prev)}
          aria-label={isVisible ? "Приховати пароль" : "Показати пароль"}
          aria-pressed={isVisible}
        >
          <svg
            className={css.passwordToggleIcon}
            viewBox="0 0 23 15"
            fill="none"
          >
            <path
              d="M11.3724 0.5C7.58366 0.5 3.6972 2.69285 0.637616 7.07854C0.550284 7.2051 0.502426 7.35471 0.50009 7.50846C0.497754 7.66221 0.541044 7.81321 0.624491 7.94236C2.97532 11.6222 6.80977 14.5 11.3724 14.5C15.8855 14.5 19.7987 11.6135 22.1539 7.92535C22.2354 7.79872 22.2787 7.65132 22.2787 7.50073C22.2787 7.35014 22.2354 7.20274 22.1539 7.07611C19.7933 3.43028 15.8514 0.5 11.3724 0.5Z"
              stroke="#F5F5F5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.1677 11.2778C13.3155 11.2778 15.0566 9.53666 15.0566 7.38889C15.0566 5.24111 13.3155 3.5 11.1677 3.5C9.01992 3.5 7.27881 5.24111 7.27881 7.38889C7.27881 9.53666 9.01992 11.2778 11.1677 11.2778Z"
              stroke="#F5F5F5"
              strokeMiterlimit="10"
            />
          </svg>
        </button>
      }
      {...rest}
    />
  );
};

export default AuthPasswordInput;
