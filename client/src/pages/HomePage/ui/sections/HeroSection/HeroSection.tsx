import ButtonCTA from "@/shared/ButtonCTA";
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
            Навчись розпізнавати кіберзагрози на практиці: проходь реалістичні
            симуляції фішингу та інших атак, отримуй миттєвий фідбек і підвищуй
            свою цифрову обачність
          </p>
          <div className={css.buttonsWrapper}>
            <ButtonCTA type="link" filled path="/lab" className={css.button}>
              Розпочати
            </ButtonCTA>
            <ButtonCTA
              type="link"
              filled={false}
              path="#how-it-works"
              className={css.button}
            >
              Як це працює
            </ButtonCTA>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
