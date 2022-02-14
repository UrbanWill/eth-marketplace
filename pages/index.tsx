import type { NextPage } from "next";
import { Hero, Breadcrumbs } from "components/common";
import { EthRates, WalletBar } from "components/web3";
import { CourseList } from "components/course";
import { Card } from "components/order";

const Home: NextPage = () => (
  <>
    <Hero />
    <Breadcrumbs />
    <WalletBar />
    <EthRates />
    <Card />
    <CourseList />
  </>
);

export default Home;
