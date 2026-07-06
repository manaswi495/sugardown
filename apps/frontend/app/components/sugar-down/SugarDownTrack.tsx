import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {SUPPORT_WHATSAPP_URL} from '~/lib/contact';

type OrderStatus = 'confirmed' | 'packed' | 'shipped' | 'delivered';

type StoredOrder = {
  id: string;
  name?: string;
  phone?: string;
  address?: string;
  total?: string | number;
  date?: string;
  status?: OrderStatus;
};

const STATUS_FLOW: Record<OrderStatus, {label: string; badge: string}> = {
  confirmed: {label: 'Order Confirmed', badge: 'sdp-tr-status-confirmed'},
  packed: {label: 'Packed & Ready', badge: 'sdp-tr-status-packed'},
  shipped: {label: 'Shipped', badge: 'sdp-tr-status-shipped'},
  delivered: {label: 'Delivered', badge: 'sdp-tr-status-delivered'},
};

const TIMELINE_STEPS: {
  key: OrderStatus;
  icon: string;
  title: string;
  desc: string;
}[] = [
  {
    key: 'confirmed',
    icon: '✓',
    title: 'Order Confirmed',
    desc: 'Your order has been received and confirmed. Our team has been notified.',
  },
  {
    key: 'packed',
    icon: '📦',
    title: 'Order Packed',
    desc: 'Your Sugar Down kit has been carefully packed and is ready for dispatch.',
  },
  {
    key: 'shipped',
    icon: '🚚',
    title: 'Shipped',
    desc: 'Your order is on the way! Track via the courier link sent on WhatsApp.',
  },
  {
    key: 'delivered',
    icon: '🏠',
    title: 'Delivered',
    desc: 'Your order has been delivered. Enjoy your Sugar Down journey! 🌿',
  },
];

const STATUS_ORDER: OrderStatus[] = [
  'confirmed',
  'packed',
  'shipped',
  'delivered',
];

function getStatusIndex(status: OrderStatus) {
  return STATUS_ORDER.indexOf(status);
}

