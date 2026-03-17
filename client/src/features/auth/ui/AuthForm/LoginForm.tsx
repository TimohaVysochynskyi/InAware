import { useFormik } from "formik";
import {
  AuthInput,
  AuthPasswordInput,
  AuthSubmitButton,
} from "../FormControls";
import {
  loginFormInitialValues,
  loginValidationSchema,
  type LoginFormValues,
} from "../../model/auth-validation";

import css from "./AuthForm.module.css";

const LoginForm = () => {
  const formik = useFormik<LoginFormValues>({
    initialValues: loginFormInitialValues,
    validationSchema: loginValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async () => {
      // TODO: connect login API use-case
    },
  });

  const getFieldError = (fieldName: keyof LoginFormValues) => {
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
        id="login-email"
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
        id="login-password"
        placeholder="Пароль"
        name="password"
        autoComplete="current-password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={getFieldError("password")}
      />

      <AuthSubmitButton disabled={!canSubmit}>Надіслати</AuthSubmitButton>
    </form>
  );
};

export default LoginForm;
