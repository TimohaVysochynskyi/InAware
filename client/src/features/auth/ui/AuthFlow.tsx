import { Link, NavLink } from "react-router-dom";
import { AUTH_MODES, type AuthMode } from "../model/auth-mode";
import { useAuthRoute } from "../hooks/use-auth-route";

import AuthBackground from "./shared/AuthBackground";
import { LoginForm } from "./AuthForm";
import { RegisterForm } from "./AuthForm";

import googleIcon from "@/assets/svg/google.svg";
import css from "./AuthFlow.module.css";

type AuthFlowProps = {
  mode: AuthMode;
};

const AuthFlow = ({ mode }: AuthFlowProps) => {
  const { isLoginRoute, nextMode } = useAuthRoute();
  const isRegisterMode = mode === AUTH_MODES.REGISTER;

  const linkClassName = (isActive: boolean) =>
    isActive ? `${css.navLink} ${css.navLinkActive}` : css.navLink;

  return (
    <div className={css.container}>
      <AuthBackground />
      <section aria-label="Authentication" className={css.base}>
        <div className={css.innerBase}>
          <nav aria-label="Auth mode switcher" className={css.header}>
            <NavLink
              to="/auth/register"
              className={({ isActive }) => linkClassName(isActive)}
            >
              Реєстрація
            </NavLink>
            <NavLink
              to="/auth/login"
              className={({ isActive }) => linkClassName(isActive)}
            >
              Увійти
            </NavLink>
          </nav>
          <button type="button" className={css.googleButton}>
            <img
              src={googleIcon}
              alt="Google icon"
              className={css.googleIcon}
            />
            Увійти через Google
          </button>
          <div className={css.divider} />

          <div className={css.formWrapper}>
            {isRegisterMode ? <RegisterForm /> : <LoginForm />}
          </div>

          <div className={css.footer}>
            {isLoginRoute ? (
              <>
                <Link to={`/auth/${nextMode}`} className={css.loginLink}>
                  Реєстрація
                </Link>
                <Link to="/auth/forgot-password" className={css.loginLink}>
                  Забули пароль?
                </Link>
              </>
            ) : (
              <>
                <span>Вже є акаунт?</span>
                <Link to={`/auth/${nextMode}`} className={css.registerLink}>
                  Увійти
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthFlow;
