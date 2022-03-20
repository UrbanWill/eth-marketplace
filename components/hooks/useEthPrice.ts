import useSWR from "swr";

// eslint-disable-next-line operator-linebreak
const URL =
  "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

export const COURSE_PRICE = 15;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();
  return json.market_data.current_price.usd ?? null;
};
const useEthPrice = () => {
  const { data, ...rest } = useSWR(URL, fetcher, { refreshInterval: 10000 });

  const perItem = (data && (COURSE_PRICE / Number(data)).toFixed(6)) ?? 0;
  return { eth: { data: Number(data || 0), perItem, ...rest } };
};

export default useEthPrice;
