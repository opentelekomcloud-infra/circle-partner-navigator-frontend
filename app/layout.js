'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '/styles/general.css'
import { defineCustomElements, applyPolyfills } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import { useLayoutEffect } from 'react'


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
      </head>
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
