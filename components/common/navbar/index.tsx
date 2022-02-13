import { FC } from "react";

const Navbar: FC = () => (
  <section>
    <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
      <nav className="relative" aria-label="Global">
        <div className="flex justify-between">
          <div>
            <a
              href="#Product"
              className="font-medium mr-8 text-gray-500 hover:text-gray-900"
            >
              Product
            </a>
            <a
              href="#Features"
              className="font-medium mr-8 text-gray-500 hover:text-gray-900"
            >
              Features
            </a>
            <a
              href="#Marketplace"
              className="font-medium mr-8 text-gray-500 hover:text-gray-900"
            >
              Marketplace
            </a>
          </div>
          <div>
            <a
              href="#Company"
              className="font-medium mr-8 text-gray-500 hover:text-gray-900"
            >
              Company
            </a>
            <a
              href="#Login"
              className="font-medium mr-8 text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </a>
          </div>
        </div>
      </nav>
    </div>
  </section>
);

export default Navbar;
