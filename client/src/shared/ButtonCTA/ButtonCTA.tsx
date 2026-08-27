import { Link } from "react-router-dom";
import css from "./ButtonCTA.module.css";

type Props = {
  children: React.ReactNode;
  type: "button" | "submit" | "link";
  filled: boolean;
  onClick?: () => void;
  path?: string | null;
  className?: string;
};

const ButtonCTA = ({
  children,
  type,
  filled,
  onClick,
  path,
  className,
}: Props) => {
  const variantClassName = filled ? css.filled : css.outlined;
  const buttonClassName = className
    ? `${css.button} ${variantClassName} ${className}`
    : `${css.button} ${variantClassName}`;

  if (type === "link") {
    return path ? (
      <Link to={path} className={buttonClassName}>
        {children}
      </Link>
    ) : null;
  }

  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonCTA;
