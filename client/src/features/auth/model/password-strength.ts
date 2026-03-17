export type PasswordStrengthLevel = "weak" | "medium" | "strong";

export type PasswordStrengthResult = {
  score: number;
  level: PasswordStrengthLevel;
  label: string;
};

export const getPasswordStrength = (
  password: string
): PasswordStrengthResult | null => {
  if (!password) {
    return null;
  }

  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }
  if (password.length >= 12) {
    score += 1;
  }
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 1;
  }
  if (/[0-9]/.test(password)) {
    score += 1;
  }
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  if (score <= 2) {
    return {
      score,
      level: "weak",
      label: "Рівень складності: слабкий",
    };
  }

  if (score <= 4) {
    return {
      score,
      level: "medium",
      label: "Рівень складності: середній",
    };
  }

  return {
    score,
    level: "strong",
    label: "Рівень складності: високий",
  };
};
