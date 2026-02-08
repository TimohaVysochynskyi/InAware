import { Link } from "react-router-dom";
import css from "./HeroSection.module.css";
import bgVideo from "@/assets/videos/hero-bg.mp4";

const HeroSection = () => {
  return (
    <>
      <div className={css.heroWrapper}>
        <div className={css.bg}>
          <video
            className={css.bgVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>
        <div className={css.hero}>
          <div className={css.titleWrapper}>
            <h1 className={css.title}>InAware</h1>
            <span className={css.titleLabel}>MVP Beta</span>
          </div>
          <p className={css.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <div className={css.buttonsWrapper}>
            <Link to="/lab" className={css.filledButton}>
              Розпочати
            </Link>
            <Link to="#how-it-works" className={css.outlinedButton}>
              Як це працює
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
