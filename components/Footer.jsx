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
                    <Link href="#"> Imprint </Link>
                </li>
                <li>
                    <Link href="#"> Data privacy </Link>
                </li>
                <li>
                    <Link href="#"> Terms and conditions </Link>
                </li>
                <li>
                    <Link href="#"> Consumer protection </Link>
                </li>
                <li>
                    <Link href="#"> Product information sheet </Link>
                </li>
                <li>
                    <Link href="#"> Youth protection </Link>
                </li>
                </ul>
            </scale-telekom-footer-content>
        </scale-telekom-footer>
    )
}

export default Footer;