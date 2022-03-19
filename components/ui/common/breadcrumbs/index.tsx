import { FC } from "react";

import Link from "next/link";

interface ILink {
  href: string;
  label: string;
}

interface Props {
  items: ILink[];
}

const Breadcrumbs: FC<Props> = ({ items }) => (
  <nav
    aria-label="breadcrumb"
    className="flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8"
  >
    <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
      {items.map((item, i) => (
        <li
          key={item.href}
          className={`${
            i === 0 ? "pr-4" : "px-4"
          } font-medium text-gray-500 hover:text-gray-900`}
        >
          <Link href={item.href}>
            <a>{item.label}</a>
          </Link>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
