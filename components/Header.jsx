import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from '/styles/Header.module.css';
import SearchModal from '@/components/SearchModal';

const openSearchModal = () => {
  const modal = document.getElementById('SearchModal');
  modal.opened = true;
}

function Header({ props }) {
  const pathname = usePathname();
  const router = useRouter()
  const handleClick = (e, lang) => {
    e.preventDefault();
    const newPath = pathname.replace(/\/[a-z]{2}/, `/${lang}`); // Replaces only the first match
    router.push(newPath);
  }

  // Get the current language from the URL
  const currentLang = pathname.split('/')[1];
  const [lang, setLang] = useState(currentLang);

  // Update the language state when the URL changes
  useEffect(() => {
    setLang(pathname.split('/')[1]);
  }, [pathname]);

  return (
    <div>
      <scale-telekom-header
        slot="header"
        app-name="Open Telekom Cloud Partner Portal"
        app-name-link="/"
        logo-href="/"
        logo-title="Telekom Brand Logo"
        lang-switcher-aria-label="Language switcher section"
      >
        <scale-telekom-nav-list
          slot="main-nav"
          aria-label="Main Navigation Links"
        >
          <scale-telekom-nav-item aria-label="Partner Navigator">
            <Link href="/">Partner Navigator</Link>
          </scale-telekom-nav-item>
        </scale-telekom-nav-list>
        <scale-telekom-nav-list
          slot="lang-switcher"
          variant="lang-switcher"
          alignment="right"
          aria-label="Language switcher"
        >
          <scale-telekom-nav-item active={lang === 'en'}>
            <a onClick={(e) => handleClick(e, 'en')}>EN</a>
          </scale-telekom-nav-item>
          <scale-telekom-nav-item active={lang === 'de'}>
            <a onClick={(e) => handleClick(e, 'de')}>DE</a>
          </scale-telekom-nav-item>
        </scale-telekom-nav-list>
        <scale-telekom-nav-list
          variant="functions"
          slot="functions"
          alignment="right"
        >
          <scale-telekom-nav-item variant="functions" class="scale-telekom-nav-item hydrated" role="none">
            <a className={styles.SearchIconScaleNavBar} onClick={openSearchModal} role="menuitem">
              <scale-icon-action-search accessibility-title="Search" size="24" class="hydrated" style={{display: "inline-flex;"}}></scale-icon-action-search>
            </a>
          </scale-telekom-nav-item>
          <scale-telekom-nav-item
            class="burger-item"
            hide-on-desktop="true">
            <button>
              <scale-badge no-dot>
                <scale-icon-action-menu></scale-icon-action-menu>
              </scale-badge>
            </button>
            <scale-telekom-nav-flyout class="mobile-nav-flyout">
              <scale-telekom-mobile-flyout-canvas>
                <scale-telekom-nav-list
                  variant="lang-switcher"
                  slot="mobile-before-main-nav"
                  alignment="left"
                >
                  <scale-telekom-nav-item active={lang === 'en'}>
                    <a onClick={(e) => handleClick(e, 'en')}>EN</a>
                  </scale-telekom-nav-item>
                  <scale-telekom-nav-item active={lang === 'de'}>
                    <a onClick={(e) => handleClick(e, 'de')}>DE</a>
                  </scale-telekom-nav-item>
                </scale-telekom-nav-list>
                <scale-telekom-mobile-menu slot="mobile-main-nav">
                  <scale-telekom-mobile-menu-item
                    active
                    level="0"
                    current-level="0"
                  >
                    <Link href="/">Partner Navigator</Link>
                  </scale-telekom-mobile-menu-item>
                </scale-telekom-mobile-menu>
              </scale-telekom-mobile-flyout-canvas>
            </scale-telekom-nav-flyout>
          </scale-telekom-nav-item>
        </scale-telekom-nav-list>
      </scale-telekom-header>
      <SearchModal locale={lang}></SearchModal>
    </div>
  );
}

export default Header;
