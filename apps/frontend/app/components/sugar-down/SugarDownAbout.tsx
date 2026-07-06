import {Link} from 'react-router';

export function SugarDownAbout() {
  return (
    <div className="sdp-about">
      <div className="sdp-ab-hero">
        <div className="sdp-ab-hero-tag">About LUCKY HEART</div>
        <h1 className="sdp-ab-hero-title">
          We Exist For One Reason —
          <br />
          <em>To Help You Control Your Sugar.</em>
        </h1>
        <p className="sdp-ab-hero-sub">
          We are not a general health brand. We focus only on diabetes — so
          everything we do, every herb we choose, every follow-up we make, is
          designed for exactly one purpose.
        </p>
      </div>

      <section className="sdp-ab-sec">
        <div className="sdp-ab-mw">
          <div className="sdp-ab-mission">
            <div className="sdp-ab-mission-vis">
              <div className="sdp-ab-mission-big">1</div>
              <div className="sdp-ab-mission-label">
                Focus. One condition. Full commitment.
              </div>
              <div className="sdp-ab-mission-vals">
                {[
                  ['🌿', '100% Ayurvedic — no synthetic chemicals'],
                  ['🔬', 'Herbs proven for centuries in traditional medicine'],
                  ['👥', 'Real team, real support, real follow-ups'],
                  ['🎯', 'Only diabetes care — not a generic wellness brand'],
                ].map(([icon, text]) => (
                  <div key={text} className="sdp-ab-mv-item">
                    <div className="sdp-ab-mv-icon">{icon}</div>
                    <div className="sdp-ab-mv-text">{text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sdp-ab-mission-text">
              <h2>
                Our <span>Mission</span> is Simple
              </h2>
              <p>
                Diabetes doesn&apos;t have to be a life sentence of escalating
                doses and worsening complications. has known this for thousands
                of years — the right herbs, the right routine, and genuine
                support can help the body heal itself.
              </p>
              <p>
                We started LUCKY HEART because we saw too many people managing
                their sugar with pills that never got to the root cause. We
                believe nature&apos;s most powerful diabetes-fighting herbs,
                combined with real human support, can make a genuine
                difference.
              </p>
              <p>
                Every product we make, every follow-up call we do, every diet
                plan our dietitian creates — it all comes back to one simple
                question:{' '}
                <strong>Is this helping our customer control their sugar?</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sdp-ab-sec sdp-ab-story-sec">
        <div className="sdp-ab-mw">
          <div className="sdp-ab-story-grid">
            <div>
              <div className="sdp-ab-logo-main">SUGAR DOWN</div>
              <div className="sdp-ab-logo-sub">BY LUCKY HEART</div>
              <h2 className="sdp-ab-story-title">
                Born From a Family&apos;s Struggle With Diabetes
              </h2>
              <p className="sdp-ab-story-body">
                Our founder watched his father struggle with Type 2 diabetes for
                over a decade. Every year, the dose went up. Every year, new
                complications appeared. The medicines controlled the sugar but
                they never addressed why it was high in the first place.
              </p>
              <p className="sdp-ab-story-body">
                After years of research into Ayurveda — consulting traditional
                physicians, reading ancient texts, and speaking to hundreds of
                diabetic patients — a pattern emerged. Herbs like Gurmar,
                Karela, Jamun and Giloy had been used for centuries with
                remarkable results. But no one was presenting them in a modern,
                convenient, complete system.
              </p>
              <div className="sdp-ab-story-quote">
                <p>
                  &quot;We don&apos;t just want to manage your sugar. We want to
                  give your body the tools to manage it itself.&quot;
                </p>
                <cite>— Founder, LUCKY HEART</cite>
              </div>
              <p className="sdp-ab-story-body">
                Sugar Down was born from this belief — a complete day-night kit
                that works with your body&apos;s natural rhythms, supported by a
                team that genuinely cares about your results.
              </p>
            </div>
            <div className="sdp-ab-story-vis">
              {[
                ['10+', 'Carefully selected Ayurvedic herbs in our formulations'],
                ['3', 'Products designed to cover morning, afternoon and night'],
                ['24/7', 'WhatsApp support — real people, real answers'],
                ['100%', 'Focus on diabetes — nothing else'],
              ].map(([num, lab]) => (
                <div key={lab} className="sdp-ab-stat-card">
                  <div className="sdp-ab-stat-num">{num}</div>
                  <div className="sdp-ab-stat-label">{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sdp-ab-sec">
        <div className="sdp-ab-mw">
          <div className="sdp-ab-team-intro">
            <span className="sdp-ab-section-tag">The People Behind Sugar Down</span>
          </div>
          <h2 className="sdp-ab-team-heading">Our Team</h2>
          <p className="sdp-ab-team-lead">
            Meet the experts dedicated to your health journey.
          </p>
          <div className="sdp-ab-team-grid">
            <div className="sdp-ab-team-card">
              <div className="sdp-ab-team-av" style={{background: '#1B4D2E', color: 'white'}}>
                H
              </div>
              <div className="sdp-ab-team-name">Himanshu</div>
              <div className="sdp-ab-team-role">Founder &amp; Director</div>
              <div className="sdp-ab-team-bio">
                After witnessing firsthand the struggles of managing chronic conditions with just symptom-masking pills, Himanshu founded Sugar Down to bring authentic Ayurvedic healing into a modern, accessible format.
              </div>
            </div>
            <div className="sdp-ab-team-card">
              <div className="sdp-ab-team-av" style={{background: '#1A3A5C'}}>
                D
              </div>
              <div className="sdp-ab-team-name">[Dietitian Name]</div>
              <div className="sdp-ab-team-role">Certified Dietitian</div>
              <div className="sdp-ab-team-bio">
                Our in-house dietitian creates personalised meal plans for every
                customer. Certified in clinical nutrition with specialisation in
                diabetes management.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sdp-ab-sec sdp-ab-values-sec">
        <div className="sdp-ab-mw">
          <div className="sdp-ab-values-head">
            <span className="sdp-ab-section-tag">What We Believe In</span>
            <h2 className="sdp-ab-values-title">Our Values</h2>
          </div>
          <div className="sdp-ab-values-grid">
            {[
              ['🌿', 'Pure & Natural', 'Every ingredient is natural, every formulation is free from synthetic chemicals or harmful additives.'],
              ['💯', 'Complete Honesty', "We tell you exactly what's in our products, what to expect, and how long it takes. No exaggerated claims."],
              ['🤝', 'Genuine Support', "We follow up every single day because your results are our results. We don't disappear after you order."],
              ['🎯', 'One Focus', 'We only work on diabetes care. This laser focus means everything we do is designed specifically for diabetic people.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="sdp-ab-val-card">
                <div className="sdp-ab-val-icon">{icon}</div>
                <div className="sdp-ab-val-title">{title}</div>
                <div className="sdp-ab-val-desc">{desc}</div>
              </div>
            ))}
          </div>

          <div className="sdp-ab-cta-strip">
            <div>
              <h3>Ready to Take Control of Your Sugar?</h3>
              <p>
                Start your journey today. Free shipping + free diet plan
                included.
              </p>
            </div>
            <Link to="/products">See Our Kits →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
