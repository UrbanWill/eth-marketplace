/* eslint-disable react/no-array-index-key */
import { FC } from "react";

type Variant = "sm" | "md" | "lg";

interface Props {
  size?: Variant;
}

const SIZES = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const Loader: FC<Props> = ({ size = "md" }) => (
  <div className={`sk-fading-circle ${SIZES[size]}`}>
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={`dot-${i}`} className={`sk-circle${i + 1} sk-circle`} />
    ))}
  </div>
);

Loader.defaultProps = {
  size: "md",
};
export default Loader;
