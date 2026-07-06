import React from 'react';

export function BetterCycle() {
  return (
    <section style={{
      backgroundColor: '#0F291E',
      padding: '80px 20px 100px',
      color: '#ffffff',
      fontFamily: '"Inter", sans-serif',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        maxWidth: '600px',
        maxHeight: '600px',
        background: 'radial-gradient(circle, rgba(56, 161, 105, 0.15) 0%, rgba(15, 41, 30, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ zIndex: 1, textAlign: 'center', marginBottom: '60px', maxWidth: '600px' }}>
        <h2 style={{ 
          fontSize: '42px', 
          fontWeight: '700', 
          letterSpacing: '-1px', 
          marginBottom: '16px',
        }}>
          The Cycle of Healing
        </h2>
        <p style={{ fontSize: '18px', color: '#A0AEC0', lineHeight: '1.6' }}>
          True Ayurvedic care doesn't just manage numbers—it transforms your entire well-being through continuous, natural harmony, backed by 30+ years of expertise.
        </p>
      </div>

      <div className="cycle-container" style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateAreas: `
          ". top ."
          "left center right"
          ". bottom ."
        `,
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto'
      }}>
        
        {/* SVG Connectors for Desktop */}
        <svg 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, opacity: 0.4 }}
        >
          {/* Animated dashed circle connecting the items */}
          <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#38A169" strokeWidth="2" strokeDasharray="10,15" className="cycle-ring" style={{ transformOrigin: '50% 50%' }} />
        </svg>

        {/* Center Element */}
        <div style={{ gridArea: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="center-pulse" style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38A169 0%, #1B4D2E 100%)',
            boxShadow: '0 0 40px rgba(56, 161, 105, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px',
            border: '2px solid rgba(56, 161, 105, 0.6)'
          }}>
            <span style={{ fontSize: '24px', letterSpacing: '1px' }}>SUGAR</span>
            <span style={{ fontSize: '24px', letterSpacing: '1px' }}>DOWN</span>
          </div>
        </div>

        {/* Items */}
        <CycleCard area="top" title="Better Control" icon="🎯" desc="Stabilize your blood sugar naturally." delay="0s" />
        <CycleCard area="right" title="Better Balance" icon="⚖️" desc="Restore harmony to your body's systems." delay="0.5s" />
        <CycleCard area="bottom" title="Better Life" icon="🌱" desc="Enjoy sustained energy and vitality." delay="1s" />
        <CycleCard area="left" title="Better Happiness" icon="✨" desc="Live free from constant worry and stress." delay="1.5s" />

      </div>

      <style>{`
        @keyframes spinCycle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 30px rgba(56, 161, 105, 0.3); transform: scale(1); }
          50% { box-shadow: 0 0 60px rgba(56, 161, 105, 0.8); transform: scale(1.05); }
          100% { box-shadow: 0 0 30px rgba(56, 161, 105, 0.3); transform: scale(1); }
        }
        @keyframes floatingCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .cycle-ring {
          animation: spinCycle 40s linear infinite;
        }

        .center-pulse {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .cycle-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: floatingCard 6s ease-in-out infinite;
        }
        
        .cycle-card:hover {
          animation-play-state: paused;
          transform: translateY(-12px) scale(1.03) !important;
          box-shadow: 0 20px 40px rgba(56, 161, 105, 0.3) !important;
          border-color: rgba(56, 161, 105, 0.5) !important;
          background-color: rgba(255, 255, 255, 0.08) !important;
        }

        @media (max-width: 768px) {
          .cycle-container {
            grid-template-areas: 
              "top"
              "right"
              "bottom"
              "left" !important;
            gap: 24px !important;
          }
          .cycle-container > svg {
            display: none;
          }
          .cycle-container > div[style*="gridArea: 'center'"] {
            display: none !important;
          }
          .cycle-card {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function CycleCard({ area, title, icon, desc, delay }: { area: string, title: string, icon: string, desc: string, delay: string }) {
  return (
    <div className="cycle-card" style={{
      gridArea: area,
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '28px 24px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '260px',
      margin: '0 auto',
      animationDelay: delay
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(56, 161, 105, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        marginBottom: '20px',
        border: '1px solid rgba(56, 161, 105, 0.3)',
        boxShadow: 'inset 0 0 15px rgba(56, 161, 105, 0.1)'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px', color: '#fff', letterSpacing: '0.5px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '15px', color: '#A0AEC0', lineHeight: '1.6', margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}
