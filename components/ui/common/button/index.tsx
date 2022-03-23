import { FC } from "react";

type Variants = "purple" | "red" | "lightPurple" | "white";

type ButtonType = "button" | "submit";

interface Props {
  text: string;
  className?: string;
  disabled?: boolean;
  onHandleClick?: () => void;
  isHoverable?: boolean;
  variant?: Variants;
  type?: ButtonType;
}

const Button: FC<Props> = ({
  text,
  className,
  disabled,
  onHandleClick,
  isHoverable,
  variant = "purple",
  type = "button",
}) => {
  const variants = {
    purple: `text-white bg-indigo-600 ${isHoverable && "hover:bg-indigo-700"}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      isHoverable && "hover:bg-indigo-200"
    }`,
    red: `text-white bg-red-600 ${isHoverable && "hover:bg-red-700"}`,
    white: "text-black bg-white",
  };

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed xs:px-8 xs:py-3 p-2 border rounded-md text-base font-medium ${className} ${variants[variant]}`}
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
  type: "button",
};
export default Button;
