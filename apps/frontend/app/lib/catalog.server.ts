import {getPaginationVariables} from '@shopify/hydrogen';
import type {CatalogQuery} from 'storefrontapi.generated';

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
` as const;

export const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;

type CatalogLoaderArgs = {
  context: {
    storefront: {
      query: <T = CatalogQuery>(
        query: string,
        opts?: {variables?: Record<string, unknown>},
      ) => Promise<T>;
    };
  };
  request: Request;
};

export async function loadCatalogData({
  context,
  request,
}: CatalogLoaderArgs): Promise<{products: CatalogQuery['products']}> {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const data = await storefront.query<CatalogQuery>(CATALOG_QUERY, {
    variables: {...paginationVariables},
  });
  return {products: data.products};
}

export type CatalogLoaderData = {products: CatalogQuery['products']};
