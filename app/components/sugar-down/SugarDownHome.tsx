import {Link} from 'react-router';
import {SUPPORT_WHATSAPP_URL} from '~/lib/contact';
import {HomeFaq} from './HomeFaq';
import {HomeReviews} from './HomeReviews';

/**
 * Sugar Down marketing sections ported from legacy-pages/home.page (subset).
 * Styling: app/styles/sugar-down-home.css (copied from legacy-css/home.css).
 */
export function SugarDownHome() {
  return (
    <div className="sd-home-root">
      <section className="hero" id="home">
        <div className="hero-bg-pattern" />
        <div className="hero-grid-lines" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">
              <div className="badge-dot" />
              <span>100% Ayurvedic · No Side Effects</span>
            </div>
            <h1 className="hero-headline">
              <span className="line-break">Stop Managing</span>
              <span className="line-break">Your Sugar.</span>
              <span className="gold">Start Controlling It.</span>
            </h1>
            <p className="hero-sub">
              Most products give you one tablet and leave you alone.
              <br />
              <strong>
                Sugar Down gives you a complete morning-to-night system
              </strong>{' '}
              — backed by Ayurvedic herbs proven for centuries and a team that
              follows up with you every single day.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-num">10+</span>
                <span className="stat-label">Power Herbs</span>
              </div>
              <div className="stat">
                <span className="stat-num">3-Step</span>
                <span className="stat-label">Daily System</span>
              </div>
              <div className="stat">
                <span className="stat-num">24×7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
            <div className="hero-btns">
              <Link to="/products" className="btn-primary" prefetch="intent">
                Order Now
              </Link>
              <a href="#pricing" className="btn-secondary">
                See Our Kits
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-visual-card">
              <div className="floating-badge">
                Most
                <br />
                Recom-
                <br />
                mended
              </div>
              <div
                className="hero-img-placeholder"
                style={{background: 'transparent', border: 'none'}}
              >
                <img
                  src="/hero-kit.png"
                  alt="Sugar Down Balanced Kit"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                  }}
                  height={280}
                  width={400}
                />
              </div>
              <div className="hero-kit-label">Balanced Kit — Best Value</div>
              <div className="hero-kit-name">Complete Day-Night Care</div>
              <div className="hero-kit-items">
                <div className="kit-item">
                  <span className="kit-item-icon">🌅</span>
                  <span className="kit-item-text">
                    Morning — Pravahi Kwath Juice
                  </span>
                </div>
                <div className="kit-item">
                  <span className="kit-item-icon">🌞</span>
                  <span className="kit-item-text">
                    Daytime — Diabetes Care Capsules
                  </span>
                </div>
                <div className="kit-item">
                  <span className="kit-item-icon">🌙</span>
                  <span className="kit-item-text">
                    Night — Sleep Care Capsules
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-item fade-up fade-up-d1">
          <span className="trust-icon">🌿</span>
          <span className="trust-text">100% Natural Herbs</span>
        </div>
        <div className="trust-divider" />
        <div className="trust-item fade-up fade-up-d2">
          <span className="trust-icon">✅</span>
          <span className="trust-text">No Side Effects</span>
        </div>
        <div className="trust-divider" />
        <div className="trust-item fade-up fade-up-d3">
          <span className="trust-icon">🚚</span>
          <span className="trust-text">Free Shipping</span>
        </div>
        <div className="trust-divider" />
        <div className="trust-item fade-up fade-up-d4">
          <span className="trust-icon">💬</span>
          <span className="trust-text">24×7 WhatsApp Support</span>
        </div>
      </div>

      <section className="sd-home-difference">
        <div className="sd-home-difference-inner">
          <div className="sd-home-difference-eyebrow fade-up">
            <span className="sd-home-difference-label">Our Difference</span>
          </div>
          <h2 className="sd-home-difference-title fade-up fade-up-d1">
            There are Thousands of Ayurvedic Brands.
            <br />
            But <span className="accent">SUGAR DOWN Focuses</span> Entirely on
            Diabetes.
          </h2>
          <p className="sd-home-difference-lede fade-up fade-up-d2">
            Most brands sell everything — immunity, hair, skin, joints.{' '}
            <strong style={{color: 'var(--black)'}}>We do one thing.</strong>{' '}
            We have studied, formulated, and built our entire brand around one
            single condition — diabetes.
          </p>
          <div
            className="fade-up fade-up-d3"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: 0,
              maxWidth: '900px',
              margin: '0 auto',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                background: 'var(--white)',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '20px 0 0 20px',
                padding: '32px 28px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--gray)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                Other Brands
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {[
                  'Sell 50+ products — diabetes is just one of many',
                  'One capsule twice a day — that is the whole "system"',
                  'No sleep support — ignores a major cause of high sugar',
                  'You buy, they forget you exist',
                ].map((t) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <span
                      style={{
                        color: '#E85454',
                        fontSize: '15px',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      ✗
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        color: 'var(--gray)',
                        lineHeight: 1.5,
                      }}
                    >
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                background: 'var(--green-dark)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: '18px',
                  fontWeight: 900,
                  color: 'var(--gold)',
                  writingMode: 'vertical-rl',
                  letterSpacing: '6px',
                }}
              >
                VS
              </span>
            </div>
            <div
              style={{
                background: 'var(--green-dark)',
                borderRadius: '0 20px 20px 0',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                Sugar Down
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {[
                  '100% focused on diabetes — nothing else, ever',
                  'Complete 3-step morning, daytime & night system',
                  'Dedicated sleep capsule targeting cortisol & sugar',
                  '24×7 WhatsApp support — real people, real answers',
                ].map((t) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--green-accent)',
                        fontSize: '15px',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.5,
                      }}
                    >
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="care-visual-bridge-section"
        aria-label="Sugar Down care visuals"
      >
        <div className="care-visual-bridge">
          <div className="care-visual-grid">
            <figure className="care-visual-card fade-up fade-up-d1">
              <div className="care-visual-frame">
                <img
                  src="/banner-1.png"
                  alt="Sugar Down Diabetic Care"
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
            <figure className="care-visual-card fade-up fade-up-d2">
              <div className="care-visual-frame">
                <img
                  src="/banner-2.png"
                  alt="Sugar Down family wellness"
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="pain-section">
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <span className="section-tag fade-up">The Hard Truth</span>
          <h2 className="section-title fade-up fade-up-d1" style={{color: 'white'}}>
            Living with Diabetes
            <br />
            Shouldn&apos;t Feel Like This.
          </h2>
          <div className="pain-grid">
            {[
              {
                n: '01',
                t: 'Sugar spikes even after medicine',
                d: 'You take your pills on time. Yet the sugar report still disappoints.',
              },
              {
                n: '02',
                t: 'Exhausted by 2 PM every day',
                d: 'That afternoon crash. No energy to work, play or even talk.',
              },
              {
                n: '03',
                t: 'Sleepless nights worsening sugar',
                d: 'Poor sleep raises cortisol. Cortisol spikes blood sugar.',
              },
              {
                n: '04',
                t: 'Zero guidance on what to eat',
                d: 'Doctors say “eat less sugar.” No meal plan, no follow-up.',
              },
              {
                n: '05',
                t: 'Years on medicines with no end',
                d: 'Allopathic medicines manage. They don’t heal.',
              },
              {
                n: '06',
                t: 'Bought products. Got no support.',
                d: 'You ordered. It arrived. Then — silence.',
              },
            ].map((x, i) => (
              <div
                key={x.n}
                className={`pain-card fade-up fade-up-d${(i % 4) + 1}`}
              >
                <div className="pain-num">{x.n}</div>
                <div className="pain-title">{x.t}</div>
                <div className="pain-desc">{x.d}</div>
              </div>
            ))}
          </div>
          <div className="pain-bridge fade-up">
            <h3>
              Sugar Down was built to <span>fix every single one</span> of
              these.
            </h3>
            <p>
              A complete system. Real support. Natural healing — from morning to
              night.
            </p>
          </div>
        </div>
      </section>

      <section className="section system-section" id="system">
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <span
            className="section-tag centered"
            style={{display: 'block', textAlign: 'center'}}
          >
            How It Works
          </span>
          <h2 className="section-title centered fade-up">
            Your Complete
            <br />
            Day-Night System
          </h2>
          <p className="section-sub centered fade-up">
            Three products. One purpose. Working together with your body every
            hour of the day.
          </p>
          <div className="system-timeline">
            <div className="system-card fade-up fade-up-d1">
              <div className="system-card-header">
                <div className="system-photo-slot">
                  <img
                    src="/pravahi.png"
                    alt="Pravahi Kwath"
                    width={320}
                    height={320}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div className="system-header-info">
                  <span className="system-time-badge">🌅 Morning</span>
                  <div className="system-product-name">Pravahi Kwath</div>
                  <span className="system-price-tag">₹565 / 500ml</span>
                </div>
              </div>
              <div className="system-card-body">
                <span className="system-usage">
                  30ml in warm water · Empty stomach
                </span>
                <ul className="system-benefits">
                  <li>Detoxifies body & liver naturally</li>
                  <li>Balances fasting blood sugar</li>
                  <li>Activates pancreas function</li>
                  <li>Boosts morning energy levels</li>
                </ul>
              </div>
            </div>
            <div className="system-card fade-up fade-up-d2">
              <div className="system-card-header">
                <div className="system-photo-slot">
                  <img
                    src="/care.png"
                    alt="Diabetes Care Capsules"
                    width={320}
                    height={320}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div className="system-header-info">
                  <span className="system-time-badge">🌞 Daytime</span>
                  <div className="system-product-name">
                    Diabetes Care Capsules
                  </div>
                  <span className="system-price-tag">₹745 / 60 caps</span>
                </div>
              </div>
              <div className="system-card-body">
                <span className="system-usage">
                  1 before lunch · 1 before dinner
                </span>
                <ul className="system-benefits">
                  <li>Prevents post-meal sugar spikes</li>
                  <li>Maintains stable energy all day</li>
                  <li>Supports insulin sensitivity</li>
                  <li>Reduces sugar cravings</li>
                </ul>
              </div>
            </div>
            <div className="system-card fade-up fade-up-d3">
              <div className="system-card-header">
                <div className="system-photo-slot">
                  <img
                    src="/sleep.png"
                    alt="Sleep Care Capsules"
                    width={320}
                    height={320}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div className="system-header-info">
                  <span className="system-time-badge">🌙 Night</span>
                  <div className="system-product-name">Sleep Care Capsules</div>
                  <span className="system-price-tag">₹360 / 30 caps</span>
                </div>
              </div>
              <div className="system-card-body">
                <span className="system-usage">
                  1 capsule · 30 mins before bed
                </span>
                <ul className="system-benefits">
                  <li>Promotes deep, restful sleep</li>
                  <li>Reduces stress & cortisol</li>
                  <li>Better sleep = better sugar</li>
                  <li>Calms mind with Ashwagandha</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section section" id="why">
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div className="why-grid">
            <div className="why-visual">
              <div className="why-main-card">
                <div className="why-big-num">4×</div>
                <div className="why-big-label">
                  More effective than single-product approaches
                </div>
                <div className="why-mini-stats">
                  <div className="mini-stat">
                    <span className="mini-stat-n">3</span>
                    <span className="mini-stat-l">
                      Products Working Together
                    </span>
                  </div>
                  <div className="mini-stat">
                    <span className="mini-stat-n">10+</span>
                    <span className="mini-stat-l">Ayurvedic Herbs</span>
                  </div>
                  <div className="mini-stat">
                    <span className="mini-stat-n">24/7</span>
                    <span className="mini-stat-l">Personal Support</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="section-tag">Why Sugar Down</span>
              <h2 className="section-title fade-up">
                We Don&apos;t Just
                <br />
                Sell You a Product.
              </h2>
              <p
                className="section-sub fade-up"
                style={{marginBottom: '32px'}}
              >
                We stay with you through the entire journey — from your first
                capsule to your best sugar report ever.
              </p>
              <div className="why-list">
                <div className="why-item fade-up fade-up-d1">
                  <div className="why-item-icon">🕐</div>
                  <div>
                    <div className="why-item-title">
                      Full Day Coverage — Morning to Night
                    </div>
                    <div className="why-item-desc">
                      Most brands give you one product. We give you a complete
                      3-step system that works with your body every single hour.
                    </div>
                  </div>
                </div>
                <div className="why-item fade-up fade-up-d2">
                  <div className="why-item-icon">📞</div>
                  <div>
                    <div className="why-item-title">
                      Daily Follow-ups — Every Day
                    </div>
                    <div className="why-item-desc">
                      Our team personally checks in with you every day.
                      You&apos;re never left wondering if it&apos;s working.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ingr-section section" id="ingredients">
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div className="sd-section-intro">
            <span
              className="section-tag"
              style={{display: 'block', textAlign: 'center'}}
            >
              What&apos;s Inside
            </span>
            <h2 className="section-title centered fade-up">
              Nature&apos;s Most Powerful
              <br />
              Diabetes Fighters
            </h2>
            <p className="section-sub centered fade-up">
              Used for centuries. Formulated by experts for modern diabetes care.
            </p>
          </div>
          <div className="ingr-grid">
            {[
              {
                e: '🫐',
                n: 'Jamun',
                b: 'Controls blood sugar & improves insulin response naturally',
                t: 'Blood Sugar',
                d: 'fade-up-d1',
              },
              {
                e: '🌱',
                n: 'Karela',
                b: 'Reduces glucose absorption from food you eat',
                t: 'Glucose Control',
                d: 'fade-up-d2',
              },
              {
                e: '🪴',
                n: 'Gurmar',
                b: '"Sugar Destroyer" — eliminates sugar cravings at the root',
                t: 'Cravings',
                d: 'fade-up-d3',
              },
              {
                e: '🌾',
                n: 'Methi',
                b: 'Slows sugar absorption & supports cholesterol balance',
                t: 'Absorption',
                d: 'fade-up-d4',
              },
              {
                e: '🍃',
                n: 'Giloy',
                b: 'Boosts immunity & dramatically improves insulin sensitivity',
                t: 'Immunity',
                d: 'fade-up-d1',
              },
              {
                e: '🍈',
                n: 'Amla',
                b: 'Rich in Vitamin C — improves metabolism & cell health',
                t: 'Antioxidant',
                d: 'fade-up-d2',
              },
              {
                e: '🌿',
                n: 'Ashwagandha',
                b: 'Reduces cortisol & stress — hidden cause of sugar spikes',
                t: 'Stress',
                d: 'fade-up-d3',
              },
              {
                e: '🌼',
                n: 'Brahmi',
                b: 'Mental clarity, calm mind & deep restful sleep',
                t: 'Sleep & Mind',
                d: 'fade-up-d4',
              },
            ].map((x) => (
              <div key={x.n} className={`ingr-card fade-up ${x.d}`}>
                <span className="ingr-emoji">{x.e}</span>
                <div className="ingr-name">{x.n}</div>
                <div className="ingr-benefit">{x.b}</div>
                <span className="ingr-tag">{x.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-section section" id="pricing">
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div className="sd-section-intro">
            <span
              className="section-tag"
              style={{display: 'block', textAlign: 'center'}}
            >
              Choose Your Kit
            </span>
            <h2 className="section-title centered fade-up">
              Two Kits. One Purpose.
              <br />
              Complete Diabetes Care.
            </h2>
            <p className="section-sub centered fade-up">
              Both kits include 5% discount, free shipping & full support. No
              hidden charges.
            </p>
          </div>
          <div
            className="fade-up"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              margin: '40px 0 0',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(27,77,46,0.1)',
                background: 'var(--green-light)',
                aspectRatio: '3/2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <img
                src="/core-kit.png"
                alt="Sugar Down Core Kit"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'var(--green-dark)',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px',
                }}
              >
                CORE KIT
              </span>
            </div>
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(27,77,46,0.1)',
                background: 'var(--green-light)',
                aspectRatio: '3/2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <img
                src="/balanced-kit.png"
                alt="Sugar Down Balanced Kit"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'var(--gold)',
                  color: '#000',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px',
                }}
              >
                ⭐ BALANCED KIT
              </span>
            </div>
          </div>
          <div className="pricing-grid" style={{marginTop: '32px'}}>
            <div className="pricing-card fade-up fade-up-d1">
              <div className="pricing-header">
                <div className="pricing-kit-label">Sugar Down</div>
                <div className="pricing-kit-name">Core Kit</div>
                <div className="pricing-amount">
                  <span className="pricing-currency">₹</span>
                  <span className="pricing-number">1,310</span>
                </div>
                <div className="pricing-perday">
                  Just <span>₹44/day</span> for morning + daytime care
                </div>
              </div>
              <div className="pricing-body">
                <ul className="pricing-items">
                  <li>
                    <span className="check">✓</span> Pravahi Kwath (500ml)
                  </li>
                  <li>
                    <span className="check">✓</span> Diabetes Care Capsules
                    (60)
                  </li>
                  <li>
                    <span className="check">✓</span> 24×7 WhatsApp Support
                  </li>
                  <li>
                    <span className="check">✓</span> Daily Follow-ups
                  </li>
                  <li>
                    <span className="cross">✗</span>{' '}
                    <span style={{opacity: 0.4}}>Sleep Care Capsules</span>
                  </li>
                </ul>
                <div className="pricing-offers">
                  <span className="offer-pill">5% Off</span>
                  <span className="offer-pill">Free Shipping</span>
                </div>
                <Link to="/products" className="pricing-btn outline">
                  Order Core Kit →
                </Link>
              </div>
            </div>
            <div className="pricing-card featured fade-up fade-up-d2">
              <div className="featured-badge">⭐ Most Recommended</div>
              <div className="pricing-header">
                <div className="pricing-kit-label">Sugar Down</div>
                <div className="pricing-kit-name">Balanced Kit</div>
                <div className="pricing-amount">
                  <span className="pricing-currency">₹</span>
                  <span className="pricing-number">1,670</span>
                </div>
                <div className="pricing-perday">
                  Just <span>₹55/day</span> for complete day-night care
                </div>
              </div>
              <div className="pricing-body">
                <ul className="pricing-items">
                  <li>
                    <span className="check">✓</span> Pravahi Kwath (500ml)
                  </li>
                  <li>
                    <span className="check">✓</span> Diabetes Care Capsules
                    (60)
                  </li>
                  <li>
                    <span className="check">✓</span> Sleep Care Capsules (30)
                  </li>
                  <li>
                    <span className="check">✓</span> 24×7 WhatsApp Support
                  </li>
                  <li>
                    <span className="check">✓</span> Daily Follow-ups
                  </li>
                </ul>
                <div className="pricing-offers">
                  <span className="offer-pill">5% Off</span>
                  <span className="offer-pill">Free Shipping</span>
                  <span className="offer-pill">Best Value</span>
                </div>
                <Link to="/products" className="pricing-btn solid">
                  Order Balanced Kit →
                </Link>
              </div>
            </div>
          </div>
          <p className="pricing-note">
            💚 <strong>Every order</strong> includes personal daily follow-up &
            24×7 WhatsApp access — for the entire month.
          </p>
        </div>
      </section>

      <HomeReviews />

      <section className="support-section section" id="support">
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <span className="section-tag" style={{display: 'block', textAlign: 'center'}}>
            Full Support System
          </span>
          <h2 className="section-title centered fade-up">
            You&apos;re Never
            <br />
            On Your Own
          </h2>
          <p className="section-sub centered fade-up">
            Every customer gets a complete support system — not just a kit.
          </p>
          <div
            className="support-grid"
            style={{
              gridTemplateColumns: '1fr 1fr',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <div className="support-card fade-up fade-up-d1">
              <div className="support-icon-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="support-title">24×7 WhatsApp</div>
              <div className="support-desc">
                Message us anytime — day or night. Real humans, real answers.
                Always.
              </div>
            </div>
            <div className="support-card fade-up fade-up-d2">
              <div className="support-icon-wrap">📞</div>
              <div className="support-title">Daily Follow-ups</div>
              <div className="support-desc">
                We call and check in every day to track your progress and keep
                you consistent.
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeFaq />

      <section className="cta-section">
        <div className="urgency-bar fade-up">
          <span className="urgency-dot" />
          Limited stock available — order before it runs out
        </div>
        <div className="cta-eyebrow fade-up fade-up-d1">Start Your Journey Today</div>
        <h2 className="cta-headline fade-up fade-up-d2">
          Your Sugar. Your Control.
          <br />
          <span>Starting Right Now.</span>
        </h2>
        <p className="cta-sub fade-up fade-up-d3">
          Every day you wait is another day diabetes controls you. One kit.
          One month. One decision that changes everything.
        </p>
        <div className="cta-btns fade-up fade-up-d4">
          <Link to="/products" className="btn-primary">
            🛒 Order Now — Free Shipping
          </Link>
          <a
            href={SUPPORT_WHATSAPP_URL}
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp Us First
          </a>
        </div>
      </section>
    </div>
  );
}
