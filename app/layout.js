'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '/styles/general.css'
import { defineCustomElements, applyPolyfills } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import { useLayoutEffect } from 'react'

const headerLinks = [
  {
    label: 'Partner Navigator',
    url: '/'
  },
  {
    label: 'Partner programs',
    url: '/partner_programs'
  },
]

export default function RootLayout({ children }) {
  useLayoutEffect(() => {
    // crap which needs to be added to use scale framework
    applyPolyfills().then(() => {
      defineCustomElements(window)
    })
  }, [])
  return (
    <html lang="en">
      <body>
        <Header props={headerLinks}></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
