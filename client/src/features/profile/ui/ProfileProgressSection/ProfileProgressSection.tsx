import type { ProfileActivityPoint, ProfilePeriod } from "../../model/profile.types";
import css from "./ProfileProgressSection.module.css";

type ProfileProgressSectionProps = {
  activity: ProfileActivityPoint[];
  period: ProfilePeriod;
  onPeriodChange: (period: ProfilePeriod) => void;
};

const PERIOD_OPTIONS: Array<{ label: string; value: ProfilePeriod }> = [
  { label: "Місяць", value: "month" },
  { label: "Квартал", value: "quarter" },
  { label: "Рік", value: "year" },
];

const ProfileProgressSection = ({
  activity,
  period,
  onPeriodChange,
}: ProfileProgressSectionProps) => {
  return (
    <section className={css.section} aria-label="Прогрес">
      <header className={css.titleRow}>
        <div className={css.titleLine} />
        <h2 className={css.title}>Прогрес:</h2>
      </header>

      <article className={css.chartCard}>
        <div className={css.chartHeader}>
          <p className={css.chartTitle}>Графік активності</p>

          <label className={css.periodSelectLabel} htmlFor="profile-period-select">
            <span className={css.periodSelectLabelText}>Період</span>
            <select
              id="profile-period-select"
              className={css.periodSelect}
              value={period}
              onChange={(event) => onPeriodChange(event.target.value as ProfilePeriod)}
            >
              {PERIOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={css.chartBody}>
          <div className={css.chartGrid}>
            {activity.map((point) => (
              <div key={point.month} className={css.chartColumn}>
                <div className={css.chartPointWrap}>
                  <span className={css.chartPoint} style={{ bottom: `${point.value / 3}%` }} />
                </div>
                <span className={css.chartMonth}>{point.month}</span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProfileProgressSection;
