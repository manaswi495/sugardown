import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

function compareAtIsHigherThanPrice(
  price?: MoneyV2,
  compareAt?: MoneyV2 | null,
): compareAt is MoneyV2 {
  if (!price || !compareAt) return false;
  if (price.currencyCode !== compareAt.currencyCode) return false;
  return parseFloat(compareAt.amount) > parseFloat(price.amount);
}

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  const onSale = compareAtIsHigherThanPrice(price, compareAtPrice);

  return (
    <div aria-label="Price" className="product-price" role="group">
      {onSale ? (
        <div className="product-price-on-sale">
          {price ? <Money data={price} /> : null}
          <s>
            <Money data={compareAtPrice} />
          </s>
        </div>
      ) : price ? (
        <Money data={price} />
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
