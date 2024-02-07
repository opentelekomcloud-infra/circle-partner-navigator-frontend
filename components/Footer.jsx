'use client';

import Link from 'next/link'
import React from 'react';

function Footer() {
    return (        
        <scale-telekom-footer slot="footer">
            <scale-telekom-footer-content>
                <span slot="notice"> © Deutsche Telekom AG </span>
                <ul slot="navigation">
                    <li>
                        <Link href="https://www.open-telekom-cloud.com/_Resources/Persistent/1/d/5/f/1d5f960ae36cb3624ea1759fc5813d572f76e7cc/open-telekom-cloud-supplementary-conditions-commissioned-processing-personal-data.pdf">Commissioned Processing</Link>
                    </li>
                    <li>
                        <Link href="https://www.open-telekom-cloud.com/en/disclaimer-of-liability">Disclaimer of liability</Link>
                    </li>
                    <li>
                        <Link href="https://www.open-telekom-cloud.com/en/data-protection">Data privacy</Link>
                    </li>
                    <li>
                        <Link href="https://www.open-telekom-cloud.com/en/imprint">Imprint</Link>
                    </li>
                </ul>
            </scale-telekom-footer-content>
        </scale-telekom-footer>
    )
}

export default Footer;