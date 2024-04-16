// Provider Script and Google

import React from "react";

const ProviderScript = () => {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-4471GEE5EK"
      ></script>

      <script id="google-analytics">
        {`     
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-4471GEE5EK');
        gtag('send', 'pageview');
        `}
      </script>
    </>
  );
};

export default ProviderScript;
