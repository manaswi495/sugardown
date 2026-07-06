import {Link} from 'react-router';
import {useEffect, useState} from 'react';
import {SUPPORT_WHATSAPP_URL} from '~/lib/contact';
import {HomePainStack} from './HomePainStack';
import {CompleteKitCard} from './CompleteKitCard';
import {CoreKitCard} from './CoreKitCard';
import {BetterCycle} from './BetterCycle';
import {HomeReviews} from './HomeReviews';
import {SugarDownSpecial} from './SugarDownSpecial';
import familyLandscapeImage from '../../../f99d0750-43b2-4397-b96b-2bbba0f11c65.jpg';

/**
 * Sugar Down marketing sections ported from legacy-pages/home.page (subset).
 * Styling: app/styles/sugar-down-home.css (copied from legacy-css/home.css).
 */
export function SugarDownHome() {
  const careVisualSlides = [
    {
      src: '/banner-2.png',
      alt: 'Sugar Down family wellness',
      imageStyle: {objectFit: 'contain' as const, objectPosition: 'center center'},
    }
  ];
  const [activeCareVisualSlide, setActiveCareVisualSlide] = useState(0);
  // Dummy video — replace this URL with your real video later
  const homepageVideoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveCareVisualSlide((prev) => (prev + 1) % careVisualSlides.length);
    }, 2000);

    return () => {
      window.clearInterval(timer);
    };
  }, [careVisualSlides.length]);

  return (
    <div className="sd-home-root">
      <section 
        className="hero" 
        id="home" 
        style={{
          padding: 0, 
          overflow: 'hidden',
          width: '100%',
          height: 'calc(100vh - 125px)',
          minHeight: '550px',
          maxHeight: '1200px',
          position: 'relative',
        }}
      >
        <img
          src={familyLandscapeImage}
          alt="Sugar Down Hero"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'top center', // Keep the family faces in view
          }}
        />

        {/* Smooth gradient overlay to mask the baked text and transition to our custom text block */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '55%', // Reduced height so it doesn't darken the family at all
          background: 'linear-gradient(to bottom, rgba(46, 73, 48, 0) 0%, rgba(46, 73, 48, 0.9) 30%, #2e4930 45%, #2e4930 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          textAlign: 'center',
          paddingBottom: '80px',
          zIndex: 10
        }}>
          {/* Main callout box */}
          <div style={{
            backgroundColor: '#5d9f37',
            padding: '12px 24px',
            borderRadius: '16px', 
            marginBottom: '24px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            maxWidth: '95%',
            width: 'fit-content'
          }}>
            <h2 style={{ 
              margin: 0, 
              color: 'white',
              lineHeight: '1.2',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              flexWrap: 'wrap', // Allows wrap on extremely small phones, but single line on most
              gap: '8px',
            }}>
              <span style={{ fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: '700' }}>
                Smarter Sugar Control
              </span>
              <span style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>
                ...STARTS HERE
              </span>
            </h2>
          </div>
          
          <div style={{ padding: '0 20px', maxWidth: '700px', color: 'white' }}>
            <p style={{ 
              fontSize: 'clamp(20px, 3vw, 26px)', 
              fontStyle: 'italic', 
              marginBottom: '35px', 
              fontWeight: '400',
              lineHeight: '1.5',
              color: 'rgba(255,255,255,0.9)'
            }}>
              "India's exclusive ayurvedic brand<br/>dedicated to diabetic care."
            </p>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              borderBottom: '2px solid #f9de4b',
              paddingBottom: '8px',
              fontSize: 'clamp(14px, 2vw, 18px)',
              letterSpacing: '2px',
              color: '#f9de4b',
              fontWeight: '700',
              textTransform: 'uppercase',
            }}>
              SHINE AGAIN WITH SUGAR DOWN
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#f9de4b"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Infinite Scrolling Marquee inside Hero */}
        <div aria-label="Key Benefits Marquee" style={{
          overflow: 'hidden',
          background: 'linear-gradient(90deg, #0a4f1a 0%, #15732d 50%, #0a4f1a 100%)',
          color: '#f9de4b',
          padding: '16px 0',
          display: 'flex',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 20,
          borderTop: '2px solid rgba(255,255,255,0.1)',
          borderBottom: 'none'
        }}>
          <style>{`
            @keyframes scroll-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .sd-marquee-track {
              display: inline-flex;
              animation: scroll-marquee 25s linear infinite;
            }
            .sd-marquee-item {
              font-size: clamp(14px, 2vw, 18px);
              font-weight: 700;
              letter-spacing: 2px;
              text-transform: uppercase;
              padding: 0 30px;
              display: inline-flex;
              align-items: center;
              gap: 30px;
            }
            .sd-marquee-item::after {
              content: "✦";
              color: #fff;
              opacity: 0.5;
              font-size: 14px;
            }
          `}</style>
          <div className="sd-marquee-track">
            {/* First Set */}
            <span className="sd-marquee-item">100% Ayurvedic Formula</span>
            <span className="sd-marquee-item">Clinically Proven</span>
            <span className="sd-marquee-item">No Side Effects</span>
            <span className="sd-marquee-item">Natural Sugar Control</span>
            
            {/* Duplicate for seamless infinite scrolling */}
            <span className="sd-marquee-item">100% Ayurvedic Formula</span>
            <span className="sd-marquee-item">Clinically Proven</span>
            <span className="sd-marquee-item">No Side Effects</span>
            <span className="sd-marquee-item">Natural Sugar Control</span>
          </div>
        </div>
      </section>

      <section
        className="care-visual-bridge-section"
        aria-label="Sugar Down care visuals"
      >
        <div className="care-visual-bridge">
          <div className="care-visual-grid">
            <div className="care-visual-stack fade-up fade-up-d1">
              {careVisualSlides.map((slide, index) => (
                <figure
                  key={slide.src}
                  className={`care-visual-card ${index === activeCareVisualSlide ? 'is-active' : ''}`}
                >
                  <div className="care-visual-frame">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      width={640}
                      height={480}
                      loading="lazy"
                      decoding="async"
                      style={slide.imageStyle}
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{
        backgroundColor: '#e8f5ea',
        padding: '60px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Left Image */}
        <img 
          src="/leaves-left.png" 
          alt="Ayurvedic Leaves" 
          style={{
            position: 'absolute',
            left: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '250px',
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.8
          }}
        />

        {/* Decorative Right Image */}
        <img 
          src="/herbs-right.png" 
          alt="Ayurvedic Herbs" 
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '250px',
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.8
          }}
        />

        <div style={{ 
          position: 'relative', 
          zIndex: 2,
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        }}>
          <h3 style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: '600',
            letterSpacing: '1px',
            color: '#1a1a1a',
            margin: 0,
            textTransform: 'uppercase',
            lineHeight: '1.4'
          }}>
            Unlock the power of Ayurveda for a healthier you
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              backgroundColor: '#7fbd59',
              padding: '12px 40px',
              color: '#fff',
              fontWeight: '700',
              fontSize: '16px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              borderRadius: '30px',
              boxShadow: '0 4px 15px rgba(127, 189, 89, 0.4)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              Healing
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#255527'
            }}>
              +
            </div>
            <div style={{
              backgroundColor: '#7fbd59',
              padding: '12px 40px',
              color: '#fff',
              fontWeight: '700',
              fontSize: '16px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              borderRadius: '30px',
              boxShadow: '0 4px 15px rgba(127, 189, 89, 0.4)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              Balancing
            </div>
          </div>
        </div>
      </section>

      <section style={{
        backgroundColor: '#ffffff',
        padding: '30px 20px 50px 20px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          justifyItems: 'center'
        }}>
          {/* Badge 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e8f5ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#255527" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1a1a1a', fontSize: '20px', fontWeight: '700' }}>100% Natural</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '15px', lineHeight: '1.4' }}>No toxins, no fillers</p>
            </div>
          </div>
          {/* Badge 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e8f5ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#255527" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1a1a1a', fontSize: '20px', fontWeight: '700' }}>Free Shipping</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '15px', lineHeight: '1.4' }}>On Both Kits</p>
            </div>
          </div>
          {/* Badge 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e8f5ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#255527" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1a1a1a', fontSize: '20px', fontWeight: '700' }}>Ayush Certified</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '15px', lineHeight: '1.4' }}>Govt. recognised</p>
            </div>
          </div>
          {/* Badge 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e8f5ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#255527" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1a1a1a', fontSize: '20px', fontWeight: '700' }}>WHO-GMP</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '15px', lineHeight: '1.4' }}>Quality assured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section — only shown when a video URL is set in Admin > Settings */}
      {homepageVideoUrl && (
        <section style={{
          backgroundColor: '#0f1a13',
          padding: '60px 20px',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: '#7fbd59', fontWeight: '700' }}>
            See It In Action
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', color: '#fff', fontWeight: '800', margin: '12px 0 32px' }}>
            Watch How Sugar Down Works
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', aspectRatio: '16/9' }}>
            {homepageVideoUrl.includes('youtube.com') || homepageVideoUrl.includes('youtu.be') ? (
              <iframe
                src={homepageVideoUrl.includes('embed') ? homepageVideoUrl : homepageVideoUrl.replace('watch?v=', 'embed/')}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Sugar Down Video"
              />
            ) : (
              <video
                src={homepageVideoUrl}
                controls
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
        </section>
      )}

      {/* Complete & Core Kit Cards */}
      <section style={{ 
        backgroundColor: '#f9fbf9', 
        padding: '60px 20px', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '40px', 
        flexWrap: 'wrap' 
      }}>
        <CompleteKitCard />
        <CoreKitCard />
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
                  <span className="system-time-badge">🌅 Before Breakfast</span>
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
                    alt="Diabetic Care Capsules"
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
                  <span className="system-time-badge">🌞 Before Lunch & Dinner</span>
                  <div className="system-product-name">
                    Diabetic Care Capsules
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
                  <span className="system-time-badge">🌙 Before Sleep</span>
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




      <SugarDownSpecial />

      <BetterCycle />
      <HomeReviews />

    </div>
  );
}
