import React, { FC, ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  href: string;
  activeLinkClassName?: string;
  className?: string;
  children: ReactElement;
}

const ActiveLink: FC<Props> = ({
  children,
  activeLinkClassName,
  href,
  className,
}) => {
  const { pathname } = useRouter();

  const linkClass = `${className} ${
    pathname === href ? activeLinkClassName : "text-gray-500"
  }`;

  return (
    <Link href={href}>
      {React.cloneElement(children, {
        className: linkClass,
      })}
    </Link>
  );
};

ActiveLink.defaultProps = {
  activeLinkClassName: "text-indigo-600",
  className: "",
};
export default ActiveLink;
