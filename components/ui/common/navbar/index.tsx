import Link from "next/link";
import { useWeb3 } from "components/providers";
import { IWeb3Context } from "utils/types";
import { FC } from "react";
import { useAccount } from "components/hooks/web3";
import { useRouter } from "next/router";
import Button from "../button";

const Navbar: FC = () => {
  const { connect, requireInstall, isLoading } = useWeb3() as IWeb3Context;
  const { account } = useAccount();
  const { pathname } = useRouter();

  const getWeb3Button = () => {
    if (account.data) {
      return (
        <Button
          text={`Hi there ${account.isAdmin ? "Admin" : ""}`}
          isHoverable={false}
          className="cursor-default"
        />
      );
    }
    return (
      <Button
        onHandleClick={connect}
        disabled={isLoading}
        text={isLoading ? "Loading..." : "Connect"}
      />
    );
  };

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/marketplace">
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
              {requireInstall ? (
                <Button
                  onHandleClick={() => {
                    window.open("https://metamask.io/download.html", "_blank");
                  }}
                  text="Install Metamask"
                />
              ) : (
                getWeb3Button()
              )}
            </div>
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account.data}
          </div>
        </div>
      )}
    </section>
  );
};

export default Navbar;
