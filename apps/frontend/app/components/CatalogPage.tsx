import {Link} from 'react-router';
import {SugarDownCatalogLegacy} from '~/components/sugar-down/SugarDownCatalogLegacy';

type Props = {
  products: any[];
};

export function CatalogPage({products}: Props) {
  return (
    <div className="collection sd-catalog">
      <div className="sd-catalog-top">
        <h1>Our Products</h1>
        <p>
          Choose your kit or buy individual products. Every order includes 24×7
          WhatsApp care.
        </p>
      </div>
      <div className="wrap">
        {/* We keep the legacy styled visual hero for the kits */}
        <SugarDownCatalogLegacy products={products} />
        
      </div>
    </div>
  );
}
