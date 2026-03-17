import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import css from "./Header.module.css";
import { hasTransparentHeaderAtTop } from "./model/headerAppearance";

import logo from "@/assets/svg/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pendingSectionId, setPendingSectionId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isTransparentHeaderAtTop = hasTransparentHeaderAtTop(pathname);

  const shouldShowHeaderBackground =
    !isTransparentHeaderAtTop || isScrolled || isMenuOpen;

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const headerElement = document.querySelector(`.${css.headerWrapper}`);
    const headerHeight = headerElement?.getBoundingClientRect().height ?? 0;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(sectionTop - headerHeight - 12, 0),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  useEffect(() => {
    if (pathname !== "/" || !pendingSectionId) {
      return;
    }

    window.requestAnimationFrame(() => {
      scrollToSection(pendingSectionId);
      setPendingSectionId(null);
    });
  }, [pathname, pendingSectionId]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSectionClick = (sectionId: string) => {
    closeMenu();

    if (pathname !== "/") {
      setPendingSectionId(sectionId);
      navigate("/");
      return;
    }

    scrollToSection(sectionId);
  };

  return (
    <>
      <header
        className={`${css.headerWrapper} ${
          shouldShowHeaderBackground ? css.headerWrapperScrolled : ""
        }`}
      >
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
                <button
                  type="button"
                  className={`${css.navLink} ${css.navButton}`}
                  onClick={() => handleSectionClick("contacts")}
                >
                  Контакти
                </button>
              </li>
              <li className={css.navItem}>
                <button
                  type="button"
                  className={`${css.navLink} ${css.navButton}`}
                  onClick={() => handleSectionClick("how-it-works")}
                >
                  Як це працює
                </button>
              </li>
            </ul>
            <Link to="/auth/login" className={css.authButton}>
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

      <div
        className={`${css.mobileMenuOverlay} ${
          isMenuOpen ? css.mobileMenuOverlayOpen : ""
        }`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      >
        <div
          id="mobile-menu"
          className={`${css.mobileMenu} ${isMenuOpen ? css.mobileMenuOpen : ""}`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className={css.closeButton}
            aria-label="Закрити меню"
            onClick={closeMenu}
          >
            <svg viewBox="0 0 6 15" fill="none" className={css.closeIcon}>
              <path
                d="M6.67628e-07 3.88889L2.83638 7.5L-6.67628e-07 11.1111L0 15L6 7.5L0 -9.53674e-07L6.67628e-07 3.88889Z"
                fill="#F5F5F5"
              />
            </svg>
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
                </NavLink>
              </li>
              <li className={css.mobileNavItem}>
                <button
                  type="button"
                  className={`${css.navLink} ${css.navButton}`}
                  onClick={() => handleSectionClick("contacts")}
                >
                  Контакти
                </button>
              </li>
              <li className={css.mobileNavItem}>
                <button
                  type="button"
                  className={`${css.navLink} ${css.navButton}`}
                  onClick={() => handleSectionClick("how-it-works")}
                >
                  Як це працює
                </button>
              </li>
            </ul>

            <Link
              to="/auth/login"
              className={css.authButton}
              onClick={closeMenu}
            >
              Увійти
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
