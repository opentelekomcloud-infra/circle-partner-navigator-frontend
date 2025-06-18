'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '/styles/general.css'
import { defineCustomElements, applyPolyfills } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import { useLayoutEffect } from 'react'
import UmamiTracker from '@/components/UmamiTracker';


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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script defer src="https://analytics.otc-service.com/script.js" data-website-id="08eb7b5c-f68d-40da-8969-34a51a3245c3"></script>
      </head>
      <body>
        <Header></Header>
        <UmamiTracker />
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
