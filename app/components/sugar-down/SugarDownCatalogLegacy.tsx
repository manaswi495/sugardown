import {Link} from 'react-router';
import coreKitImage from '../../../3.png';
import balancedKitImage from '../../../2.png';
import pravahiImage from '../../../pravahi.png';
import careImage from '../../../care.png';
import sleepImage from '../../../sleep.png';

/**
 * Legacy products.page marketing (kits, individuals, usage) above the live Shopify grid.
 */
export function SugarDownCatalogLegacy() {
  return (
    <>
      <div className="sd-legacy-intro">
        <h2>Start With a Kit — Save More</h2>
        <p>
          Kits are designed for maximum results and give you better value than
          individual products.
        </p>
      </div>

      <div className="sd-legacy-kits">
        <div className="sd-legacy-kit-card sd-legacy-kit-card--core">
          <div className="sd-legacy-kit-header">
            <div className="sd-legacy-kit-hero">
              <img src={coreKitImage} alt="Core Kit products" loading="lazy" />
            </div>
            <div className="sd-legacy-kit-name">Core Kit</div>
            <div className="sd-legacy-kit-sub">Morning + Daytime Care</div>
            <div className="sd-legacy-kit-price-row">
              <span className="sd-legacy-kit-price">₹1,310</span>
            </div>
            <div className="sd-legacy-kit-perday">Just ₹44/day · 5% Discount Applied</div>
          </div>
          <div className="sd-legacy-kit-body">
            <div className="sd-legacy-kit-includes">
              <h4>What&apos;s Included</h4>
              <div className="sd-legacy-kit-item">
                <span className="check">✓</span> Pravahi Kwath (500ml)
              </div>
              <div className="sd-legacy-kit-item">
                <span className="check">✓</span> Diabetes Care Capsules (60)
              </div>
              <div className="sd-legacy-kit-item">
                <span className="check">✓</span> 24×7 WhatsApp Support
              </div>
              <div className="sd-legacy-kit-item">
                <span className="check">✓</span> Daily Follow-ups
              </div>
              <div className="sd-legacy-kit-item">
                <span className="cross">✗</span>{' '}
                <span style={{opacity: 0.35}}>Sleep Care Capsules</span>
              </div>
            </div>
            <div className="sd-legacy-kit-perks">
              <span className="sd-legacy-kit-perk">5% Off</span>
              <span className="sd-legacy-kit-perk">Free Shipping</span>
            </div>
            <Link
              className="sd-legacy-kit-btn solid"
              to="/products/core-kit"
              prefetch="intent"
            >
              Buy Now
            </Link>
          </div>
        </div>

        <div className="sd-legacy-kit-card featured">
          <div className="sd-legacy-kit-featured-badge">⭐ Most Recommended</div>
          <div className="sd-legacy-kit-header">
            <div className="sd-legacy-kit-hero">
              <img src={balancedKitImage} alt="Balanced Kit products" loading="lazy" />
            </div>
            <div className="sd-legacy-kit-name">Balanced Kit</div>
            <div className="sd-legacy-kit-sub">Morning + Daytime + Night Care</div>
            <div className="sd-legacy-kit-price-row">
              <span className="sd-legacy-kit-price">₹1,670</span>
            </div>
            <div className="sd-legacy-kit-perday">
              Just ₹55/day · Best Value · 5% Discount
            </div>
          </div>
          <div className="sd-legacy-kit-body">
            <div className="sd-legacy-kit-includes">
              <h4>What&apos;s Included</h4>
              <div className="sd-legacy-kit-item">
                <span className="check">✓</span> Pravahi Kwath (500ml)
              </div>
              <div className="sd-legacy-kit-item">
                <span className="check">✓</span> Diabetes Care Capsules (60)
              </div>
              <div className="sd-legacy-kit-item">
                <span className="check">✓</span> Sleep Care Capsules (30)
              </div>
              <div className="sd-legacy-kit-item">
                <span className="check">✓</span> 24×7 WhatsApp Support
              </div>
              <div className="sd-legacy-kit-item">
                <span className="check">✓</span> Daily Follow-ups
              </div>
            </div>
            <div className="sd-legacy-kit-perks">
              <span className="sd-legacy-kit-perk">5% Off</span>
              <span className="sd-legacy-kit-perk">Free Shipping</span>
              <span className="sd-legacy-kit-perk">Best Value</span>
            </div>
            <Link
              className="sd-legacy-kit-btn solid"
              to="/products/balanced-kit"
              prefetch="intent"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      <div className="sd-legacy-ind-title">Or Buy Individual Products</div>
      <div className="sd-legacy-ind-sub">
        Mix and match based on your needs. Add multiple quantities.
      </div>
      <div className="sd-legacy-products">
        <div className="sd-legacy-prod-card">
          <div className="sd-legacy-prod-img p1">
            <img src={pravahiImage} alt="Pravahi Kwath product" loading="lazy" />
            <span>Morning Care</span>
          </div>
          <div className="sd-legacy-prod-body">
            <div className="sd-legacy-prod-name">Pravahi Kwath</div>
            <div className="sd-legacy-prod-sub">500ml Ayurvedic Herbal Juice</div>
            <ul className="sd-legacy-prod-benefits">
              <li>Detoxifies body on empty stomach</li>
              <li>Balances fasting blood sugar</li>
              <li>Activates pancreas naturally</li>
            </ul>
            <div className="sd-legacy-prod-footer">
              <div className="sd-legacy-prod-price">₹565</div>
              <Link
                className="sd-legacy-add-btn"
                to="/products/pravahi-kwath"
                prefetch="intent"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div className="sd-legacy-prod-card">
          <div className="sd-legacy-prod-img p2">
            <img src={careImage} alt="Diabetes Care Capsules product" loading="lazy" />
            <span>Daytime Care</span>
          </div>
          <div className="sd-legacy-prod-body">
            <div className="sd-legacy-prod-name">Diabetes Care Capsules</div>
            <div className="sd-legacy-prod-sub">60 Ayurvedic Capsules</div>
            <ul className="sd-legacy-prod-benefits">
              <li>Prevents post-meal sugar spikes</li>
              <li>Maintains energy all day</li>
              <li>Reduces sugar cravings</li>
            </ul>
            <div className="sd-legacy-prod-footer">
              <div className="sd-legacy-prod-price">₹745</div>
              <Link
                className="sd-legacy-add-btn"
                to="/products/diabetes-care-capsules"
                prefetch="intent"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div className="sd-legacy-prod-card">
          <div className="sd-legacy-prod-img p3">
            <img src={sleepImage} alt="Sleep Care Capsules product" loading="lazy" />
            <span>Night Care</span>
          </div>
          <div className="sd-legacy-prod-body">
            <div className="sd-legacy-prod-name">Sleep Care Capsules</div>
            <div className="sd-legacy-prod-sub">30 Ayurvedic Capsules</div>
            <ul className="sd-legacy-prod-benefits">
              <li>Promotes deep restful sleep</li>
              <li>Reduces stress &amp; cortisol</li>
              <li>Better sleep = better sugar</li>
            </ul>
            <div className="sd-legacy-prod-footer">
              <div className="sd-legacy-prod-price">₹360</div>
              <Link
                className="sd-legacy-add-btn"
                to="/products/sleep-care-capsules"
                prefetch="intent"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
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
