'use client';

import Link from 'next/link'
import React from 'react';
import styles from '/styles/Footer.module.css';
import { usePathname } from 'next/navigation'


function Footer() {
    const pathname = usePathname();
    var locale = pathname.split('/')[1];
    if (locale !== 'de' && locale !== 'en') {
        locale = 'en';
    }
    const data = {
        'de': {
            'commission': 'Auftragsverarbeitung',
            'commission_link': 'https://public.t-cloud.com/_Resources/Persistent/c/0/b/0/c0b05935e49baeefdb54b5b52ad09dcf1dfd6069/OTC%20ErgB-AV%20TDG_DE.pdf',
            'liability': 'Haftungsausschluss',
            'liability_link': 'https://public.t-cloud.com/de/haftungsausschluss',
            'privacy': 'Datenschutz',
            'privacy_link': 'https://public.t-cloud.com/de/datenschutz',
            'imprint': 'Impressum',
            'imprint_link': 'https://public.t-cloud.com/de/impressum',
        },
        'en': {
            'commission': 'Commissioned Processing',
            'commission_link': 'https://public.t-cloud.com/_Resources/Persistent/f/4/2/9/f429848a5f82127bebfedccc6fecb533e235278a/OTC%20CDPA%20TSI_EN.pdf',
            'liability': 'Disclaimer of Liability',
            'liability_link': 'https://public.t-cloud.com/en/disclaimer-of-liability',
            'privacy': 'Data Privacy',
            'privacy_link': 'https://public.t-cloud.com/en/data-protection',
            'imprint': 'Imprint',
            'imprint_link': 'https://public.t-cloud.com/en/imprint',
        }
    }

    return (        
        <scale-telekom-footer slot="footer">
            <scale-telekom-footer-content>
                <span slot="notice">© {new Date().getFullYear()} T-Systems International GmbH</span>
                <ul slot="navigation">
                    <li>
                        <Link href={`${data[locale].commission_link}`}>{`${data[locale].commission}`}</Link>
                    </li>
                    <li>
                    <Link href={`${data[locale].liability_link}`}>{`${data[locale].liability}`}</Link>
                    </li>
                    <li>
                    <Link href={`${data[locale].privacy_link}`}>{`${data[locale].privacy}`}</Link>
                    </li>
                    <li>
                    <Link href={`${data[locale].imprint_link}`}>{`${data[locale].imprint}`}</Link>
                    </li>
                </ul>
            </scale-telekom-footer-content>
        </scale-telekom-footer>
    )
}

export default Footer;