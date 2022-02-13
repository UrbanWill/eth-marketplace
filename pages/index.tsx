import type { NextPage } from "next";
import { Footer, Navbar } from "components/common";

const Home: NextPage = () => (
  <div>
    <div className="relative bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4">
        <Navbar />
      </div>
      <Footer />
    </div>
  </div>
);

export default Home;
