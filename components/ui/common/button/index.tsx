import { FC } from "react";

type Variants = "purple" | "red" | "lightPurple";

interface Props {
  text: string;
  className?: string;
  disabled?: boolean;
  onHandleClick?: () => void;
  isHoverable?: boolean;
  variant?: Variants;
}

const Button: FC<Props> = ({
  text,
  className,
  disabled,
  onHandleClick,
  isHoverable,
  variant = "purple",
}) => {
  const variants = {
    purple: `text-white bg-indigo-600 ${isHoverable && "hover:bg-indigo-700"}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      isHoverable && "hover:bg-indigo-200"
    }`,
    red: `text-white bg-red-600 ${isHoverable && "hover:bg-red-700"}`,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium ${className} ${variants[variant]}`}
      onClick={onHandleClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  onHandleClick: () => {},
  disabled: false,
  isHoverable: true,
  variant: "purple",
};
export default Button;
