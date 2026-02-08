import css from "./Header.module.css";

import logo from "@/assets/svg/logo.svg";

export const Header = () => {
  return (
    <>
      <header className={css.header}>
        fddf <img src={logo} alt="Logo" className={css.logo} />
      </header>
    </>
  );
};

export default Header;
