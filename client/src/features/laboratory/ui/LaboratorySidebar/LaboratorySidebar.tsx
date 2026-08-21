import ButtonFilled from "@/shared/ButtonFilled";
import css from "./LaboratorySidebar.module.css";
import previewImg from "@/assets/images/simulation-preview.webp";

const LaboratorySidebar = () => {
  return (
    <>
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.topSection}>
            <div className={css.head}>
              <div className={css.titleWrapper}>
                <h2 className={css.title}>Lorem lorem ipsum lorem ips</h2>
                <button type="button" className={css.closeButton}>
                  <svg
                    viewBox="0 0 6 15"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.67628e-07 3.88889L2.83638 7.5L-6.67628e-07 11.1111L0 15L6 7.5L0 -9.53674e-07L6.67628e-07 3.88889Z" />
                  </svg>
                </button>
              </div>
              <div className={css.headRow}>
                <div className={css.levelWrapper}>
                  <span className={css.level}>Рівень 1</span>
                  <span className={css.level}>•</span>
                  <span className={css.level}>Фішинг</span>
                </div>
                <div className={css.status}>Не пройдено</div>
              </div>
            </div>
            <p className={css.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={css.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className={css.bottomSection}>
            <img
              src={previewImg}
              alt="Preview of the simulation"
              className={css.previewImage}
            />
            <svg
              className={css.playButton}
              viewBox="0 0 38 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.999998 41.5686L1 1.73266L35.5 21.6506L0.999998 41.5686Z"
                stroke="url(#paint0_linear_546_2736)"
                stroke-width="2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_546_2736"
                  x1="11.4425"
                  y1="46.6506"
                  x2="11.5272"
                  y2="-3.35281"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0817308" stop-color="#7C8D94" />
                  <stop offset="0.264423" stop-color="#BCC1C7" />
                  <stop offset="0.442308" stop-color="#FDFEFE" />
                  <stop offset="0.533654" stop-color="#CAD7E0" />
                  <stop offset="0.764423" stop-color="#F8FAFB" />
                  <stop offset="0.980769" stop-color="#9FB2B9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <ButtonFilled
          type="button"
          onClick={console.log("clicked")}
          className={css.button}
        >
          Розпочати
        </ButtonFilled>
      </div>
    </>
  );
};

export default LaboratorySidebar;
