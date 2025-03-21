import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
      <Html lang={locale} dir={dir}>
        <Head>
          {/* Favicon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          
          {/* Alternate language versions */}
          <link rel="alternate" hrefLang="en-GB" href="https://aetherzenith.tech/en-GB" />
          <link rel="alternate" hrefLang="en-US" href="https://aetherzenith.tech/en-US" />
          <link rel="alternate" hrefLang="en-ZA" href="https://aetherzenith.tech/en-ZA" />
          <link rel="alternate" hrefLang="es-ES" href="https://aetherzenith.tech/es-ES" />
          <link rel="alternate" hrefLang="x-default" href="https://aetherzenith.tech" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 