import Script from "next/script";
import React from "react";

const ProviderScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HRQPR23M9B"
      ></Script>

      <Script id="google-analytics">
        {`     
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HRQPR23M9B');
        gtag('send', 'pageview');
        `}
      </Script>
    </>
  );
};

export default ProviderScript;
