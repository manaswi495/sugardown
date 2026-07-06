import {useLoaderData} from 'react-router';
import type {Route} from './+types/products._index';

import {CatalogPage} from '~/components/CatalogPage';
import sugarDownCatalogStyles from '~/styles/sugar-down-catalog.css?url';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Our Products — Sugar Down'}];
};

export function links() {
  return [{rel: 'stylesheet', href: sugarDownCatalogStyles}];
}

import { localProducts } from '~/lib/products';

export async function loader(): Promise<{ products: any[] }> {
  try {
    const response = await fetch('http://localhost:3020/api/products');
    const products = await response.json();
    if (Array.isArray(products)) {
      return { products };
    }
    console.warn("API didn't return an array, falling back to local products.");
    return { products: localProducts };
  } catch (error) {
    console.error("Failed to load products:", error);
    return { products: localProducts };
  }
}

export default function ProductsPage() {
  const data = useLoaderData<typeof loader>();
  return <CatalogPage products={data.products} />;
}
