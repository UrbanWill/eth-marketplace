import "../styles/globals.css";
import type { AppProps } from "next/app";
import BaseLayout from "components/ui/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </BaseLayout>
  );
}

export default MyApp;
