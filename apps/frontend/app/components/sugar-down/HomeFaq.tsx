import {useState} from 'react';

const FAQ_ITEMS: {q: string; a: string}[] = [
  {
    q: 'Can I take Sugar Down along with my current diabetes medicine?',
    a: 'Yes, Sugar Down is 100% Ayurvedic and safe to use alongside allopathic medicines. Many of our customers use it as a complement to their existing treatment. As with any supplement, we recommend consulting your doctor if you have specific concerns.',
  },
  {
    q: 'How long before I see results?',
    a: 'Most customers notice improved energy levels and sleep within the first 2 weeks. Significant blood sugar improvements typically become visible within 30-45 days when the full kit is used consistently.',
  },
  {
    q: 'Are there any side effects?',
    a: 'No. All Sugar Down products are made from natural Ayurvedic herbs with no synthetic chemicals. They are formulated to support your body — not interfere with it. Customers report no side effects across all three products.',
  },
  {
    q: 'What is the difference between the Core Kit and Balanced Kit?',
    a: 'The Core Kit covers morning and daytime care with Pravahi Kwath and Diabetes Care Capsules. The Balanced Kit adds the Sleep Care Capsules for night-time support — which is critical since poor sleep directly raises blood sugar. We recommend the Balanced Kit for best results.',
  },
  {
    q: 'How fast will my order arrive?',
    a: 'Orders typically arrive within 3–5 working days across India. Shipping is completely free on both kits. You\'ll receive tracking updates via WhatsApp.',
  },
  {
    q: 'Is the support really free?',
    a: 'Yes — completely free. The daily follow-up calls and WhatsApp support are all included with every kit. There are no hidden fees or subscriptions.',
  },
];

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section section" id="faq">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <span
          className="section-tag fade-up"
          style={{display: 'block', textAlign: 'center'}}
        >
          Questions Answered
        </span>
        <h2 className="section-title centered fade-up fade-up-d1">
          Frequently Asked Questions
        </h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className={`faq-item fade-up fade-up-d${(i % 4) + 1}${open ? ' open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenIndex((prev) => (prev === i ? null : i))
                  }
                >
                  {item.q}
                  <span className="faq-toggle" aria-hidden>
                    +
                  </span>
                </button>
                <div className="faq-a">{item.a}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
