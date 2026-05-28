import Script from "next/script";

/**
 * Google Analytics 4 (gtag). ID-en leses fra NEXT_PUBLIC_GA_ID, og
 * komponenten rendrer ingenting hvis variabelen mangler. Det gjør den
 * trygg å la stå i layout uten å aktivere sporing før ID-en er satt.
 *
 * TODO: Hvis vi senere innfører samtykke (cookie-banner), bør disse
 * scriptene gates bak et "analytics"-samtykke før de lastes.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
