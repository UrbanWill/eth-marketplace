import type { NextPage } from "next";
import BaseLayout from "components/layout";
import { Hero, Breadcrumbs } from "components/common";
import { EthRates, WalletBar } from "components/web3";
import { CourseList } from "components/course";
import { Card } from "components/order";

const Home: NextPage = () => (
  <BaseLayout>
    <Hero />
    <Breadcrumbs />
    <WalletBar />
    <EthRates />
    <Card />
    <CourseList />
  </BaseLayout>
);

export default Home;
