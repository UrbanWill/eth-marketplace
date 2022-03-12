import Link from "next/link";
import { useWeb3 } from "components/providers";
import { IWeb3Context } from "utils/types";

import { FC } from "react";

const Navbar: FC = () => {
  const { connect, isWeb3Loaded } = useWeb3() as IWeb3Context;

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              {isWeb3Loaded ? (
                <button
                  type="button"
                  onClick={connect}
                  className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Connect
                </button>
              ) : (
                <button
                  type="button"
                  onClick={connect}
                  className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Install Metamask
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
