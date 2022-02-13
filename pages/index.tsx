import type { NextPage } from "next";
import { Footer, Navbar, Hero, Breadcrumbs } from "components/common";
import { EthRates, WalletBar } from "components/web3";
import { CourseList } from "components/course";
import { Card } from "components/order";

const Home: NextPage = () => (
  <div>
    <div className="relative bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4">
        <Navbar />
        <div className="fit">
          <Hero />
          <Breadcrumbs />
          <WalletBar />
          <EthRates />
          <Card />
          <CourseList />
        </div>
      </div>
      <Footer />
    </div>
  </div>
);

export default Home;
