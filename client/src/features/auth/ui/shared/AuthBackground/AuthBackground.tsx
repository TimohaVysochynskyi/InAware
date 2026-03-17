import bgVideo from "@/assets/videos/hero-bg.mp4";
import css from "./AuthBackground.module.css";

const AuthBackground = () => {
  return (
    <div className={css.wrapper}>
      <video
        className={css.video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default AuthBackground;
