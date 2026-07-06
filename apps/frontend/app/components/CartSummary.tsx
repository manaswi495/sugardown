import {useId} from 'react';
import type {CartLayout} from '~/components/CartMain';
import {useLocalCart} from '~/context/CartContext';
import {useNavigate} from 'react-router';
import {useState, useEffect} from 'react';

type CartSummaryProps = {
  layout: CartLayout;
};

export function CartSummary({layout}: CartSummaryProps) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';
  const summaryId = useId();
  const {cartTotal} = useLocalCart();

  return (
    <div aria-labelledby={summaryId} className={`${className} sd-cart-summary`}>
      <h4 id={summaryId} className="sd-cart-summary-title">
        Order summary
      </h4>
      <dl role="group" className="cart-subtotal sd-cart-subtotal">
        <dt>Subtotal</dt>
        <dd>
          {cartTotal > 0 ? `₹${cartTotal}` : '-'}
        </dd>
      </dl>
      <CartCheckoutActions />
    </div>
  );
}

function CartCheckoutActions() {
  const {items, cartTotal, clearCart} = useLocalCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  if (items.length === 0) return null;

  const handleMagicCheckout = async () => {
    setLoading(true);
    try {
      const orderData = {
        totalAmount: cartTotal,
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        }))
      };

      const res = await fetch('http://localhost:3020/api/orders/magic-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result: any = await res.json();
      
      if (res.ok && result.razorpayOrderId) {
         const options = {
           key: 'rzp_test_dummy',
           amount: result.amount,
           currency: 'INR',
           name: 'Sugar Down',
           description: 'Magic Checkout',
           order_id: result.razorpayOrderId,
           handler: function (response: any) {
              // The webhook handles DB creation. We just clear cart and say thanks!
              clearCart();
              navigate('/thank-you');
           },
           theme: { color: '#1B4D2E' }
         };
         const rzp = new (window as any).Razorpay(options);
         rzp.on('payment.failed', function (response: any){
            alert('Payment failed. Please try again.');
         });
         rzp.open();
      } else {
        alert('Failed to initialize Magic Checkout');
      }
    } catch (error) {
      console.error(error);
      alert('Network error initializing checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sd-cart-checkout-wrap">
      <button 
        onClick={handleMagicCheckout}
        disabled={loading}
        className="sd-cart-checkout-btn" 
        style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Loading...' : 'Magic Checkout ⚡'}
        {!loading && <span className="sd-cart-checkout-arrow" aria-hidden>→</span>}
      </button>
    </div>
  );
}
