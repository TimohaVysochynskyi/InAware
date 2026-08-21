import css from "./LaboratoryInfoSection.module.css";

const LaboratoryInfoSection = () => {
  return (
    <>
      <div className={css.container}>
        <div className={css.dropdown}>
          <div className={css.dropdownHead}>
            <span className={css.dropdownTitle}>Гілки сценаріїв</span>
            <div className={css.dropdownButton}>
              <svg
                viewBox="0 0 15 6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.1111 6.67628e-07L7.5 2.83638L3.88889 -6.67628e-07L0 0L7.5 6L15 0L11.1111 6.67628e-07Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={css.dropdown}>
          <div className={css.dropdownHead}>
            <span className={css.dropdownTitle}>Твій прогрес</span>
            <div className={css.dropdownButton}>
              <svg
                viewBox="0 0 15 6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.1111 6.67628e-07L7.5 2.83638L3.88889 -6.67628e-07L0 0L7.5 6L15 0L11.1111 6.67628e-07Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaboratoryInfoSection;
