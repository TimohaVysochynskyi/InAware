import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.css";

import logo from "@/assets/svg/logo.svg";

export const Header = () => {
  return (
    <>
      <header className={css.headerWrapper}>
        <div className={css.header}>
          <Link to="/" className={css.logoLink}>
            <img src={logo} alt="Logo" className={css.logo} />
          </Link>
          <div className={css.line} />
          <nav className={css.nav}>
            <ul className={css.navList}>
              <li className={css.navItem}>
                <NavLink
                  to="/lab"
                  className={`${css.navLink} ${css.navLinkActive}`}
                >
                  Лабораторія
                  <svg viewBox="0 0 6 15" fill="none" className={css.arrow}>
                    <path
                      d="M6.67628e-07 3.88889L2.83638 7.5L-6.67628e-07 11.1111L0 15L6 7.5L0 -9.53674e-07L6.67628e-07 3.88889Z"
                      fill="#F5F5F5"
                    />
                  </svg>
                </NavLink>
              </li>
              <li className={css.navItem}>
                <NavLink to="#contacts" className={css.navLink}>
                  Контакти
                </NavLink>
              </li>
              <li className={css.navItem}>
                <NavLink to="#how-it-works" className={css.navLink}>
                  Як це працює
                </NavLink>
              </li>
            </ul>
            <Link to="/auth" className={css.authButton}>
              Увійти
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
