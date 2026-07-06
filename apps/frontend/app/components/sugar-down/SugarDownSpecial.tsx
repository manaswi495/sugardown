import React from 'react';

export function SugarDownSpecial() {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #F0FDF4 100%)',
      padding: '60px 20px',
      color: '#1A202C',
      fontFamily: '"Inter", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        
        <h2 style={{ 
          fontSize: 'clamp(32px, 5vw, 46px)', 
          fontWeight: '800', 
          letterSpacing: '-1px', 
          marginBottom: '20px',
          color: '#1B4D2E',
          lineHeight: '1.2'
        }}>
          What makes <span style={{ color: '#38A169' }}>SUGAR DOWN</span> Special?
        </h2>
        <p style={{ fontSize: '18px', color: '#718096', maxWidth: '600px', margin: '0 auto 50px' }}>
          An integrated Ayurvedic approach designed to address the root causes of imbalances.
        </p>

        {/* Section 1: Balances */}
        <div style={{ marginBottom: '60px', animation: 'fadeUp 0.8s ease-out forwards' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '30px' }}>
            <div className="premium-badge">
              SUGAR DOWN
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#1A202C', margin: 0, letterSpacing: '-0.5px' }}>Balances</h3>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '30px'
          }}>
            <BalanceItem icon="🩺" title="LIVER" delay="0s" />
            <BalanceItem icon="😴" title="SLEEP" delay="0.1s" />
            <BalanceItem icon="🧘‍♂️" title="STRESS" delay="0.2s" />
            <BalanceItem icon="🌿" title="DIGESTION" delay="0.3s" />
            <BalanceItem icon="🔥" title="METABOLISM" delay="0.4s" />
          </div>
        </div>

        <div style={{ 
          height: '2px', 
          background: 'linear-gradient(90deg, transparent, rgba(56, 161, 105, 0.2), transparent)', 
          width: '80%', 
          margin: '0 auto 60px' 
        }} />

        {/* Section 2: Works as a system */}
        <div style={{ animation: 'fadeUp 0.8s ease-out 0.3s forwards', opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
            <div className="premium-badge">
              SUGAR DOWN
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#1A202C', margin: 0, letterSpacing: '-0.5px' }}>Works as a system</h3>
          </div>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#4A5568',
            maxWidth: '700px',
            margin: '0 auto 40px',
            fontWeight: '500'
          }}>
            Begins with a morning cleansing formulation,<br className="desktop-only" /> 
            continues with convenient daytime support<br className="desktop-only" /> 
            and completes the cycle with a night blend for rest and recovery.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            flexWrap: 'wrap',
            position: 'relative',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {/* Connecting line for desktop */}
            <div className="connecting-line desktop-only" />
            
            <SystemStep icon={<SunriseIcon />} title="(MORNING)" delay="0.4s" />
            <SystemStep icon={<SunIcon />} title="(DAY)" delay="0.6s" />
            <SystemStep icon={<MoonIcon />} title="(NIGHT)" delay="0.8s" />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none; }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .premium-badge {
          background: linear-gradient(135deg, #1B4D2E 0%, #2F855A 100%);
          color: #ffffff;
          padding: 8px 20px;
          border-radius: 30px;
          font-family: var(--sd-font-logo);
          font-size: 20px;
          letter-spacing: 1px;
          box-shadow: 0 8px 16px rgba(27, 77, 46, 0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .balance-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: fadeUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .balance-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 40px rgba(56, 161, 105, 0.15);
          border-color: rgba(56, 161, 105, 0.3) !important;
        }
        
        .connecting-line {
          position: absolute;
          top: 55px; /* Center of the 110px circle */
          left: 10%;
          right: 10%;
          height: 2px;
          background: repeating-linear-gradient(90deg, #38A169, #38A169 8px, transparent 8px, transparent 16px);
          z-index: 1;
          opacity: 0.5;
        }

        .system-circle {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          z-index: 2;
        }
        .system-step:hover .system-circle {
          transform: scale(1.1);
          background-color: #2F855A !important;
          box-shadow: 0 15px 30px rgba(56, 161, 105, 0.4) !important;
        }
      `}</style>
    </section>
  );
}

function BalanceItem({ icon, title, delay }: { icon: string, title: string, delay: string }) {
  return (
    <div className="balance-card" style={{
      backgroundColor: '#ffffff',
      border: '1px solid rgba(0,0,0,0.05)',
      borderRadius: '24px',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '150px',
      gap: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
      animationDelay: delay
    }}>
      <div style={{ 
        fontSize: '44px',
        background: 'linear-gradient(135deg, #F0FDF4 0%, #C6F6D5 100%)',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)'
      }}>
        {icon}
      </div>
      <div style={{ fontSize: '15px', fontWeight: '800', color: '#1A202C', letterSpacing: '1px' }}>
        {title}
      </div>
    </div>
  );
}

function SystemStep({ icon, title, delay }: { icon: React.ReactNode, title: string, delay: string }) {
  return (
    <div className="system-step" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px', 
      animation: 'fadeUp 0.8s ease-out forwards',
      opacity: 0,
      animationDelay: delay 
    }}>
      <div className="system-circle" style={{
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        backgroundColor: '#38A169',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        boxShadow: '0 12px 24px rgba(56, 161, 105, 0.25)',
        border: '6px solid #ffffff'
      }}>
        {icon}
      </div>
      <div style={{ fontSize: '16px', fontWeight: '800', color: '#2D3748', letterSpacing: '1.5px' }}>
        {title}
      </div>
    </div>
  );
}

const SunriseIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" opacity="0.4"/>
    <path d="M8 12a4 4 0 1 0 8 0H8z"/>
    <path d="M2 12h20"/>
  </svg>
);

const SunIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 4.22l1.42 1.42"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
