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
            'commission_link': 'https://www.open-telekom-cloud.com/_Resources/Persistent/4/e/e/8/4ee848dc4ead2a3992eeb85035677d55e1b53936/open-telekom-cloud-ergaenzende-bedingungen-auftragsverarbeitung.pdf',
            'liability': 'Haftungsausschluss',
            'liability_link': 'https://www.open-telekom-cloud.com/de/haftungsausschluss',
            'privacy': 'Datenschutz',
            'privacy_link': 'https://www.open-telekom-cloud.com/de/datenschutz',
            'imprint': 'Impressum',
            'imprint_link': 'https://www.open-telekom-cloud.com/de/impressum',
        },
        'en': {
            'commission': 'Commissioned Processing',
            'commission_link': 'https://www.open-telekom-cloud.com/_Resources/Persistent/1/d/5/f/1d5f960ae36cb3624ea1759fc5813d572f76e7cc/open-telekom-cloud-supplementary-conditions-commissioned-processing-personal-data.pdf',
            'liability': 'Disclaimer of Liability',
            'liability_link': 'https://www.open-telekom-cloud.com/en/disclaimer-of-liability',
            'privacy': 'Data Privacy',
            'privacy_link': 'https://www.open-telekom-cloud.com/en/data-protection',
            'imprint': 'Impressum',
            'imprint_link': 'https://www.open-telekom-cloud.com/en/imprint',
        }
    }

    // create timestamp
    var timestamp = new Date().toLocaleString();

    if (locale === 'de') {
        timestamp = `Zuletzt aktualisiert: ${timestamp}`
    } else {
        timestamp = `Last Updated: ${timestamp}`
    }

    return (        
        <scale-telekom-footer slot="footer">
            <scale-telekom-footer-content>
                <span slot="notice">© {new Date().getFullYear()} T-Systems International GmbH</span>
                <ul slot="navigation">
                    <li class={styles.timestamp}>
                        {timestamp}
                    </li>
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