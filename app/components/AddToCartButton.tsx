import {type FetcherWithComponents} from 'react-router';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';

export function AddToCartButton({
  analytics,
  children,
  className,
  disabled,
  lines,
  loadingText = 'Adding...',
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  loadingText?: string;
  onClick?: () => void;
}) {
  return (
    <CartForm
      fetcherKey="cart-lines-add"
      route="/cart"
      inputs={{lines}}
      action={CartForm.ACTIONS.LinesAdd}
    >
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            className={className}
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
            aria-busy={fetcher.state !== 'idle'}
            data-loading={fetcher.state !== 'idle' ? 'true' : 'false'}
          >
            {fetcher.state !== 'idle' ? loadingText : children}
          </button>
        </>
      )}
    </CartForm>
  );
}
