import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type AppType } from 'next/dist/shared/lib/utils';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
