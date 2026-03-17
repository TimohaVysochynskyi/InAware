import { useFormik } from "formik";
import { Link } from "react-router-dom";
import {
  AuthCheckboxField,
  AuthInput,
  AuthPasswordInput,
  AuthSubmitButton,
} from "../FormControls";
import {
  registerFormInitialValues,
  registerValidationSchema,
  type RegisterFormValues,
} from "../../model/auth-validation";
import { getPasswordStrength } from "../../model/password-strength";

import css from "./AuthForm.module.css";

const RegisterForm = () => {
  const formik = useFormik<RegisterFormValues>({
    initialValues: registerFormInitialValues,
    validationSchema: registerValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async () => {
      // TODO: connect register API use-case
    },
  });

  const passwordStrength = getPasswordStrength(formik.values.password);

  const getFieldError = (fieldName: keyof RegisterFormValues) => {
    const hasInteraction = formik.touched[fieldName] || formik.submitCount > 0;
    if (!hasInteraction) {
      return undefined;
    }

    return formik.errors[fieldName];
  };

  const canSubmit = formik.dirty && formik.isValid && !formik.isSubmitting;

  return (
    <form
      autoComplete="off"
      className={css.form}
      onSubmit={formik.handleSubmit}
    >
      <AuthInput
        id="register-name"
        placeholder="Ім'я"
        name="name"
        type="text"
        autoComplete="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={getFieldError("name")}
      />

      <AuthInput
        id="register-email"
        placeholder="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={getFieldError("email")}
      />

      <AuthPasswordInput
        id="register-password"
        placeholder="Пароль"
        name="password"
        autoComplete="new-password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={getFieldError("password")}
        strengthText={passwordStrength?.label}
        strengthLevel={passwordStrength?.level}
      />

      <AuthPasswordInput
        id="register-password-confirm"
        placeholder="Повторіть пароль"
        name="passwordConfirm"
        autoComplete="new-password"
        value={formik.values.passwordConfirm}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={getFieldError("passwordConfirm")}
      />

      <AuthCheckboxField
        id="register-accepted-terms"
        name="acceptedTerms"
        checked={formik.values.acceptedTerms}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={getFieldError("acceptedTerms")}
        label={
          <>
            Я погоджуюсь з <Link to="/">Terms of Use</Link> та{" "}
            <Link to="/">Privacy Policy</Link>
          </>
        }
      />

      <AuthSubmitButton disabled={!canSubmit}>Створити акаунт</AuthSubmitButton>
    </form>
  );
};

export default RegisterForm;
