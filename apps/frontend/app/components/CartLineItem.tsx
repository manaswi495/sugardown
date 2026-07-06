import {Link} from 'react-router';
import type {CartLayout} from '~/components/CartMain';
import {useAside} from './Aside';
import {useLocalCart, type CartItem} from '~/context/CartContext';

export function CartLineItem({
  layout,
  item,
}: {
  layout: CartLayout;
  item: CartItem;
}) {
  const {product, quantity} = item;
  const {close} = useAside();
  const {removeItem, updateQuantity} = useLocalCart();

  return (
    <li className="cart-line">
      <div className="cart-line-inner">
        {product.image && (
          <div className="sd-cart-line-thumb">
            <img
              alt={product.title}
              src={product.image}
              style={{ width: '88px', height: '88px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="sd-cart-line-body">
          <Link
            className="sd-cart-line-title-link"
            prefetch="intent"
            to={`/products/${product.handle}`}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
          >
            <p className="sd-cart-line-title">
              <strong>{product.title}</strong>
            </p>
          </Link>
          <div className="sd-cart-line-price">
            <span style={{ fontWeight: 'bold' }}>₹{product.price}</span>
          </div>
          
          <div className="cart-line-quantity sd-cart-qty">
            <span className="sd-cart-qty-label">Qty</span>
            <div className="sd-cart-qty-stepper">
              <button
                className="sd-cart-qty-btn"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => updateQuantity(product.id, quantity - 1)}
              >
                −
              </button>
              <span className="sd-cart-qty-value">{quantity}</span>
              <button
                className="sd-cart-qty-btn"
                aria-label="Increase quantity"
                onClick={() => updateQuantity(product.id, quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="sd-cart-remove"
              onClick={() => removeItem(product.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
