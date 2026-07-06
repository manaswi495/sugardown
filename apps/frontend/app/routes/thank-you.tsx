import { Link } from 'react-router';
import type { Route } from './+types/thank-you';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Thank You — Sugar Down' }];
};

export default function ThankYou() {
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '80px', height: '80px', background: '#e6f4ea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B4D2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      
      <h1 style={{ fontSize: '36px', color: '#1B4D2E', marginBottom: '16px' }}>Thank You for Your Order!</h1>
      <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
        Your payment has been successfully processed and your order is confirmed. We are packing your Sugar Down products right now.
      </p>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link 
          to="/track" 
          style={{ padding: '16px 32px', background: '#C8972A', color: '#1B4D2E', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}
        >
          Track My Order
        </Link>
        <Link 
          to="/products" 
          style={{ padding: '16px 32px', background: 'transparent', color: '#1B4D2E', border: '2px solid #1B4D2E', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
