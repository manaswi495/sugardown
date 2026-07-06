import {Suspense} from 'react';
import {Await, Link, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop} = header;
  return (
    <div className="sd-header-wrapper" style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <TopBar />
      <header className="header sd-header" style={{ position: 'relative', paddingTop: 0, paddingBottom: 0 }}>
      <NavLink prefetch="intent" to="/" end className="sd-brand" style={{ position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/logo.png" alt="Sugar Down" style={{ height: '32px', width: 'auto' }} />
      </NavLink>
      <HeaderMenu
        menu={
          HEADER_MENU_FALLBACK as NonNullable<HeaderProps['header']['menu']>
        }
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </header>
    </div>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {(menu || HEADER_MENU_FALLBACK).items.map((item) => {
        if (!item.url) return null;

        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className={
              viewport === 'desktop'
                ? 'header-menu-item sd-nav-link'
                : 'header-menu-item'
            }
            end={!url.includes('#')}
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
      {viewport === 'mobile' ? (
        <NavLink
          className="header-menu-item"
          end
          key="sd-mobile-track"
          onClick={close}
          prefetch="intent"
          to="/track"
        >
          Track Order
        </NavLink>
      ) : null}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas sd-nav-actions" role="navigation">
      <HeaderMenuMobileToggle />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      type="button"
      className="header-menu-mobile-toggle reset sd-mobile-toggle"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <span className="sd-menu-icon" aria-hidden>
        ☰
      </span>
    </button>
  );
}


function CartBadge({count}: {count: number}) {
  const {open} = useAside();

  return (
    <a
      href="/cart"
      className="sd-cart-trigger"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
      }}
      aria-label={`Open cart, ${count} items`}
    >
      <span className="sd-cart-ic-wrap" aria-hidden>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </span>
      <span className="sd-cart-badge" aria-hidden>
        {count}
      </span>
    </a>
  );
}

import {useLocalCart} from '~/context/CartContext';

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  const {cartCount} = useLocalCart();
  return <CartBadge count={cartCount} />;
}

function CartBanner() {
  return null;
}

/** Primary header nav (always used for this bar so labels stay correct; Shopify main-menu is not shown here). */
export const HEADER_MENU_FALLBACK = {
  id: 'gid://shopify/Menu/sd-header',
  items: [
    {
      id: 'gid://shopify/MenuItem/sd-home',
      resourceId: null,
      tags: [],
      title: 'Home',
      type: 'HTTP',
      url: '/',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/sd-products',
      resourceId: null,
      tags: [],
      title: 'Products',
      type: 'HTTP',
      url: '/products',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/sd-about',
      resourceId: null,
      tags: [],
      title: 'About',
      type: 'HTTP',
      url: '/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/sd-contact',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'HTTP',
      url: '/contact',
      items: [],
    },
  ],
};

function TopBar() {
  const {cartCount} = useLocalCart();
  const {open} = useAside();

  return (
    <div className="sd-topbar-wrapper">
      <style>{`
        .sd-topbar-wrapper {
          box-sizing: border-box;
          background: #0a8c23;
          color: #fff;
          padding: 8px 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          width: 100%;
        }
        .sd-topbar-left, .sd-topbar-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .sd-topbar-social-group {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .sd-topbar-actions-group {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .sd-topbar-divider {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.4);
        }
        .sd-topbar-link {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s;
        }
        .sd-topbar-link:hover { opacity: 0.8; }
        .sd-topbar-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.4);
          color: #fff;
          text-decoration: none;
          transition: all 0.2s;
        }
        .sd-topbar-social:hover {
          background: #fff;
          color: #0a8c23;
        }
        .sd-topbar-cart-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: #F5A623;
          color: #000;
          font-size: 10px;
          font-weight: 800;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .sd-topbar-wrapper {
            flex-direction: column;
            justify-content: center;
            gap: 12px;
            padding: 12px 5%;
          }
          .sd-topbar-left, .sd-topbar-right {
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
          }
        }
        @media (max-width: 480px) {
          .sd-topbar-wrapper {
            font-size: 12px;
            padding: 10px 12px;
            gap: 16px;
          }
          .sd-topbar-left {
            flex-direction: column;
            gap: 8px;
          }
          .sd-topbar-right {
            gap: 12px;
          }
          .sd-topbar-actions-group {
            gap: 12px;
          }
        }
      `}</style>
      
      <div className="sd-topbar-left">
        <a href="tel:+918650777709" className="sd-topbar-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          +91 8650777709
        </a>
        <a href="mailto:luckyheartayurveda@gmail.com" className="sd-topbar-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          luckyheartayurveda@gmail.com
        </a>
      </div>

      <div className="sd-topbar-right">
        <div className="sd-topbar-social-group">
          <a href="https://www.instagram.com/_sugardown?igsh=MWN3cXIvNDI6anl6dg==" target="_blank" rel="noopener noreferrer" className="sd-topbar-social">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.facebook.com/share/1D5GjEUUbF/" target="_blank" rel="noopener noreferrer" className="sd-topbar-social">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
          </a>
        </div>

        <div className="sd-topbar-divider" />

        <div className="sd-topbar-actions-group">
          <Link to="/track" className="sd-topbar-link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="9" cy="11" r="2"></circle>
              <circle cx="15" cy="11" r="2"></circle>
              <line x1="11" y1="11" x2="13" y2="11"></line>
              <path d="M8 16c1.5 1.5 6.5 1.5 8 0"></path>
            </svg>
            Track Order
          </Link>
          <button 
            type="button" 
            className="sd-topbar-link" 
            onClick={() => open('cart')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, position: 'relative', outline: 'none' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <div className="sd-topbar-cart-badge">
              {cartCount}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
