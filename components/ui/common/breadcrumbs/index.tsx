import { FC } from "react";

import ActiveLink from "../link";

interface ILink {
  href: string;
  label: string;
  requireAdmin?: boolean;
}

interface Props {
  items: ILink[];
  isAdmin: boolean;
}

const Breadcrumbs: FC<Props> = ({ items, isAdmin }) => (
  <nav
    aria-label="breadcrumb"
    className="flex flex-row-reverse p-4 sm:px-6 lg:px-8"
  >
    <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
      {items.map((item, i) => {
        const canDisplay = (item.requireAdmin && isAdmin) || !item.requireAdmin;
        return (
          canDisplay && (
            <li
              key={item.href}
              className={`${
                i === 0 ? "pr-4" : "px-4"
              } font-medium hover:text-gray-900`}
            >
              <ActiveLink href={item.href}>
                <a>{item.label}</a>
              </ActiveLink>
            </li>
          )
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
