import {useState} from 'react';
import {
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL_HREF,
  SUPPORT_WHATSAPP_URL,
  supportWhatsAppUrl,
} from '~/lib/contact';

const FAQ_ITEMS = [
  {
    q: 'How do I order?',
    a: 'Simply WhatsApp us or click "Order Now" on the website. Share your address, choose your kit, and we\'ll confirm within 30 minutes.',
  },
  {
    q: 'When will I get my order?',
    a: 'Orders are shipped within 24 hours and delivered in 3–5 working days across India. You\'ll receive tracking updates on WhatsApp.',
  },
  {
    q: 'Is there a return policy?',
    a: 'If you receive a damaged or wrong product, contact us within 48 hours and we will replace it immediately. WhatsApp us a photo of the product.',
  },
];

export function SugarDownContact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="sdp-contact">
      <div className="sdp-ct-hero">
        <h1>We&apos;re Always Here For You</h1>
        <p>
          Questions, concerns or just want to know if Sugar Down is right for
          you — reach out anytime.
        </p>
      </div>

      <div className="sdp-ct-wrap">
        <div className="sdp-ct-wa-banner">
          <div className="sdp-ct-wa-banner-left">
            <h3>Fastest Response on WhatsApp</h3>
            <p>Average reply time: under 5 minutes. Available 24×7.</p>
          </div>
          <a
            href={supportWhatsAppUrl(
              'Hello! I want to know more about Sugar Down',
            )}
            className="sdp-ct-wa-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat on WhatsApp Now
          </a>
        </div>

        <div className="sdp-ct-channels-grid">
          <a
            href={SUPPORT_WHATSAPP_URL}
            className="sdp-ct-channel-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="sdp-ct-ch-icon sdp-ct-ch-wa">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div>
              <div className="sdp-ct-ch-label">Fastest</div>
              <div className="sdp-ct-ch-name">WhatsApp Support</div>
              <div className="sdp-ct-ch-val">{SUPPORT_PHONE_DISPLAY}</div>
              <div className="sdp-ct-ch-sub">
                24×7 · Usually replies in under 5 mins
              </div>
            </div>
          </a>
          <a href={SUPPORT_PHONE_TEL_HREF} className="sdp-ct-channel-card">
            <div className="sdp-ct-ch-icon sdp-ct-ch-ph">📞</div>
            <div>
              <div className="sdp-ct-ch-label">Call Us</div>
              <div className="sdp-ct-ch-name">Phone Support</div>
              <div className="sdp-ct-ch-val">{SUPPORT_PHONE_DISPLAY}</div>
              <div className="sdp-ct-ch-sub">24×7 · Always Open</div>
            </div>
          </a>
          <a
            href="mailto:luckyheartayurveda@gmail.com"
            className="sdp-ct-channel-card"
          >
            <div className="sdp-ct-ch-icon sdp-ct-ch-em">✉️</div>
            <div>
              <div className="sdp-ct-ch-label">Email Us</div>
              <div className="sdp-ct-ch-name">Email Support</div>
              <div className="sdp-ct-ch-val">luckyheartayurveda@gmail.com</div>
              <div className="sdp-ct-ch-sub">24×7 · Replies in under 4 hours</div>
            </div>
          </a>
          <div className="sdp-ct-channel-card" style={{ cursor: 'default' }}>
            <div className="sdp-ct-ch-icon" style={{ backgroundColor: '#e8f5e9' }}>🏢</div>
            <div>
              <div className="sdp-ct-ch-label">Visit Us</div>
              <div className="sdp-ct-ch-name">Registered Address</div>
              <div className="sdp-ct-ch-val" style={{ fontSize: '14px', whiteSpace: 'normal', lineHeight: '1.4' }}>
                Sugar Down (Lucky Heart Ayurveda)<br/>
                123 Ayurvedic Marg, Sector 4<br/>
                New Delhi, 110001, India
              </div>
              <div className="sdp-ct-ch-sub">Required for Razorpay Compliance</div>
            </div>
          </div>
        </div>

        <div className="sdp-ct-support-grid">
          <div className="sdp-ct-hours-card">
            <h4>24/7 Support Channels</h4>
            <div className="sdp-ct-hour-row">
              <span>WhatsApp Support</span>
              <span>24×7 Always Open</span>
            </div>
            <div className="sdp-ct-hour-row">
              <span>Phone Support</span>
              <span>24×7 Always Open</span>
            </div>
            <div className="sdp-ct-hour-row">
              <span>Email Support</span>
              <span>24×7 Always Open</span>
            </div>
            <div className="sdp-ct-hour-row">
              <span>Follow-up Calls</span>
              <span>Daily for all customers</span>
            </div>
          </div>

          <div className="sdp-ct-faq-mini">
            <h3>Quick Answers</h3>
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={item.q}
                className={`sdp-ct-fitem${openFaq === i ? ' is-open open' : ''}`}
              >
                <button
                  type="button"
                  className="sdp-ct-fq"
                  aria-expanded={openFaq === i}
                  onClick={() =>
                    setOpenFaq((prev) => (prev === i ? null : i))
                  }
                >
                  {item.q} <span aria-hidden>+</span>
                </button>
                <div className="sdp-ct-fa">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
