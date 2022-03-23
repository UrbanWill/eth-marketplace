import { FC } from "react";

import useEthPrice, { COURSE_PRICE } from "components/hooks/useEthPrice";
import { Loader } from "components/ui/common";

import Image from "next/image";

const EthRates: FC = () => {
  const { eth } = useEthPrice();

  const { data: ethPrice, perItem } = eth;

  return (
    <div className="flex flex-col xs:flex-row text-center">
      <div className="p-6 mb-2 border drop-shadow rounded-md mr-2 w-full xs:w-fit xs:mb-0">
        <div className="flex items-center justify-center">
          {ethPrice ? (
            <>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/eth-icon.webp"
              />
              <span className="text-xl font-bold">{`= ${ethPrice}$`}</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Current eth Price</p>
      </div>
      <div className="p-6 mb-2 border drop-shadow rounded-md mr-2 w-full xs:w-fit xs:mb-0">
        <div className="flex items-center justify-center">
          {ethPrice ? (
            <>
              <span className="text-xl font-bold">{perItem}</span>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/eth-icon.webp"
              />
              <span className="text-xl font-bold">{`= ${COURSE_PRICE}$`}</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Price per course</p>
      </div>
    </div>
  );
};

export default EthRates;
