import { Link } from 'react-router';
import { useState } from 'react';
import { useLocalCart } from '../../context/CartContext';
import { useAside } from '../Aside';
import { localProducts } from '../../lib/products';

export function CompleteKitCard() {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useLocalCart();
  const { open } = useAside();
  const product = localProducts.find((p: any) => p.handle === 'balanced-kit');

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product) {
      addItem(product);
      open('cart');
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        paddingTop: '24px', 
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
      }}
    >
      {/* Premium Floating Badge */}
      <div style={{
        position: 'absolute',
        top: '6px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg, #F5A623 0%, #F76B1C 100%)',
        color: '#ffffff',
        fontWeight: '800',
        padding: '8px 24px',
        borderRadius: '30px',
        fontSize: '13px',
        letterSpacing: '2px',
        zIndex: 2,
        boxShadow: '0 8px 20px rgba(245, 166, 35, 0.4)',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        border: '1px solid rgba(255,255,255,0.4)'
      }}>
        Highly Recommended
      </div>

      {/* Card Body */}
      <div style={{
        border: '1px solid rgba(27, 77, 46, 0.1)',
        borderRadius: '24px',
        backgroundColor: '#ffffff',
        position: 'relative',
        boxShadow: isHovered ? '0 40px 80px rgba(27, 77, 46, 0.12)' : '0 20px 40px rgba(27, 77, 46, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        overflow: 'hidden',
        transition: 'box-shadow 0.4s ease'
      }}>
        {/* Elegant Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1B4D2E 0%, #0F331D 100%)',
          padding: '32px 20px 24px',
          textAlign: 'center',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle overlay pattern */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '12px', letterSpacing: '4px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)', fontWeight: '600', textTransform: 'uppercase' }}>
              Sugar Down System
            </div>
            <div style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px' }}>
              COMPLETE KIT
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div style={{ padding: '36px 30px 10px', flex: '1' }}>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0,
            fontSize: '16px',
            color: '#334155',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            {[
              'Pravahi Kwath (Liquid Blend)',
              'Diabetes Care Capsule',
              'Sleep Care Capsule'
            ].map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E8F5EA 0%, #C6F6D5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(56, 161, 105, 0.15)'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#2F855A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ paddingTop: '2px', color: '#1e293b' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Premium Product Image Showcase */}
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          aspectRatio: '1 / 1', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Glowing backdrop */}
          <div style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(56, 161, 105, 0.15) 0%, rgba(255,255,255,0) 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }} />

          <img 
            src="/balanced-kit.png" 
            alt="Balanced Kit" 
            style={{ 
              position: 'relative',
              zIndex: 1,
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.1))',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }} 
          />
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px', 
          padding: '0 24px 32px',
          alignItems: 'center',
          marginTop: 'auto'
        }}>
          <Link to="/products/balanced-kit" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: '1.5px solid #CBD5E1',
            borderRadius: '100px',
            padding: '14px 20px',
            textDecoration: 'none',
            color: '#475569',
            fontWeight: '700',
            fontSize: '13px',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            flex: '1',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1B4D2E';
            e.currentTarget.style.color = '#1B4D2E';
            e.currentTarget.style.backgroundColor = '#F8FAFC';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#CBD5E1';
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}>
            LEARN MORE
          </Link>

          <button onClick={handleBuyNow} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #1B4D2E 0%, #143A22 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '100px',
            padding: '14px 28px',
            fontWeight: '700',
            fontSize: '14px',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(27, 77, 46, 0.3)',
            flex: '1.2',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(27, 77, 46, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(27, 77, 46, 0.3)';
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
