import {Link} from 'react-router';
import coreKitImage from '../../../3.png';
import balancedKitImage from '../../../2.png';
import pravahiImage from '../../../pravahi.png';
import careImage from '../../../care.png';
import sleepImage from '../../../sleep.png';

/**
 * Dynamic products.page marketing (kits, individuals, usage) based on backend data.
 */
export function SugarDownCatalogLegacy({ products = [] }: { products?: any[] }) {
  const kits = products.filter(p => p.title.toLowerCase().includes('kit'));
  const individuals = products.filter(p => !p.title.toLowerCase().includes('kit'));

  const getImageSrc = (img: string) => {
    if (!img) return '';
    return img.startsWith('http') ? img : `http://localhost:3000${img}`;
  };

  return (
    <>


      <div className="sd-legacy-kits">
        {kits.map((kit, index) => {
          const isFeatured = index === 1; // Highlight the second kit
          return (
            <div key={kit.id} className={`sd-legacy-kit-card ${isFeatured ? 'featured' : 'sd-legacy-kit-card--core'}`}>
              {isFeatured && <div className="sd-legacy-kit-featured-badge">⭐ Most Recommended</div>}
              <div className="sd-legacy-kit-hero">
                <img src={getImageSrc(kit.image)} alt={kit.title} loading="lazy" />
              </div>
              <div className="sd-legacy-kit-content">
                <div className="sd-legacy-kit-header">
                  <div className="sd-legacy-kit-name">{kit.title}</div>
                  <div className="sd-legacy-kit-sub">{kit.description}</div>
                  <div className="sd-legacy-kit-price-row">
                    <span className="sd-legacy-kit-price">₹{kit.price}</span>
                  </div>
                  <div className="sd-legacy-kit-perday">
                    {kit.originalPrice && <span style={{textDecoration: 'line-through', marginRight: '8px', opacity: 0.7}}>₹{kit.originalPrice}</span>}
                    5% Discount Applied
                  </div>
                </div>
                <div className="sd-legacy-kit-body">
                  <div className="sd-legacy-kit-includes">
                    <h4>What&apos;s Included</h4>
                    {kit.benefits?.map((benefit: string, i: number) => (
                      <div key={i} className="sd-legacy-kit-item">
                        <span className="check">✓</span> {benefit}
                      </div>
                    ))}
                  </div>
                  <div className="sd-legacy-kit-perks">
                    <span className="sd-legacy-kit-perk">5% Off</span>
                    <span className="sd-legacy-kit-perk">Free Shipping</span>
                    {isFeatured && <span className="sd-legacy-kit-perk">Best Value</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <Link
                      className="sd-legacy-kit-btn outline"
                      style={{ flex: 1 }}
                      to={`/products/${kit.handle}`}
                      prefetch="intent"
                    >
                      View Details
                    </Link>
                    <Link
                      className="sd-legacy-kit-btn solid"
                      style={{ flex: 1 }}
                      to={`/products/${kit.handle}`}
                      prefetch="intent"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sd-legacy-ind-title">Or Buy Individual Products</div>
      <div className="sd-legacy-ind-sub">
        Mix and match based on your needs. Add multiple quantities.
      </div>
      <div className="sd-legacy-products">
        {individuals.map((prod, index) => {
          const bgClass = `p${(index % 3) + 1}`;
          const tag = prod.description?.includes('Morning') ? 'Morning Care' :
                      prod.description?.includes('Daytime') ? 'Daytime Care' :
                      prod.description?.includes('Night') ? 'Night Care' : 'Daily Care';

          return (
            <div key={prod.id} className="sd-legacy-prod-card">
              <div className={`sd-legacy-prod-img ${bgClass}`}>
                <img src={getImageSrc(prod.image)} alt={prod.title} loading="lazy" />
                <span>{tag}</span>
              </div>
              <div className="sd-legacy-prod-body">
                <div className="sd-legacy-prod-name">{prod.title}</div>
                <div className="sd-legacy-prod-sub">{prod.description}</div>
                <ul className="sd-legacy-prod-benefits">
                  {prod.benefits?.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="sd-legacy-prod-footer">
                  <div className="sd-legacy-prod-price">₹{prod.price}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link
                      className="sd-legacy-add-btn outline"
                      to={`/products/${prod.handle}`}
                      prefetch="intent"
                    >
                      View Details
                    </Link>
                    <Link
                      className="sd-legacy-add-btn"
                      to={`/products/${prod.handle}`}
                      prefetch="intent"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sd-legacy-usage-sec">
        <h3>How to Use — Daily Routine</h3>
        <table className="sd-legacy-usage-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Product</th>
              <th>How to Take</th>
              <th>Benefit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🌅 Morning</td>
              <td>Pravahi Kwath</td>
              <td>30ml in warm water, empty stomach</td>
              <td>Detox + fasting sugar balance</td>
            </tr>
            <tr>
              <td>🌞 Before Lunch</td>
              <td>Diabetes Care Capsule</td>
              <td>1 capsule with water</td>
              <td>Prevent post-meal spike</td>
            </tr>
            <tr>
              <td>🌞 Before Dinner</td>
              <td>Diabetes Care Capsule</td>
              <td>1 capsule with water</td>
              <td>Evening sugar control</td>
            </tr>
            <tr>
              <td>🌙 Night</td>
              <td>Sleep Care Capsule</td>
              <td>1 capsule, 30 min before bed</td>
              <td>Deep sleep + stress reduction</td>
            </tr>
          </tbody>
        </table>
      </div>

    </>
  );
}
