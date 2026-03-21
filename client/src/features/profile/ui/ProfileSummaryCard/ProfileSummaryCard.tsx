import type { ProfileUser } from "../../model/profile.types";
import css from "./ProfileSummaryCard.module.css";

type ProfileSummaryCardProps = {
  user: ProfileUser;
};

const ProfileSummaryCard = ({ user }: ProfileSummaryCardProps) => {
  return (
    <article className={css.card}>
      <div className={css.avatarPanel}>
        <button type="button" className={css.avatarEditCorner} aria-label="Змінити аватар">
          <span className={css.avatarEditCornerIcon}>✎</span>
        </button>

        <div className={css.avatarBody}>
          <div className={css.avatarIconWrap}>
            <svg viewBox="0 0 64 64" fill="none" className={css.avatarIcon}>
              <circle cx="32" cy="20" r="9" stroke="currentColor" strokeWidth="2" />
              <rect x="16" y="34" width="32" height="18" rx="9" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <button type="button" className={css.avatarEditBottom} aria-label="Редагувати профіль">
          <span className={css.avatarEditBottomIcon}>✎</span>
        </button>
      </div>

      <div className={css.infoRowPrimary}>
        <p className={css.name}>{user.name}</p>
        <button type="button" className={css.inlineEditButton} aria-label="Редагувати ім'я">
          ✓
        </button>
      </div>

      <div className={css.infoRowSecondary}>
        <p className={css.email}>{user.email}</p>
        <button type="button" className={css.inlineEditButton} aria-label="Редагувати email">
          ✎
        </button>
      </div>
    </article>
  );
};

export default ProfileSummaryCard;
