import {Link} from 'react-router';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
import {useLocalCart} from '~/context/CartContext';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  layout: CartLayout;
};

export function CartMain({layout}: CartMainProps) {
  const {items, cartCount} = useLocalCart();

  const className = `cart-main cart-main--${layout}`;
  const cartHasItems = cartCount > 0;

  return (
    <section
      className={className}
      aria-label={layout === 'page' ? 'Cart page' : 'Cart drawer'}
    >
      <CartEmpty hidden={cartHasItems} layout={layout} />
      <div className="cart-details">
        <p id="cart-lines" className="sr-only">
          Line items
        </p>
        <div>
          <ul aria-labelledby="cart-lines">
            {items.map((item) => (
              <CartLineItem
                key={item.product.id}
                item={item}
                layout={layout}
              />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary layout={layout} />}
      </div>
    </section>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();
  return (
    <div className="sd-cart-empty" hidden={hidden}>
      <p className="sd-cart-empty-title">Your cart is empty</p>
      <p className="sd-cart-empty-copy">
        Add a kit or product to get started with your Sugar Down routine.
      </p>
      <Link
        className="sd-cart-empty-btn"
        to="/products"
        onClick={close}
        prefetch="viewport"
      >
        Browse products
      </Link>
    </div>
  );
}