export function SugarDownTrack() {
  const [orderId, setOrderId] = useState('');
  const [view, setView] = useState<'idle' | 'result' | 'notfound'>('idle');
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [recent, setRecent] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sd_last_order');
      if (raw) setRecent(JSON.parse(raw) as StoredOrder);
    } catch {
      /* ignore */
    }
  }, []);

  const trackOrder = (overrideRaw?: string) => {
    const id = (overrideRaw ?? orderId).trim().toUpperCase();
    if (!id) {
      window.alert('Please enter your Order ID');
      return;
    }

    setView('idle');
    setOrder(null);

    let stored: StoredOrder | null = null;
    try {
      const raw = localStorage.getItem(`sd_order_${id}`);
      if (raw) stored = JSON.parse(raw) as StoredOrder;
    } catch {
      /* ignore */
    }

    if (stored) {
      setOrder(stored);
      setView('result');
      return;
    }

    if (id.startsWith('SD') && id.length >= 8) {
      const demoOrder: StoredOrder = {
        id,
        name: 'Customer',
        phone: '—',
        address: 'India',
        total: '1755',
        date: new Date().toLocaleDateString('en-IN'),
        status: 'shipped',
      };
      setOrder(demoOrder);
      setView('result');
      return;
    }

    setView('notfound');
  };

  const status: OrderStatus = order?.status ?? 'confirmed';
  const sf = STATUS_FLOW[status] ?? STATUS_FLOW.confirmed;
  const currentIdx = getStatusIndex(status);

  return (
    <div className="sdp-track">
      <div className="sdp-tr-wrap">
        <h1 className="sdp-tr-title">Track Your Order</h1>
        <p className="sdp-tr-sub">
          Enter your Order ID to see real-time status of your Sugar Down order.
        </p>

        <div className="sdp-tr-search-box">
          <h3>Enter Order ID</h3>
          <div className="sdp-tr-search-row">
            <input
              className="sdp-tr-search-input"
              id="track-input"
              placeholder="e.g. SD12345678"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') trackOrder();
              }}
              autoComplete="off"
            />
            <button
              type="button"
              className="sdp-tr-search-btn"
              onClick={() => trackOrder()}
            >
              Track Order
            </button>
          </div>
          <div className="sdp-tr-search-hint">
            Your Order ID was sent to you via WhatsApp after placing the order.
            It starts with &quot;SD&quot;.
          </div>
        </div>

        <div
          className={`sdp-tr-result-box${view === 'result' && order ? ' is-visible' : ''}`}
        >
          {order && view === 'result' ? (
            <>
              <div className="sdp-tr-result-header">
                <div className="sdp-tr-rh-left">
                  <h3>{order.id}</h3>
                  <p>Ordered on {order.date ?? '—'}</p>
                </div>
                <span className={`sdp-tr-status-badge ${sf.badge}`}>
                  {sf.label}
                </span>
              </div>
              <div className="sdp-tr-result-body">
                <div className="sdp-tr-track-timeline">
                  {TIMELINE_STEPS.map((s, i) => {
                    const state =
                      i < currentIdx
                        ? 'done'
                        : i === currentIdx
                          ? 'active'
                          : 'pending';
                    const time =
                      i <= currentIdx
                        ? i === 0
                          ? 'Just now'
                          : i === 1
                            ? 'Within 24 hrs'
                            : i === 2
                              ? '1-2 days'
                              : '3-5 days'
                        : 'Pending';
                    const showDesc = state !== 'pending';
                    return (
                      <div key={s.key} className="sdp-tr-tl-step">
                        <div className={`sdp-tr-tl-dot ${state}`}>
                          {state === 'done' ? '✓' : s.icon}
                        </div>
                        <div
                          className={`sdp-tr-tl-title${state === 'pending' ? ' pending-text' : ''}`}
                        >
                          {s.title}
                        </div>
                        <div className="sdp-tr-tl-time">{time}</div>
                        {showDesc ? (
                          <div className="sdp-tr-tl-desc">{s.desc}</div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <div className="sdp-tr-order-info-grid">
                  <div className="sdp-tr-oi-item">
                    <div className="sdp-tr-oi-label">Customer</div>
                    <div className="sdp-tr-oi-val">{order.name ?? '—'}</div>
                  </div>
                  <div className="sdp-tr-oi-item">
                    <div className="sdp-tr-oi-label">Mobile</div>
                    <div className="sdp-tr-oi-val">{order.phone ?? '—'}</div>
                  </div>
                  <div className="sdp-tr-oi-item">
                    <div className="sdp-tr-oi-label">Delivery Address</div>
                    <div className="sdp-tr-oi-val" style={{fontSize: '12px'}}>
                      {order.address ?? '—'}
                    </div>
                  </div>
                  <div className="sdp-tr-oi-item">
                    <div className="sdp-tr-oi-label">Order Total</div>
                    <div
                      className="sdp-tr-oi-val"
                      style={{color: 'var(--sdp-gd)'}}
                    >
                      ₹
                      {(parseInt(String(order.total), 10) || 0).toLocaleString(
                        'en-IN',
                      )}
                    </div>
                  </div>
                </div>
                <div className="sdp-tr-help-strip">
                  💬 Need help with your order?{' '}
                  <a
                    href={SUPPORT_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp us
                  </a>{' '}
                  with your Order ID.
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div
          className={`sdp-tr-not-found${view === 'notfound' ? ' is-visible' : ''}`}
          aria-live="polite"
        >
          <div className="sdp-tr-not-found-icon" aria-hidden>
            🔍
          </div>
          <h3>Order Not Found</h3>
          <p>
            We couldn&apos;t find an order with that ID. Please check the Order
            ID in your WhatsApp confirmation message and try again.
          </p>
          <Link to="/contact">Contact Support</Link>
        </div>

        <div className={`sdp-tr-recent-box${recent ? ' is-visible' : ''}`}>
          {recent ? (
            <>
              <h4>Your Recent Orders</h4>
              <button
                type="button"
                className="sdp-tr-recent-item"
                onClick={() => {
                  setOrderId(recent.id);
                  trackOrder(recent.id);
                }}
              >
                <span className="sdp-tr-recent-id">{recent.id}</span>
                <span className="sdp-tr-recent-date">{recent.date ?? ''}</span>
                <span className="sdp-tr-recent-arrow">→</span>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
