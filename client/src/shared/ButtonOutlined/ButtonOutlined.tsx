import { Link } from "react-router-dom";
import css from "./ButtonOutlined.module.css";

type Props = {
  children: React.ReactNode;
  type: "button" | "submit" | "link";
  onClick?: void;
  path?: string | null;
  className?: string;
};

const ButtonOutlined = ({
  children,
  type,
  onClick,
  path,
  className,
}: Props) => {
  return (
    <>
      {type == "link"
        ? path && (
            <Link to={path} className={`${css.button} ${className}`}>
              {children}
            </Link>
          )
        : onClick && (
            <button
              type={type}
              className={`${css.button} ${className}`}
              onClick={onClick}
            >
              {children}
            </button>
          )}
    </>
  );
};

export default ButtonOutlined;
