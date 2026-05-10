import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/products.$handle';
import sugarDownProductStyles from '~/styles/sugar-down-product.css?url';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const meta: Route.MetaFunction = ({data}) => {
  const title = data?.product.title ?? 'Product';
  return [
    {title: `Sugar Down | ${title}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export function links() {
  return [{rel: 'stylesheet', href: sugarDownProductStyles}];
}

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

/** Splits "Core Kit - Pravahi Kwath + …" into a short heading + one-line subtitle. */
function splitPdpTitle(title: string): {primary: string; subtitle?: string} {
  const sep = ' - ';
  const i = title.indexOf(sep);
  if (i === -1) return {primary: title};
  const primary = title.slice(0, i).trim();
  const subtitle = title.slice(i + sep.length).trim();
  if (!primary || !subtitle) return {primary: title};
  return {primary, subtitle};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  const safeSelectedVariant =
    selectedVariant ?? product.selectedOrFirstAvailableVariant;

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(safeSelectedVariant?.selectedOptions ?? []);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: safeSelectedVariant,
  });

  const {title, descriptionHtml} = product;
  const {primary: titlePrimary, subtitle: titleSubtitle} = splitPdpTitle(title);

  const galleryFallback =
    product.images?.nodes?.find((img) => img?.url) ?? null;

  let mediaImageFallback: (typeof galleryFallback) | null = null;
  for (const node of product.media.nodes) {
    if (node.__typename === 'MediaImage' && node.image?.url) {
      mediaImageFallback = node.image;
      break;
    }
  }

  const productImage =
    selectedVariant?.image?.url
      ? selectedVariant.image
      : product.featuredImage?.url
        ? product.featuredImage
        : galleryFallback?.url
          ? galleryFallback
          : mediaImageFallback;

  const inStock = safeSelectedVariant?.availableForSale ?? false;

  return (
    <section className="sd-pdp">
      <div className="sd-pdp-inner">
        <nav className="sd-pdp-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link prefetch="intent" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link prefetch="intent" to="/products">
                Products
              </Link>
            </li>
            <li aria-current="page">{titlePrimary}</li>
          </ol>
        </nav>

        <div className="sd-pdp-gallery">
          <ProductImage image={productImage} />
        </div>
        <div className="sd-pdp-main">
          <div className="sd-pdp-buy-card">
            <header className="sd-pdp-buy-header">
              <p className="sd-pdp-eyebrow">Ayurvedic wellness</p>
              <h1 className="sd-pdp-title-primary">{titlePrimary}</h1>
              {titleSubtitle ? (
                <p className="sd-pdp-title-sub">{titleSubtitle}</p>
              ) : null}
              {product.vendor ? (
                <p className="sd-pdp-vendor">
                  <span className="sd-pdp-vendor-label">Sold by</span>{' '}
                  {product.vendor}
                </p>
              ) : null}
            </header>

            <div
              className={`sd-pdp-stock sd-pdp-stock--${inStock ? 'in' : 'out'}`}
              role="status"
            >
              {inStock
                ? 'In stock — ready to add to your cart'
                : 'Currently unavailable'}
            </div>

            <div className="sd-pdp-price-block">
              <div className="sd-pdp-price-row">
                <ProductPrice
                  price={safeSelectedVariant?.price}
                  compareAtPrice={safeSelectedVariant?.compareAtPrice}
                />
              </div>
              <p className="sd-pdp-price-note">
                Taxes and shipping are calculated at secure checkout.
              </p>
            </div>

            <div className="sd-pdp-add-wrap">
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
                submitButtonClassName="sd-pdp-add-btn"
              />
            </div>

            <ul className="sd-pdp-trust-list" aria-label="Why customers trust us">
              <li>Authentic Ayurvedic formulations</li>
              <li>Secure Shopify checkout</li>
              <li>Human support with every order</li>
            </ul>
          </div>
          {descriptionHtml ? (
            <article className="sd-pdp-details">
              <h2 id="sd-pdp-about-heading">About this product</h2>
              <div
                className="sd-pdp-prose"
                aria-labelledby="sd-pdp-about-heading"
                dangerouslySetInnerHTML={{__html: descriptionHtml}}
              />
            </article>
          ) : null}
        </div>
      </div>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              // Guard against products with incomplete variant pricing data.
              price: safeSelectedVariant?.price?.amount || '0',
              vendor: product.vendor,
              variantId: safeSelectedVariant?.id || '',
              variantTitle: safeSelectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </section>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    featuredImage {
      id
      altText
      url
      width
      height
    }
    images(first: 20) {
      nodes {
        id
        altText
        url
        width
        height
      }
    }
    media(first: 20) {
      nodes {
        __typename
        ... on MediaImage {
          id
          image {
            id
            altText
            url
            width
            height
          }
        }
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
