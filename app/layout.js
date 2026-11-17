'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '/styles/general.css'
import { defineCustomElements, applyPolyfills } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import { useLayoutEffect } from 'react'


const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // Next's static export needs inline bootstrap scripts; script-src-attr
  // still blocks inline event handlers such as <img onerror=...>.
  "script-src 'self' 'unsafe-inline'",
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "media-src 'self' data:",
  "connect-src 'self' https://opensearch.eco.tsi-dev.otc-service.com https://mail-gateway.otc-service.com https://cap.eco.tsi-dev.otc-service.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");


export default function RootLayout({ children }) {
  useLayoutEffect(() => {
    // crap which needs to be added to use scale framework
    applyPolyfills().then(() => {
      defineCustomElements(window)
    })
  }, [])
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CONTENT_SECURITY_POLICY} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
