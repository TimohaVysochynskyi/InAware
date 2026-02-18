import css from "./HowSection.module.css";

const HowSection = () => {
  return (
    <>
      <section className={css.sectionWrapper}>
        <div className={css.section}>
          <h2 className={css.title}>Як це працює</h2>
          <div className={css.flow}>
            <div className={`${css.step} ${css.step1}`}>
              <div className={css.stepNumber}>1</div>
              <h3 className={css.stepTitle}>Обираєш симуляцію</h3>
            </div>
            <div className={`${css.step} ${css.step2}`}>
              <div className={css.stepNumber}>2</div>
              <h3 className={css.stepTitle}>Проходиш реалістичні сценарії</h3>
            </div>
            <div className={`${css.step} ${css.step3}`}>
              <div className={css.stepNumber}>3</div>
              <h3 className={css.stepTitle}>Отримуєш фідбек</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowSection;
