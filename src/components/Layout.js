import Footer from "./Footer";
import Header from "./Header";

import Script from 'next/script';

export default function Layout({ children }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-KHPR63BLD3"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KHPR63BLD3');
          `
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
