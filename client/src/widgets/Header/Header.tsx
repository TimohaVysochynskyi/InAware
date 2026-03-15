import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.css";

import logo from "@/assets/svg/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 758) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

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

          <button
            type="button"
            className={css.burgerButton}
            aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className={css.burgerLine} />
            <span className={css.burgerLine} />
            <span className={css.burgerLine} />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className={css.mobileMenuOverlay} onClick={closeMenu}>
          <div
            id="mobile-menu"
            className={css.mobileMenu}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={css.closeButton}
              aria-label="Закрити меню"
              onClick={closeMenu}
            >
              <span />
              <span />
            </button>

            <nav className={css.mobileNav}>
              <ul className={css.mobileNavList}>
                <li className={css.mobileNavItem}>
                  <NavLink
                    to="/lab"
                    className={`${css.navLink} ${css.navLinkActive}`}
                    onClick={closeMenu}
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
                <li className={css.mobileNavItem}>
                  <NavLink
                    to="#contacts"
                    className={css.navLink}
                    onClick={closeMenu}
                  >
                    Контакти
                  </NavLink>
                </li>
                <li className={css.mobileNavItem}>
                  <NavLink
                    to="#how-it-works"
                    className={css.navLink}
                    onClick={closeMenu}
                  >
                    Як це працює
                  </NavLink>
                </li>
              </ul>

              <Link to="/auth" className={css.authButton} onClick={closeMenu}>
                Увійти
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
