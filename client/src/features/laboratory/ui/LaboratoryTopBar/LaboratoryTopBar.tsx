import { Link } from "react-router-dom";
import css from "./LaboratoryTopBar.module.css";

const LaboratoryTopBar = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.backLabel}>
          <Link to="/" className={css.backButton}>
            <svg
              viewBox="0 0 6 15"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 11.1111L3.16362 7.5L6 3.88889L6 0L-3.27835e-07 7.5L6 15L6 11.1111Z" />
            </svg>
          </Link>
          На головну
        </div>

        <h1 className={css.title}>Лабораторія</h1>
      </header>
    </>
  );
};

export default LaboratoryTopBar;
