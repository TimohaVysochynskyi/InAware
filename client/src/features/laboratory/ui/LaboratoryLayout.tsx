import LaboratoryTopBar from "./LaboratoryTopBar";
import LaboratoryInfoSection from "./LaboratoryInfoSection/LaboratoryInfoSection";
import LaboratorySidebar from "./LaboratorySidebar";

import css from "./LaboratoryLayout.module.css";

const LaboratoryLayout = () => {
  return (
    <>
      <section className={css.page}>
        <div className={css.head}>
          <LaboratoryTopBar />
          <LaboratoryInfoSection />
        </div>
        <aside className={css.sidebar}>
          <LaboratorySidebar />
        </aside>
        <div className={css.map}></div>
      </section>
    </>
  );
};

export default LaboratoryLayout;
