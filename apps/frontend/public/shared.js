// ── SUGAR DOWN SHARED CART LOGIC ──
// Idempotent for Next.js (layout + legacy page may both request this file).
// Only skip when APIs exist — __SD_SHARED__ alone can be true without addToCart if load order / Turbopack races.
(function () {
  if (typeof window !== 'undefined' && typeof window.addToCart === 'function') return;

  const PRODUCTS = {
    'kwath': { id:'kwath', name:'Pravahi Kwath', sub:'500ml Herbal Juice', price:565, img:'🍃', tag:'Morning Care' },
    'daycaps': { id:'daycaps', name:'Diabetes Care Capsules', sub:'60 Capsules', price:745, img:'💊', tag:'Daytime Care' },
    'sleepcaps': { id:'sleepcaps', name:'Sleep Care Capsules', sub:'30 Capsules', price:360, img:'😴', tag:'Night Care' },
    'corekit': { id:'corekit', name:'Core Kit', sub:'Kwath + Day Capsules', price:1310, img:'📦', tag:'Best Value', badge:'5% OFF' },
    'balkit': { id:'balkit', name:'Balanced Kit', sub:'Kwath + Day + Sleep Capsules', price:1670, img:'⭐', tag:'Most Recommended', badge:'5% OFF' },
  };

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem('sd_cart') || '[]');
    } catch {
      return [];
    }
  }
  function saveCart(cart) { localStorage.setItem('sd_cart', JSON.stringify(cart)); }

  function addToCart(id, qty=1) {
    const cart = getCart();
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty });
    saveCart(cart);
    updateCartBadge();
    showToast('Added to cart!');
  }

  function updateCartBadge() {
    const cart = getCart();
    const total = cart.reduce((s,i) => s + i.qty, 0);
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = total;
      el.style.display = total > 0 ? 'flex' : 'none';
    });
  }

  function showToast(msg) {
    let t = document.getElementById('sd-toast');
    if (!t) { t = document.createElement('div'); t.id='sd-toast'; t.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1B4D2E;color:#fff;padding:12px 24px;border-radius:50px;font-size:13px;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.2);transition:opacity .3s;'; document.body.appendChild(t); }
    t.textContent = msg; t.style.opacity = '1';
    setTimeout(() => t.style.opacity = '0', 2000);
  }

  function cartTotal() {
    const cart = getCart();
    return cart.reduce((s,i) => { const p = PRODUCTS[i.id]; return s + (p ? p.price * i.qty : 0); }, 0);
  }

  function generateOrderId() {
    return 'SD' + Date.now().toString().slice(-8) + Math.floor(Math.random()*100);
  }

  if (typeof window !== 'undefined') {
    window.PRODUCTS = PRODUCTS;
    window.getCart = getCart;
    window.saveCart = saveCart;
    window.addToCart = addToCart;
    window.updateCartBadge = updateCartBadge;
    window.cartTotal = cartTotal;
    window.generateOrderId = generateOrderId;
    window.__SD_SHARED__ = true;
  }

  function injectMobileNav() {
  if (window.innerWidth > 900) return;
  if (document.getElementById('mobile-bottom-nav')) return;
  
  const nav = document.createElement('div');
  nav.id = 'mobile-bottom-nav';
  nav.style.cssText = 'position:fixed;bottom:0;left:0;right:0;height:64px;background:#1B4D2E;border-top:1px solid rgba(200,151,42,0.3);display:flex;align-items:center;justify-content:space-around;z-index:9999;padding:0 10px;box-shadow:0 -4px 16px rgba(0,0,0,0.2);';
  
  const links = [
    { icon: '🏠', label: 'Home', href: 'index.html' },
    { icon: '📦', label: 'Products', href: 'products.html' },
    { icon: '🛒', label: 'Cart', href: 'cart.html', badge: true },
    { icon: '📞', label: 'Support', href: 'contact.html' }
  ];

  links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.href;
    a.style.cssText = 'display:flex;flex-direction:column;align-items:center;text-decoration:none;color:rgba(255,255,255,0.7);gap:4px;flex:1;';
    
    const icon = document.createElement('span');
    icon.textContent = l.icon;
    icon.style.fontSize = '20px';
    icon.style.position = 'relative';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    
    if (l.badge) {
      const b = document.createElement('span');
      b.className = 'cart-badge';
      b.style.cssText = 'position:absolute;top:-8px;right:-8px;background:#C8972A;color:#0F1A13;width:16px;height:16px;border-radius:50%;font-size:10px;font-weight:700;display:none;align-items:center;justify-content:center;';
      icon.appendChild(b);
    }

    const label = document.createElement('span');
    label.textContent = l.label;
    label.style.fontSize = '10px';
    label.style.fontWeight = '600';
    label.style.textTransform = 'uppercase';
    label.style.letterSpacing = '0.5px';

    a.appendChild(icon);
    a.appendChild(label);
    
    const path = window.location.pathname;
    if (path.endsWith(l.href) || (l.href === 'index.html' && (path === '/' || path === ''))) {
       a.style.color = '#C8972A';
    }

    nav.appendChild(a);
  });

  document.body.appendChild(nav);
  document.body.style.paddingBottom = '70px';
  updateCartBadge();
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    injectMobileNav();
  });
})();
