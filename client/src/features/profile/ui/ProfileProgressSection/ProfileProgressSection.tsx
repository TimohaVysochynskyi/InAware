import { useState } from "react";

import type {
  ProfileActivityPoint,
  ProfilePeriod,
} from "../../model/profile.types";
import ProfileActivityChart from "../ProfileActivityChart";
import css from "./ProfileProgressSection.module.css";

type ProfileProgressSectionProps = {
  activity: ProfileActivityPoint[];
  period: ProfilePeriod;
  onPeriodChange: (period: ProfilePeriod) => void;
};

const ProfileProgressSection = ({
  activity,
  period: _period,
  onPeriodChange: _onPeriodChange,
}: ProfileProgressSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={css.section} aria-label="Прогрес">
      <header className={css.titleRow}>
        <div className={css.titleLine} />
        <h2 className={css.title}>Прогрес:</h2>
      </header>

      <article className={css.chartCard}>
        <div
          className={css.chartHeaderRow}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-controls="profile-progress-panel"
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setIsOpen((prev) => !prev);
            }
          }}
        >
          <p className={css.chartTitle}>Графік активності</p>
          <button
            type="button"
            className={css.chartButton}
            tabIndex={-1}
            aria-expanded={isOpen}
            aria-controls="profile-progress-panel"
          >
            <svg
              viewBox="0 0 6 15"
              fill="none"
              className={`${css.arrow} ${isOpen ? css.arrowOpen : ""}`}
            >
              <path d="M6.67628e-07 3.88889L2.83638 7.5L-6.67628e-07 11.1111L0 15L6 7.5L0 -9.53674e-07L6.67628e-07 3.88889Z" />
            </svg>
          </button>
        </div>

        <div
          id="profile-progress-panel"
          className={`${css.chartContentWrapper} ${isOpen ? css.chartContentOpen : ""}`}
          role="region"
          aria-label="Графік активності"
        >
          <ProfileActivityChart activity={activity} />
        </div>
      </article>
    </section>
  );
};

export default ProfileProgressSection;
