import { useState } from 'react';
import type { Route } from './+types/track';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Track Order — Sugar Down' }];
};

export default function TrackOrder() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setHasSearched(true);
    
    try {
      const res = await fetch(`http://localhost:3020/api/orders/track?phone=${encodeURIComponent(phone)}`);
      const data = await res.json() as any;
      
      if (res.ok) {
        setOrders(data);
      } else {
        setError(data.error || 'Failed to fetch orders');
        setOrders([]);
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '16px', color: '#1B4D2E' }}>Track Your Order</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Enter the phone number you used during checkout to track the status of your packages.
      </p>

      <form onSubmit={handleTrack} style={{ display: 'flex', gap: '16px', maxWidth: '500px', margin: '0 auto 60px' }}>
        <input 
          type="tel" 
          required 
          maxLength={10}
          pattern="[0-9]{10}"
          placeholder="Enter your 10-digit phone number..." 
          value={phone} 
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            if (val.length <= 10) setPhone(val);
          }}
          style={{ flex: 1, padding: '16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '16px 32px', background: '#C8972A', color: '#1B4D2E', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Tracking...' : 'Track'}
        </button>
      </form>

      {error && (
        <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '16px', borderRadius: '8px', textAlign: 'center', marginBottom: '40px' }}>
          {error}
        </div>
      )}

      {orders.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '24px', marginBottom: '32px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', marginBottom: '4px' }}>Date Placed</div>
                  <div style={{ fontSize: '17px', fontWeight: '600', color: '#0f172a' }}>{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', marginBottom: '4px' }}>Total Amount</div>
                  <div style={{ fontSize: '17px', fontWeight: '600', color: '#0f172a' }}>₹{order.totalAmount.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', marginBottom: '4px' }}>Order Number</div>
                  <div style={{ fontSize: '15px', fontFamily: 'monospace', color: '#334155', background: '#f8fafc', padding: '4px 8px', borderRadius: '6px', display: 'inline-block' }}>
                    {order.id.split('-')[0].toUpperCase()}
                  </div>
                </div>
                {order.awbNumber && (
                  <div>
                    <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', marginBottom: '4px' }}>Tracking Number (AWB)</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#0284c7' }}>{order.awbNumber}</div>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '40px', padding: '0 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '4px', background: '#e2e8f0', zIndex: 0, transform: 'translateY(-50%)', borderRadius: '4px' }}></div>
                  
                  {/* Status Steps */}
                  {['PENDING', 'PAID', 'SHIPPED', 'DELIVERED'].map((step, idx) => {
                    const statusIndex = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED'].indexOf(order.status);
                    const isCompleted = idx <= statusIndex;
                    const isCurrent = idx === statusIndex;
                    
                    return (
                      <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, position: 'relative', background: '#fff', padding: '0 16px' }}>
                        <div style={{ 
                          width: '40px', height: '40px', borderRadius: '50%', 
                          background: isCompleted ? '#1B4D2E' : '#f1f5f9', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: isCompleted ? '#fff' : '#94a3b8', fontWeight: 'bold', 
                          border: isCurrent ? '4px solid #dcfce7' : 'none',
                          boxShadow: isCompleted ? '0 4px 6px -1px rgba(27, 77, 46, 0.2)' : 'none',
                          transition: 'all 0.2s ease'
                        }}>
                          {isCompleted ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          ) : idx + 1}
                        </div>
                        <span style={{ 
                          marginTop: '12px', fontSize: '13px', 
                          fontWeight: isCurrent ? '700' : isCompleted ? '600' : '500', 
                          color: isCompleted ? '#1B4D2E' : '#94a3b8',
                          letterSpacing: '0.02em'
                        }}>
                          {step}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>Items in this shipment</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {order.items.map((item: any) => (
                    <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                      <img src={item.product?.image} alt={item.product?.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '16px', color: '#0f172a', marginBottom: '4px' }}>{item.product?.title}</div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>Qty: {item.quantity}</div>
                      </div>
                      <div style={{ fontWeight: '700', fontSize: '16px', color: '#0f172a' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && hasSearched && orders.length === 0 && !error && (
        <p style={{ textAlign: 'center', color: '#666' }}>We couldn't find any orders matching that phone number.</p>
      )}
    </div>
  );
}
