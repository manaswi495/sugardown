import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  
  const fullBrand = 'SUGAR DOWN';
  const fullTagline = 'Shine again with Sugar Down';

  useEffect(() => {
    // Only show splash screen once per session
    const hasShown = sessionStorage.getItem('splashShown');
    if (hasShown) {
      setIsVisible(false);
      return;
    }

    sessionStorage.setItem('splashShown', 'true');

    // Hide the splash screen after animations finish
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo-container">
          
          {/* Logo Image */}
          <div className="splash-logo-image-container">
            <img 
              src="/logo.png" 
              alt="Sugar Down Logo" 
              className="splash-logo-image" 
            />
          </div>

          {/* Smooth CSS Typewriter Text */}
          <div className="splash-brand">
            <span style={{ visibility: 'hidden' }}>{fullBrand}</span>
            <div className="typewriter-smooth">
              {fullBrand}
            </div>
          </div>

        </div>
        <div className="splash-tagline">
          {fullTagline}
        </div>
      </div>

      <style>{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #E8F5EA;
          background-image: radial-gradient(circle at center, #ffffff 0%, #E8F5EA 100%);
          z-index: 999999;
          display: flex;
          align-items: center;
          justifyContent: center;
          animation: splashExit 0.9s cubic-bezier(0.8, 0, 0.2, 1) forwards;
          animation-delay: 3.2s;
          overflow: hidden;
        }

        .splash-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
        }

        .splash-logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        /* Logo Image Animation */
        .splash-logo-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .splash-logo-image {
          height: 140px;
          width: auto;
          opacity: 0;
          transform: scale(0.5);
          animation: logoReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.2s;
        }

        .typewriter-smooth {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          white-space: nowrap;
          color: #1B4D2E;
          clip-path: inset(0 100% 0 0);
          animation: smoothType 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.8s;
        }

        .splash-brand {
          font-family: var(--sd-font-logo);
          font-size: 80px;
          color: #1B4D2E;
          letter-spacing: 4px;
          position: relative;
          white-space: nowrap;
          display: flex;
          align-items: center;
        }

        /* Tagline Animation */
        .splash-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 22px;
          color: #2E7D4F;
          font-weight: 500;
          margin-top: 24px;
          letter-spacing: 3px;
          text-transform: uppercase;
          opacity: 0;
          animation: taglineReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 1.6s;
          text-align: center;
        }

        /* Keyframes */
        @keyframes logoReveal {
          0% { transform: scale(0.5) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        @keyframes smoothType {
          0% { clip-path: inset(0 100% 0 0); filter: blur(4px); }
          100% { clip-path: inset(0 -5% 0 0); filter: blur(0); }
        }

        @keyframes taglineReveal {
          from { opacity: 0; transform: translateY(20px); filter: blur(4px); clip-path: inset(100% 0 0 0); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); clip-path: inset(0 0 0 0); }
        }

        @keyframes splashExit {
          0% { opacity: 1; transform: scale(1); filter: blur(0); }
          40% { opacity: 1; transform: scale(1.02); filter: blur(0); }
          100% { 
            opacity: 0; 
            transform: scale(1.1); 
            filter: blur(12px);
            pointer-events: none;
            visibility: hidden;
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
