import { FC } from "react";

interface Props {
  text: string;
  className?: string;
  disabled?: boolean;
  onHandleClick?: () => void;
}

const Button: FC<Props> = ({ text, className, disabled, onHandleClick }) => (
  <button
    type="button"
    disabled={disabled}
    className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium ${className}`}
    onClick={onHandleClick}
  >
    {text}
  </button>
);

Button.defaultProps = {
  className: "text-white bg-indigo-600 hover:bg-indigo-700",
  onHandleClick: () => {},
  disabled: false,
};
export default Button;
